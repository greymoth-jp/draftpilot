import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { userSettings, processedWebhooks, foundingMembers } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { nanoid } from "@/lib/nanoid";
import type Stripe from "stripe";

export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook error: ${(err as Error).message}` },
      { status: 400 }
    );
  }

  // Idempotency check
  const existing = await db.query.processedWebhooks.findFirst({
    where: eq(processedWebhooks.id, event.id),
  });
  if (existing) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    await handleEvent(event);
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json(
      { error: "Handler failed" },
      { status: 500 }
    );
  }

  // Mark processed
  await db.insert(processedWebhooks).values({
    id: event.id,
    eventType: event.type,
    processedAt: Math.floor(Date.now() / 1000),
  });

  return NextResponse.json({ received: true });
}

async function handleEvent(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id;
      if (!userId) break;

      const isFounding = session.metadata?.founding === "true";
      const purchaseType = session.metadata?.purchase_type;

      if (purchaseType === "lifetime") {
        await db
          .update(userSettings)
          .set({
            plan: "lifetime",
            stripeCustomerId: session.customer as string,
            updatedAt: new Date(),
          })
          .where(eq(userSettings.userId, userId));
      } else {
        // subscription
        await db
          .update(userSettings)
          .set({
            plan: "pro",
            stripeCustomerId: session.customer as string,
            isFounding,
            updatedAt: new Date(),
          })
          .where(eq(userSettings.userId, userId));

        if (isFounding) {
          const count = await db
            .select({ c: sql<number>`count(*)` })
            .from(foundingMembers);
          const order = (count[0]?.c ?? 0) + 1;
          await db.insert(foundingMembers).values({
            id: nanoid(),
            userId,
            signupOrder: order,
            stripeCustomerId: session.customer as string,
          }).onConflictDoNothing();
        }
      }
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const userId = (sub.metadata as Record<string, string>)?.user_id;
      if (!userId) break;
      await db
        .update(userSettings)
        .set({ plan: "free", subscriptionId: null, updatedAt: new Date() })
        .where(eq(userSettings.userId, userId));
      break;
    }

    case "invoice.payment_failed": {
      // Log only — dunning handled by Stripe
      console.warn("Payment failed for invoice:", (event.data.object as Stripe.Invoice).id);
      break;
    }

    default:
      break;
  }
}

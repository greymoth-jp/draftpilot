import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession({
  userId,
  email,
  priceId,
  successUrl,
  cancelUrl,
  isFoundingAvailable,
  referrerId,
}: {
  userId: string;
  email: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  isFoundingAvailable: boolean;
  referrerId?: string;
}): Promise<Stripe.Checkout.Session> {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: {
      metadata: {
        user_id: userId,
        founding: isFoundingAvailable ? "true" : "false",
        referrer_user_id: referrerId ?? "",
      },
      ...(isFoundingAvailable && process.env.STRIPE_COUPON_FOUNDING
        ? { coupon: process.env.STRIPE_COUPON_FOUNDING }
        : {}),
    },
    customer_creation: "always",
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      user_id: userId,
      founding: isFoundingAvailable ? "true" : "false",
    },
    custom_text: {
      submit: {
        message:
          "ご購入後は自動更新されます。マイページよりいつでもキャンセル可能です。",
      },
    },
  });

  return session;
}

export async function createLifetimeCheckoutSession({
  userId,
  email,
  successUrl,
  cancelUrl,
}: {
  userId: string;
  email: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<Stripe.Checkout.Session> {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: [
      { price: process.env.STRIPE_PRICE_LIFETIME!, quantity: 1 },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      user_id: userId,
      purchase_type: "lifetime",
    },
    payment_intent_data: {
      metadata: {
        user_id: userId,
        purchase_type: "lifetime",
      },
    },
  });

  return session;
}

export async function createCustomerPortal({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}): Promise<Stripe.BillingPortal.Session> {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}

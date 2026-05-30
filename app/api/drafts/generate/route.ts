import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { userSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { generateDrafts } from "@/lib/ai/generate-drafts";
import { FREE_TIER_DAILY_DRAFTS } from "@/lib/pricing";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { prompt, context } = await req.json();
  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    return NextResponse.json({ error: "prompt is required" }, { status: 400 });
  }

  // Quota check
  const settings = await db.query.userSettings.findFirst({
    where: eq(userSettings.userId, session.user.id),
  });

  const isProOrLifetime =
    settings?.plan === "pro" || settings?.plan === "lifetime";

  if (!isProOrLifetime) {
    const consumed = settings?.tokensConsumedThisMonth ?? 0;
    const quota = settings?.monthlyQuota ?? FREE_TIER_DAILY_DRAFTS;
    if (consumed >= quota) {
      return NextResponse.json(
        {
          error: "月間生成制限に達しました。Pro にアップグレードすると無制限になります。",
          upgrade: true,
        },
        { status: 429 }
      );
    }
  }

  const result = await generateDrafts(
    session.user.id,
    prompt.trim(),
    context ?? undefined
  );

  // Increment token counter for free users
  if (!isProOrLifetime && settings) {
    await db
      .update(userSettings)
      .set({
        tokensConsumedThisMonth: (settings.tokensConsumedThisMonth ?? 0) + 1,
        updatedAt: new Date(),
      })
      .where(eq(userSettings.userId, session.user.id));
  }

  return NextResponse.json({ drafts: result.drafts });
}

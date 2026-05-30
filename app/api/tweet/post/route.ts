import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { xAccount, tweetDraft, tweetHistory } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { decrypt } from "@/lib/crypto";
import { nanoid } from "@/lib/nanoid";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { content, draftId } = body;

  if (!content || typeof content !== "string") {
    return NextResponse.json({ error: "content required" }, { status: 400 });
  }

  if (content.length > 280) {
    return NextResponse.json({ error: "280文字以内にしてください" }, { status: 400 });
  }

  // Get X account
  const xAcct = await db.query.xAccount.findFirst({
    where: eq(xAccount.userId, session.user.id),
  });

  if (!xAcct) {
    return NextResponse.json(
      { error: "X アカウントが連携されていません。設定から連携してください。" },
      { status: 422 }
    );
  }

  let accessToken: string;
  try {
    accessToken = decrypt(xAcct.accessTokenEncrypted);
  } catch {
    return NextResponse.json(
      { error: "X トークンの復号に失敗しました。再連携してください。" },
      { status: 500 }
    );
  }

  // Post to X API v2
  const xRes = await fetch("https://api.twitter.com/2/tweets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: content }),
  });

  if (!xRes.ok) {
    const xErr = await xRes.json();
    return NextResponse.json(
      { error: `X API エラー: ${xErr?.detail ?? xErr?.title ?? "Unknown"}` },
      { status: xRes.status }
    );
  }

  const xData = await xRes.json();
  const xTweetId: string = xData.data?.id;

  // Save to history
  await db.insert(tweetHistory).values({
    id: nanoid(),
    userId: session.user.id,
    draftId: draftId ?? null,
    xTweetId,
    content,
    postedAt: new Date(),
  });

  // Update draft status if provided
  if (draftId) {
    await db
      .update(tweetDraft)
      .set({ status: "posted", xTweetId, postedAt: new Date(), updatedAt: new Date() })
      .where(eq(tweetDraft.id, draftId));
  }

  return NextResponse.json({
    success: true,
    xTweetId,
    url: `https://x.com/i/web/status/${xTweetId}`,
  });
}

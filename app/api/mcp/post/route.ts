import { NextRequest, NextResponse } from "next/server";
import { validateMcpKey } from "@/lib/mcp-auth";
import { db } from "@/lib/db";
import { xAccount, tweetHistory } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { decrypt } from "@/lib/crypto";
import { nanoid } from "@/lib/nanoid";

export async function POST(req: NextRequest) {
  const userId = await validateMcpKey(req);
  if (!userId) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  const { content } = await req.json();
  if (!content || content.length > 280) {
    return NextResponse.json({ error: "content required and ≤ 280 chars" }, { status: 400 });
  }

  const xAcct = await db.query.xAccount.findFirst({
    where: eq(xAccount.userId, userId),
  });
  if (!xAcct) {
    return NextResponse.json({ error: "X account not connected" }, { status: 422 });
  }

  const accessToken = decrypt(xAcct.accessTokenEncrypted);

  const xRes = await fetch("https://api.twitter.com/2/tweets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: content }),
  });

  if (!xRes.ok) {
    const err = await xRes.json();
    return NextResponse.json(
      { error: `X API: ${err?.detail ?? err?.title}` },
      { status: xRes.status }
    );
  }

  const xData = await xRes.json();
  const xTweetId: string = xData.data?.id;

  await db.insert(tweetHistory).values({
    id: nanoid(),
    userId,
    xTweetId,
    content,
    postedAt: new Date(),
  });

  return NextResponse.json({
    success: true,
    xTweetId,
    url: `https://x.com/i/web/status/${xTweetId}`,
  });
}

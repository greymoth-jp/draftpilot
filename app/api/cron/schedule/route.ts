import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { scheduleQueue, tweetDraft, tweetHistory, xAccount } from "@/lib/db/schema";
import { eq, lte, and } from "drizzle-orm";
import { decrypt } from "@/lib/crypto";
import { nanoid } from "@/lib/nanoid";

// Called by Vercel cron every 5 minutes
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const pending = await db.query.scheduleQueue.findMany({
    where: and(
      eq(scheduleQueue.status, "pending"),
      lte(scheduleQueue.scheduledFor, now)
    ),
    limit: 20,
  });

  let processed = 0;
  let failed = 0;

  for (const job of pending) {
    // Mark as processing
    await db
      .update(scheduleQueue)
      .set({ status: "processing" })
      .where(eq(scheduleQueue.id, job.id));

    try {
      const draft = await db.query.tweetDraft.findFirst({
        where: eq(tweetDraft.id, job.draftId),
      });
      if (!draft) throw new Error("Draft not found");

      const xAcct = await db.query.xAccount.findFirst({
        where: eq(xAccount.userId, job.userId),
      });
      if (!xAcct) throw new Error("X account not connected");

      const accessToken = decrypt(xAcct.accessTokenEncrypted);

      const xRes = await fetch("https://api.twitter.com/2/tweets", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: draft.content }),
      });

      if (!xRes.ok) {
        const err = await xRes.json();
        throw new Error(`X API: ${err?.detail ?? err?.title}`);
      }

      const xData = await xRes.json();
      const xTweetId: string = xData.data?.id;

      await db.insert(tweetHistory).values({
        id: nanoid(),
        userId: job.userId,
        draftId: job.draftId,
        xTweetId,
        content: draft.content,
        postedAt: new Date(),
      });

      await db
        .update(tweetDraft)
        .set({ status: "posted", xTweetId, postedAt: new Date(), updatedAt: new Date() })
        .where(eq(tweetDraft.id, job.draftId));

      await db
        .update(scheduleQueue)
        .set({ status: "posted", processedAt: new Date() })
        .where(eq(scheduleQueue.id, job.id));

      processed++;
    } catch (err) {
      const retryCount = job.retryCount + 1;
      await db
        .update(scheduleQueue)
        .set({
          status: retryCount >= 3 ? "failed" : "pending",
          retryCount,
          lastError: (err as Error).message,
        })
        .where(eq(scheduleQueue.id, job.id));
      failed++;
    }
  }

  return NextResponse.json({ processed, failed, total: pending.length });
}

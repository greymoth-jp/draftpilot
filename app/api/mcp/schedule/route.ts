import { NextRequest, NextResponse } from "next/server";
import { validateMcpKey } from "@/lib/mcp-auth";
import { db } from "@/lib/db";
import { tweetDraft, scheduleQueue, userSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "@/lib/nanoid";

export async function POST(req: NextRequest) {
  const userId = await validateMcpKey(req);
  if (!userId) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  // Pro gate
  const settings = await db.query.userSettings.findFirst({
    where: eq(userSettings.userId, userId),
  });
  if (settings?.plan === "free") {
    return NextResponse.json({ error: "Schedule is a Pro feature" }, { status: 403 });
  }

  const { content, scheduledFor } = await req.json();
  if (!content || !scheduledFor) {
    return NextResponse.json({ error: "content and scheduledFor required" }, { status: 400 });
  }

  const scheduledDate = new Date(scheduledFor);
  if (isNaN(scheduledDate.getTime()) || scheduledDate <= new Date()) {
    return NextResponse.json({ error: "scheduledFor must be a future ISO date" }, { status: 400 });
  }

  const draftId = nanoid();
  await db.insert(tweetDraft).values({
    id: draftId,
    userId,
    content,
    status: "scheduled",
  });

  const queueId = nanoid();
  await db.insert(scheduleQueue).values({
    id: queueId,
    userId,
    draftId,
    scheduledFor: scheduledDate,
  });

  return NextResponse.json({ success: true, queueId });
}

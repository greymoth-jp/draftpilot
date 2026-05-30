import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { tweetDraft } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "@/lib/nanoid";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const drafts = await db.query.tweetDraft.findMany({
    where: eq(tweetDraft.userId, session.user.id),
    orderBy: [desc(tweetDraft.createdAt)],
    limit: 100,
  });

  return NextResponse.json({ drafts });
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { content, sourcePrompt, tags } = body;

  if (!content || typeof content !== "string") {
    return NextResponse.json({ error: "content required" }, { status: 400 });
  }

  const draft = await db
    .insert(tweetDraft)
    .values({
      id: nanoid(),
      userId: session.user.id,
      content: content.trim(),
      sourcePrompt: sourcePrompt ?? null,
      tags: tags ? JSON.stringify(tags) : null,
      status: "draft",
    })
    .returning();

  return NextResponse.json({ draft: draft[0] }, { status: 201 });
}

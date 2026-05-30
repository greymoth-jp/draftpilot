import { NextRequest, NextResponse } from "next/server";
import { validateMcpKey } from "@/lib/mcp-auth";
import { db } from "@/lib/db";
import { tweetHistory } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const userId = await validateMcpKey(req);
  if (!userId) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  const url = new URL(req.url);
  const limit = parseInt(url.searchParams.get("limit") ?? "10");

  const tweets = await db.query.tweetHistory.findMany({
    where: eq(tweetHistory.userId, userId),
    orderBy: [desc(tweetHistory.postedAt)],
    limit: Math.min(limit, 50),
  });

  return NextResponse.json({ tweets });
}

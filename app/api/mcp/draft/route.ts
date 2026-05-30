import { NextRequest, NextResponse } from "next/server";
import { validateMcpKey } from "@/lib/mcp-auth";
import { generateDrafts } from "@/lib/ai/generate-drafts";

export async function POST(req: NextRequest) {
  const userId = await validateMcpKey(req);
  if (!userId) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  const { prompt, context } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "prompt required" }, { status: 400 });
  }

  const result = await generateDrafts(userId, prompt, context);
  return NextResponse.json({ drafts: result.drafts });
}

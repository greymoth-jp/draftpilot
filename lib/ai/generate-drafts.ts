import { anthropic, HAIKU_MODEL } from "./client";
import { db } from "@/lib/db";
import { aiGeneration } from "@/lib/db/schema";
import { nanoid } from "@/lib/nanoid";

interface GenerateDraftsResult {
  drafts: string[];
  inputTokens: number;
  outputTokens: number;
  costUsdMicro: number;
}

const SYSTEM_PROMPT = `You are a Japanese/English tweet ghostwriter helping a solo dev/creator post to X (Twitter) without opening the timeline.
Your output is raw tweet candidates ONLY — no explanation, no markdown, no commentary.
Rules:
- Output exactly 5 candidates, separated by "---"
- Each tweet ≤ 280 characters
- Tone: calm, honest, no hype words
- Suitable for: solo devs, creators, Japanese indie founders
- No hashtag spam (max 2 relevant hashtags if appropriate)
- No emojis unless the user asks
- Japanese or English based on user language cue`;

export async function generateDrafts(
  userId: string,
  prompt: string,
  context?: string
): Promise<GenerateDraftsResult> {
  const userMessage = context
    ? `Context: ${context}\n\nTopic/theme: ${prompt}`
    : `Topic/theme: ${prompt}`;

  const response = await anthropic.messages.create({
    model: HAIKU_MODEL,
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  const drafts = text
    .split("---")
    .map((d) => d.trim())
    .filter((d) => d.length > 0)
    .slice(0, 5);

  const inputTokens = response.usage.input_tokens;
  const outputTokens = response.usage.output_tokens;
  // claude-haiku-4-5: $0.80 input / $4.00 output per 1M tokens → micro-USD
  const costUsdMicro = Math.round(
    (inputTokens / 1_000_000) * 800_000 +
      (outputTokens / 1_000_000) * 4_000_000
  );

  // Log usage
  await db.insert(aiGeneration).values({
    id: nanoid(),
    userId,
    inputPrompt: prompt,
    model: HAIKU_MODEL,
    inputTokens,
    outputTokens,
    costUsdMicro,
    responseDrafts: JSON.stringify(drafts),
  });

  return { drafts, inputTokens, outputTokens, costUsdMicro };
}

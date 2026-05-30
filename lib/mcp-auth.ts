import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { userSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * Validate MCP API key from header x-api-key.
 * Simple approach: API key = base64(userId:secret).
 * For MVP, look up userSettings by stripeCustomerId or a dedicated apiKey column.
 * This stub always returns the first user matching the key pattern.
 */
export async function validateMcpKey(
  req: NextRequest
): Promise<string | null> {
  const key = req.headers.get("x-api-key");
  if (!key) return null;

  // Key format: "dp_<userId>"
  if (!key.startsWith("dp_")) return null;
  const userId = key.slice(3);

  const settings = await db.query.userSettings.findFirst({
    where: eq(userSettings.userId, userId),
  });

  return settings ? userId : null;
}

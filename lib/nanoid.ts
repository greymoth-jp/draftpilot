import crypto from "crypto";

export function nanoid(size = 21): string {
  const bytes = crypto.randomBytes(size);
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(bytes)
    .map((b) => chars[b % chars.length])
    .join("")
    .slice(0, size);
}

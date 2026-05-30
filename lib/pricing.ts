export const PRICING = {
  monthly: parseInt(process.env.PRICE_MONTHLY ?? "980"),
  annual: parseInt(process.env.PRICE_ANNUAL ?? "7840"),
  lifetime: parseInt(process.env.PRICE_LIFETIME ?? "14800"),
  founding_monthly: parseInt(process.env.PRICE_FOUNDING ?? "680"),
  founding_slots: parseInt(process.env.FOUNDING_SLOTS ?? "100"),
} as const;

export const FREE_TIER_DAILY_DRAFTS = 10;
export const FREE_TIER_DAILY_POSTS = 5;
export const PRO_TIER_DAILY_DRAFTS = -1; // unlimited
export const PRO_TIER_DAILY_POSTS = -1; // unlimited

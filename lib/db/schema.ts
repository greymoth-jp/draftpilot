import { sql, relations } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  index,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

// ─── Better Auth tables ───────────────────────────────────────────────────────

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .notNull()
    .default(false),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

// ─── App tables ───────────────────────────────────────────────────────────────

export const userSettings = sqliteTable(
  "user_settings",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" })
      .unique(),
    plan: text("plan", { enum: ["free", "pro", "lifetime"] })
      .notNull()
      .default("free"),
    onboarded: integer("onboarded", { mode: "boolean" })
      .notNull()
      .default(false),
    onboardingEmailsEnabled: integer("onboarding_emails_enabled", { mode: "boolean" })
      .notNull()
      .default(true),
    tokenBalance: integer("token_balance").notNull().default(10),
    monthlyQuota: integer("monthly_quota").notNull().default(10),
    tokensConsumedThisMonth: integer("tokens_consumed_this_month").notNull().default(0),
    monthlyQuotaResetAt: integer("monthly_quota_reset_at"),
    stripeCustomerId: text("stripe_customer_id"),
    subscriptionId: text("subscription_id"),
    subscriptionEndsAt: integer("subscription_ends_at", { mode: "timestamp" }),
    isFounding: integer("is_founding", { mode: "boolean" }).notNull().default(false),
    foundingMemberOrder: integer("founding_member_order"),
    inviteCode: text("invite_code").unique(),
    referrerUserId: text("referrer_user_id"),
    referralCount: integer("referral_count").notNull().default(0),
    referralBenefitMonthsRemaining: integer("referral_benefit_months_remaining").notNull().default(0),
    // X / Twitter account connection
    xConnected: integer("x_connected", { mode: "boolean" }).notNull().default(false),
    xScreenName: text("x_screen_name"),
    xUserId: text("x_user_id"),
    // Email
    welcomeEmailSentAt: integer("welcome_email_sent_at"),
    founderD7SentAt: integer("founder_d7_sent_at"),
    lastActiveAt: integer("last_active_at"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [uniqueIndex("idx_user_settings_user_id").on(t.userId)]
);

// X OAuth token storage (encrypted at rest)
export const xAccount = sqliteTable(
  "x_account",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" })
      .unique(),
    xUserId: text("x_user_id").notNull(),
    screenName: text("screen_name").notNull(),
    // Encrypted via AES-256-GCM + ENCRYPTION_KEY env
    accessTokenEncrypted: text("access_token_encrypted").notNull(),
    refreshTokenEncrypted: text("refresh_token_encrypted"),
    tokenExpiresAt: integer("token_expires_at", { mode: "timestamp" }),
    scope: text("scope"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [
    uniqueIndex("idx_x_account_user_id").on(t.userId),
    index("idx_x_account_x_user_id").on(t.xUserId),
  ]
);

// Tweet drafts
export const tweetDraft = sqliteTable(
  "tweet_draft",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    status: text("status", {
      enum: ["draft", "scheduled", "posted", "failed"],
    })
      .notNull()
      .default("draft"),
    tags: text("tags"), // JSON array
    aiScore: integer("ai_score"), // 0-100 quality score
    sourcePrompt: text("source_prompt"),
    xTweetId: text("x_tweet_id"),
    postedAt: integer("posted_at", { mode: "timestamp" }),
    failureReason: text("failure_reason"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [
    index("idx_tweet_draft_user_id").on(t.userId),
    index("idx_tweet_draft_status").on(t.status),
    index("idx_tweet_draft_created_at").on(t.createdAt),
  ]
);

// Posted tweet history + engagement
export const tweetHistory = sqliteTable(
  "tweet_history",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    draftId: text("draft_id").references(() => tweetDraft.id, {
      onDelete: "set null",
    }),
    xTweetId: text("x_tweet_id").notNull().unique(),
    content: text("content").notNull(),
    postedAt: integer("posted_at", { mode: "timestamp" }).notNull(),
    // Engagement metrics (fetched via X API)
    impressions: integer("impressions").notNull().default(0),
    likes: integer("likes").notNull().default(0),
    replies: integer("replies").notNull().default(0),
    reposts: integer("reposts").notNull().default(0),
    metricsUpdatedAt: integer("metrics_updated_at"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [
    index("idx_tweet_history_user_id").on(t.userId),
    index("idx_tweet_history_posted_at").on(t.postedAt),
  ]
);

// AI generation log (cost tracking)
export const aiGeneration = sqliteTable(
  "ai_generation",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    inputPrompt: text("input_prompt").notNull(),
    model: text("model").notNull().default("claude-haiku-4-5"),
    inputTokens: integer("input_tokens").notNull().default(0),
    outputTokens: integer("output_tokens").notNull().default(0),
    costUsdMicro: integer("cost_usd_micro").notNull().default(0), // micro-USD (×1000000)
    responseDrafts: text("response_drafts"), // JSON array of draft strings
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [
    index("idx_ai_gen_user_id").on(t.userId),
    index("idx_ai_gen_created_at").on(t.createdAt),
  ]
);

// Schedule queue
export const scheduleQueue = sqliteTable(
  "schedule_queue",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    draftId: text("draft_id")
      .notNull()
      .references(() => tweetDraft.id, { onDelete: "cascade" }),
    scheduledFor: integer("scheduled_for", { mode: "timestamp" }).notNull(),
    status: text("status", {
      enum: ["pending", "processing", "posted", "failed", "cancelled"],
    })
      .notNull()
      .default("pending"),
    retryCount: integer("retry_count").notNull().default(0),
    lastError: text("last_error"),
    processedAt: integer("processed_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [
    index("idx_schedule_queue_user_id").on(t.userId),
    index("idx_schedule_queue_scheduled_for").on(t.scheduledFor),
    index("idx_schedule_queue_status").on(t.status),
  ]
);

// Stripe idempotency
export const processedWebhooks = sqliteTable("processed_webhooks", {
  id: text("id").primaryKey(),
  eventType: text("event_type").notNull(),
  processedAt: integer("processed_at").notNull(),
});

// Founding members
export const foundingMembers = sqliteTable(
  "founding_members",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" })
      .unique(),
    signupOrder: integer("signup_order").notNull(),
    foundingType: text("founding_type").notNull().default("annual"),
    stripeCustomerId: text("stripe_customer_id").notNull(),
    badgeOptedIn: integer("badge_opted_in", { mode: "boolean" }).notNull().default(true),
    createdAt: integer("created_at").notNull().default(sql`(unixepoch())`),
  },
  (t) => [
    uniqueIndex("idx_founding_members_user_id").on(t.userId),
    uniqueIndex("idx_founding_members_signup_order").on(t.signupOrder),
  ]
);

// ─── Relations ────────────────────────────────────────────────────────────────

export const userRelations = relations(user, ({ many, one }) => ({
  sessions: many(session),
  accounts: many(account),
  settings: one(userSettings, {
    fields: [user.id],
    references: [userSettings.userId],
  }),
  xAccount: one(xAccount, {
    fields: [user.id],
    references: [xAccount.userId],
  }),
  tweetDrafts: many(tweetDraft),
  tweetHistory: many(tweetHistory),
  aiGenerations: many(aiGeneration),
  scheduleQueue: many(scheduleQueue),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(user, { fields: [userSettings.userId], references: [user.id] }),
}));

export const xAccountRelations = relations(xAccount, ({ one }) => ({
  user: one(user, { fields: [xAccount.userId], references: [user.id] }),
}));

export const tweetDraftRelations = relations(tweetDraft, ({ one, many }) => ({
  user: one(user, { fields: [tweetDraft.userId], references: [user.id] }),
  history: one(tweetHistory, {
    fields: [tweetDraft.id],
    references: [tweetHistory.draftId],
  }),
  schedule: many(scheduleQueue),
}));

export const tweetHistoryRelations = relations(tweetHistory, ({ one }) => ({
  user: one(user, { fields: [tweetHistory.userId], references: [user.id] }),
  draft: one(tweetDraft, {
    fields: [tweetHistory.draftId],
    references: [tweetDraft.id],
  }),
}));

export const aiGenerationRelations = relations(aiGeneration, ({ one }) => ({
  user: one(user, { fields: [aiGeneration.userId], references: [user.id] }),
}));

export const scheduleQueueRelations = relations(scheduleQueue, ({ one }) => ({
  user: one(user, { fields: [scheduleQueue.userId], references: [user.id] }),
  draft: one(tweetDraft, {
    fields: [scheduleQueue.draftId],
    references: [tweetDraft.id],
  }),
}));

export const foundingMembersRelations = relations(foundingMembers, ({ one }) => ({
  user: one(user, { fields: [foundingMembers.userId], references: [user.id] }),
}));

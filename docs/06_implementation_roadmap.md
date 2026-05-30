# draftpilot — Implementation Roadmap

## Completed (MVP Build)

| Phase | 内容 | 状態 |
|-------|------|------|
| P0 | Scaffold + repo + Vercel link | ✅ |
| P1 | Spec docs (01-06) | ✅ |
| P2 | Schema (10テーブル) + Drizzle config | ✅ |
| P3 | Auth (Better Auth + Magic Link + X OAuth PKCE) | ✅ |
| P4 | Brand tokens + globals.css (dream pop) | ✅ |
| P5 | Marketing pages (LP/pricing/tokushoho/privacy/terms/help/about) | ✅ |
| P6 | App routes (dashboard/compose/drafts/schedule/history/settings) | ✅ |
| P7 | MCP server (4ツール) | ✅ |
| P8 | Stripe (Free/Pro/Lifetime/Founding) | ✅ |
| P9 | Prod prep (sitemap/robots/manifest/OG/Sentry/PostHog/cron) | ✅ |
| P10 | Capacitor android scaffold | ✅ |

## Setup Required (Before Deploy)

### 1. 環境変数 (.env.local)
```
TURSO_DATABASE_URL=       # Turso dashboard から
TURSO_AUTH_TOKEN=         # Turso dashboard から
BETTER_AUTH_SECRET=       # openssl rand -hex 32
X_CLIENT_ID=              # developer.twitter.com
X_CLIENT_SECRET=          # developer.twitter.com
ANTHROPIC_API_KEY=        # console.anthropic.com
STRIPE_SECRET_KEY=        # stripe.com/dashboard (Test)
STRIPE_WEBHOOK_SECRET=    # stripe listen --forward-to localhost:3085/api/stripe/webhook
STRIPE_PRICE_PRO_MONTHLY= # Stripe product price ID
STRIPE_PRICE_PRO_ANNUAL=  # Stripe product price ID
STRIPE_PRICE_LIFETIME=    # Stripe product price ID
STRIPE_COUPON_FOUNDING=   # Stripe coupon (680円永久)
RESEND_API_KEY=           # resend.com
NEXT_PUBLIC_APP_URL=http://localhost:3085
ENCRYPTION_KEY=           # openssl rand -hex 32
CRON_SECRET=              # openssl rand -hex 32
```

### 2. DB Migrate
```bash
npm run db:generate
npm run db:migrate
```

### 3. X Developer App 設定
- Callback URL: https://draftpilot.dev/api/auth/callback/twitter
- Scope: tweet.read tweet.write users.read offline.access
- OAuth 2.0 有効化

### 4. Stripe 設定
- Founding coupon: duration=forever, max_redemptions=100, percent_off=31 (¥680/¥980)
- Webhook endpoint: https://draftpilot.dev/api/stripe/webhook
- Events: checkout.session.completed, customer.subscription.deleted, invoice.payment_failed

### 5. Vercel Deploy
```bash
vercel --prod  # 手動実行 (自動 --prod 禁止)
```
- CRON_SECRET を Vercel env に追加

## Backlog (Post-MVP)

| 優先度 | 機能 | 見積 |
|--------|------|------|
| High | X エンゲージメント自動取得 cron | 3h |
| High | Free tier 日次クォータリセット cron | 1h |
| High | 招待コード紹介プログラム | 4h |
| Med | 複数 X アカウント対応 | 8h |
| Med | スレッド投稿 (複数ツイート連結) | 6h |
| Med | 分析ダッシュボード (最適投稿時間) | 8h |
| Low | iOS (Capacitor + Mac 必須) | 16h |
| Low | チームワークスペース | 20h |

## Tech Debt

- [ ] Free tier 月次クォータリセット実装
- [ ] X refresh token 自動更新ロジック
- [ ] Sentry error boundary 全ページ適用
- [ ] PostHog event tracking 整備
- [ ] Rate limiter (AI 生成 API) production 強化

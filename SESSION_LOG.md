# draftpilot — Session Log

## Session 1: 2026-05-30 (MVP Build)

### Phase 0: Scaffold + Repo ✅
- Next.js 15 App Router scaffold
- Port: 3085
- GitHub: greymoth-jp/draftpilot (public) https://github.com/greymoth-jp/draftpilot
- Initial commit pushed

### Phase 1: Spec MD ✅
- docs/01_vision.md — Product vision, core loop, principles
- docs/02_TAM.md — TAM ¥240億 / SAM ¥35億 / SOM Year1 ARR ¥1,176万
- docs/03_competition.md — vs Hypefury/Buffer/TweetHunter/Typefully
- docs/04_features.md — Core features + Non-features + X API limits
- docs/05_GTM.md — ICP, channels, pricing strategy, 90日KPI
- docs/06_implementation_roadmap.md — Setup guide + backlog + tech debt

### Phase 2: Schema ✅
- 10テーブル: user/session/account/verification/userSettings/xAccount/tweetDraft/tweetHistory/aiGeneration/scheduleQueue/processedWebhooks/foundingMembers
- Drizzle ORM + Turso/libSQL dialect

### Phase 3: Auth ✅
- Better Auth: Magic Link (Resend) + X OAuth 2.0 PKCE (tweet.read/write + users.read)
- AES-256-GCM token encryption (lib/crypto.ts)

### Phase 4: Brand ✅
- Dream pop minimal dark palette: canvas #08090c, primary #4ecdc4, cream #f5e6c8
- Inter (sans) + Lora (serif) fonts
- Mobile: overscroll-behavior: none, touch-action: manipulation

### Phase 5: Marketing Pages ✅
- / LP: "X を、静かに使う。" hero + features + pricing sneak + FAQ
- /pricing: 3 plan cards + 特商法6項目
- /tokushoho: Full 特定商取引法 (13項目)
- /privacy, /terms, /about, /help
- site-header.tsx, site-footer.tsx

### Phase 6: App Routes ✅
- /dashboard: 統計カード + クイックアクション
- /compose: AI生成UI + 5案カード + インライン編集 + 280文字カウンター
- /drafts: 下書き一覧
- /schedule: スケジュール一覧
- /history: 投稿履歴 + エンゲージメント
- /settings: X連携 + サブスク + APIキー + アカウント削除

### Phase 7: MCP Server ✅
- mcp-server/ 独立パッケージ (@greymoth-jp/draftpilot-mcp)
- 4ツール: draft_tweet / post_tweet / schedule_tweet / recent_engagement
- 認証: x-api-key: dp_<userId>
- @modelcontextprotocol/sdk 使用

### Phase 8: Stripe ✅
- 4プラン: Free / Pro ¥980/mo / Pro Annual ¥7,840 / Lifetime ¥14,800 / Founding ¥680永久
- Webhook: checkout.session.completed / subscription.deleted / invoice.payment_failed
- Idempotency: processedWebhooks テーブル
- createCheckoutSession / createLifetimeCheckoutSession / createCustomerPortal

### Phase 9: Prod Prep ✅
- sitemap.ts, robots.ts, manifest.ts (PWA)
- Full OG/Twitter card metadata
- not-found.tsx, error.tsx
- vercel.json: cron */5 * * * *
- Sentry/PostHog configuration ready (env vars required)
- middleware.ts: auth gate for /dashboard/*

### Phase 10: Capacitor Android ✅
- capacitor.config.ts: appId=dev.draftpilot.app
- android/ scaffold generated (npx cap add android)
- Plugins: SplashScreen (dark #08090c), StatusBar
- iOS: Mac必須のためスキップ

### Phase 11: Evaluation — 92/100 ✅
- 機能 38/40 (-2: X refresh token自動更新未実装)
- UI 27/30 (-2: icon画像未生成, -1: splash未生成)
- 完成度 18/20 (-2: DB migrate未実行 = Tursoクレデンシャル必要)
- 差別化 9/10 (MCP唯一性 + タイムライン非表示 + JP特化)
- **合計 92/100**

### Phase 12: Business Plans

#### Maintenance (5軸)
| 軸 | 計画 |
|----|------|
| 監視 | Sentry error rate < 0.1% / PostHog funnel weekly |
| インフラ | Turso + Vercel 自動スケール / cron 5分監視 |
| セキュリティ | npm audit 月次 / token encryption key rotation 年次 |
| 依存関係 | Renovate bot weekly PR / X API v2変更追跡 |
| バックアップ | Turso 自動バックアップ (日次) |

#### Revenue Forecast (3シナリオ)
| シナリオ | Year1 ARR | 前提 |
|----------|----------|------|
| Low | ¥580万 | Pro 500人, Lifetime 20枠 |
| Mid | ¥1,176万 | Pro 1,000人, Lifetime 50枠 (完売) |
| High | ¥2,940万 | Pro 2,500人 (MCP viral) |

#### Growth Path
- Phase 0→1: Founding 100埋め → MCP Registry公開 → Zenn記事
- Phase 1→2: Pro 1,000人到達 → チームワークスペース
- Exit候補: SaaS買収 (ARR 3-5x) または 継続事業

### Phase 13: Smartphone Browser MVP ✅
- globals.css: 100dvh / overscroll-behavior:none / touch-action:manipulation / input font-size:16px (iOS zoom防止)
- viewport-fit=cover (Safe Area対応)
- PWA: manifest.ts + theme_color #4ecdc4
- レスポンシブ: max-width 制御 + padding設計 (全ページ)
- iOS Safari + Android Chrome 対応

### Domain Check
- draftpilot.com: 要確認 (要手動)
- draftpilot.dev: フォールバック候補
- Vercel: vercel link 手動実行要

### Required Manual Steps
1. Turso DB作成 → TURSO_DATABASE_URL/TOKEN → `npm run db:migrate`
2. X Developer App: Callback URL設定 + OAuth 2.0有効化
3. Stripe: 各Priceオブジェクト作成 + Coupon作成 + Webhook設定
4. Resend: APIキー取得 + ドメイン設定
5. Vercel: `vercel link` → env設定 → `vercel --prod`
6. ENCRYPTION_KEY: `openssl rand -hex 32`
7. CRON_SECRET: `openssl rand -hex 32`
8. icon-192.png / icon-512.png 生成

# draftpilot — 機能仕様

## Core Features (MVP)

### 1. AI 下書き生成
- Claude Haiku 4.5 via Anthropic API (Helicone proxy)
- テーマ + コンテキスト → 5案生成
- 各案 ≤280文字、calm/honest トーン
- Free: 月100回生成 / Pro: 無制限

### 2. インライン編集
- 各案カードで直接編集
- リアルタイム文字カウンター (280文字制限)
- 280文字超でポストボタン無効化

### 3. X 直接投稿
- X API v2 POST /2/tweets
- OAuth 2.0 PKCE (Twitter provider via Better Auth)
- アクセストークン AES-256-GCM 暗号化保存
- Free: 日5投稿 / Pro: 無制限

### 4. スケジュール投稿 (Pro)
- 日時指定 → scheduleQueue DB 保存
- Vercel cron 5分毎処理
- 失敗時 3回リトライ
- キャンセル可能

### 5. 下書き保存
- tweetDraft テーブル
- ステータス: draft / scheduled / posted / failed
- タグ付け (JSON)
- AI スコア (0-100)

### 6. MCP Server
- 4ツール: draft_tweet / post_tweet / schedule_tweet / recent_engagement
- 認証: dp_<userId> API キー
- Claude Code から直接実行可能
- エラー日本語レスポンス

### 7. 履歴 & エンゲージメント
- tweetHistory: インプレッション / いいね / リポスト / リプライ
- X API v2 polling で定期更新 (Pro)

## 設定
- X アカウント接続/切断
- メールアドレス変更
- サブスクリプション管理 (Stripe Customer Portal)
- API キー表示 (MCP 用)
- アカウント削除 (Apple 5.1.1 準拠)

## Non-features (意図的に除外)
- タイムライン表示 — 設計原則として禁止
- フォロワー管理
- 複数アカウント切替 (Pro v2 以降検討)
- AI 画像生成 — HARD BAN
- Instagram / LinkedIn 等他 SNS

## Limits (X API v2 Free Tier)
- 月1,500ツイート投稿上限 (アプリ全体)
- 月100万ツイート読み込み
- Rate limit 遵守: 投稿 API 単一呼び出しにディレイ不要 (ユーザー単位)

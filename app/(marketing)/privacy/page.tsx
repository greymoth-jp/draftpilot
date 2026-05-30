import type { Metadata } from "next";

export const metadata: Metadata = { title: "プライバシーポリシー" };

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "64px 24px", lineHeight: "1.8", color: "var(--ink-muted)", fontSize: "15px" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px" }}>
        プライバシーポリシー
      </h1>
      <p style={{ color: "var(--ink-subtle)", fontSize: "13px", marginBottom: "40px" }}>最終更新: 2026年5月30日</p>

      {[
        {
          title: "1. 収集する情報",
          body: "メールアドレス、X アカウント情報 (screen name, user_id)、投稿した下書き内容、AI 生成リクエスト。アクセスログ (IP アドレス、User-Agent) を Vercel が自動収集します。",
        },
        {
          title: "2. 利用目的",
          body: "サービス提供、認証、AI 下書き生成、X への投稿。お問い合わせ対応。サービス改善のための匿名統計分析。",
        },
        {
          title: "3. 第三者提供",
          body: "法令に基づく場合を除き、個人情報を第三者に提供しません。利用するサービス: Turso (DB, SOC2)、Vercel (Hosting, SOC2)、Stripe (決済, PCI DSS)、Resend (メール, SOC2)、PostHog (分析, GDPR対応)、Anthropic (AI, SOC2)。",
        },
        {
          title: "4. AI 学習への利用",
          body: "お客様の下書き内容および X への投稿内容を、AI モデルのトレーニングや改善に使用することはありません。",
        },
        {
          title: "5. X トークンの取り扱い",
          body: "X OAuth 2.0 アクセストークンは AES-256-GCM により暗号化してデータベースに保存します。マイページからいつでも連携を解除できます。",
        },
        {
          title: "6. データ削除",
          body: "アカウント削除をご希望の場合、設定画面のアカウント削除機能よりリクエストいただくか、support@draftpilot.dev までご連絡ください。30日以内に全データを削除します。",
        },
        {
          title: "7. Cookie",
          body: "セッション管理に Cookie を使用します。PostHog により行動分析 Cookie が設定されます (オプトアウト可)。",
        },
        {
          title: "8. お問い合わせ",
          body: "support@draftpilot.dev",
        },
      ].map(({ title, body }) => (
        <section key={title} style={{ marginBottom: "32px" }}>
          <h2 style={{ color: "var(--ink)", fontWeight: 600, fontSize: "16px", marginBottom: "10px" }}>{title}</h2>
          <p>{body}</p>
        </section>
      ))}
    </div>
  );
}

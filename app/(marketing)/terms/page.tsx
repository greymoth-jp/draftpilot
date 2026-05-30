import type { Metadata } from "next";

export const metadata: Metadata = { title: "利用規約" };

export default function TermsPage() {
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "64px 24px", lineHeight: "1.8", color: "var(--ink-muted)", fontSize: "15px" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px" }}>
        利用規約
      </h1>
      <p style={{ color: "var(--ink-subtle)", fontSize: "13px", marginBottom: "40px" }}>最終更新: 2026年5月30日</p>

      {[
        { title: "1. サービス概要", body: "draftpilot (以下「本サービス」) は、Claude Haiku 4.5 を活用した X (Twitter) 下書き生成・投稿支援 SaaS です。greymoth-jp (以下「運営者」) が提供します。" },
        { title: "2. 利用資格", body: "13歳以上の方がご利用いただけます。X 利用規約に同意していることが前提です。" },
        { title: "3. 禁止事項", body: "スパム投稿、なりすまし、違法コンテンツの生成・投稿、システムへの不正アクセス、API レートリミットの意図的な回避。" },
        { title: "4. 支払いと解約", body: "サブスクリプションは自動更新されます。解約は設定画面より 3 クリック以内で実行できます。解約後も請求期間の末日まで利用できます。" },
        { title: "5. Founders 価格について", body: "Founders 価格 ¥680/月は永久固定です。ただしサブスクリプションをキャンセルした場合、Founders 価格の権利は失効します。再登録時は通常価格が適用されます。" },
        { title: "6. 返金", body: "購入から 30 日以内は全額返金します。support@draftpilot.dev までご連絡ください。" },
        { title: "7. 免責事項", body: "AI が生成した内容の正確性を保証しません。X API の制限・障害に起因するサービス不能について責任を負いません。" },
        { title: "8. 規約変更", body: "規約を変更する際は、メールまたはサービス内通知で事前にお知らせします。" },
        { title: "9. 準拠法", body: "本規約は日本法に準拠し、東京地方裁判所を専属的合意管轄とします。" },
      ].map(({ title, body }) => (
        <section key={title} style={{ marginBottom: "28px" }}>
          <h2 style={{ color: "var(--ink)", fontWeight: 600, fontSize: "16px", marginBottom: "10px" }}>{title}</h2>
          <p>{body}</p>
        </section>
      ))}
    </div>
  );
}

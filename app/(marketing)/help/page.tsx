import type { Metadata } from "next";

export const metadata: Metadata = { title: "ヘルプ" };

const faqs = [
  { q: "X アカウントとの連携方法を教えてください。", a: "設定 > X アカウント連携 より OAuth 2.0 でワンクリック連携できます。いつでも解除可能です。" },
  { q: "1日の生成回数制限はありますか？", a: "Free プランは AI 生成 10回/日、投稿 5回/日。Pro/Lifetime は無制限です。" },
  { q: "MCP サーバーの設定方法は？", a: "Claude Code で `claude mcp add draftpilot` を実行し、API キーを設定してください。詳細は README を参照してください。" },
  { q: "スケジュール投稿はどう使いますか？", a: "作成画面で下書きを保存後、カレンダーアイコンから日時を指定してください。Pro 以上の機能です。" },
  { q: "投稿が失敗した場合は？", a: "失敗したツイートはスケジュール画面に「失敗」ステータスで表示されます。X API の制限が原因の場合が多いです。" },
  { q: "X の Rate Limit に抵触しますか？", a: "X API v2 Free tier は月 1,500 投稿まで無料です。それを超える場合は X の有料 API プランが必要です。" },
  { q: "データを削除するには？", a: "設定 > アカウント > アカウント削除 より削除できます。全データが30日以内に削除されます。" },
  { q: "返金を申請するには？", a: "購入から30日以内であれば support@draftpilot.dev にご連絡ください。全額返金いたします。" },
];

export default function HelpPage() {
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "64px 24px" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 700, color: "var(--ink)", marginBottom: "40px" }}>
        ヘルプ
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {faqs.map(({ q, a }) => (
          <details
            key={q}
            style={{ borderBottom: "1px solid var(--hairline)", padding: "20px 0" }}
          >
            <summary style={{ color: "var(--ink)", fontWeight: 600, fontSize: "15px", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {q}
              <span style={{ color: "var(--pilot-primary)", fontSize: "18px", marginLeft: "16px" }}>+</span>
            </summary>
            <p style={{ color: "var(--ink-subtle)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>{a}</p>
          </details>
        ))}
      </div>
      <div style={{ marginTop: "48px", background: "var(--surface-1)", border: "1px solid var(--hairline)", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
        <p style={{ color: "var(--ink-muted)", fontSize: "14px", marginBottom: "8px" }}>解決しない場合はお問い合わせください</p>
        <a href="mailto:support@draftpilot.dev" style={{ color: "var(--pilot-primary)", textDecoration: "none", fontWeight: 600 }}>
          support@draftpilot.dev
        </a>
      </div>
    </div>
  );
}

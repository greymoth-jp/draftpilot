export default function HistoryPage() {
  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px" }}>
        投稿履歴
      </h1>
      <p style={{ color: "var(--ink-subtle)", fontSize: "14px", marginBottom: "32px" }}>
        過去の投稿とエンゲージメント指標
      </p>
      <div style={{ background: "var(--surface-1)", border: "1px solid var(--hairline)", borderRadius: "12px", padding: "40px", textAlign: "center" }}>
        <p style={{ color: "var(--ink-subtle)", fontSize: "15px" }}>まだ投稿履歴がありません</p>
      </div>
    </div>
  );
}

export default function SchedulePage() {
  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px" }}>
        スケジュール
      </h1>
      <p style={{ color: "var(--ink-subtle)", fontSize: "14px", marginBottom: "32px" }}>
        予約投稿の管理。5分ごとに自動チェックします。
      </p>
      <div style={{ background: "var(--surface-1)", border: "1px solid var(--hairline)", borderRadius: "12px", padding: "40px", textAlign: "center" }}>
        <p style={{ color: "var(--ink-subtle)", fontSize: "15px" }}>スケジュールされた投稿はありません</p>
        <p style={{ color: "var(--ink-tertiary)", fontSize: "13px", marginTop: "8px" }}>
          スケジュール投稿は Pro プランの機能です
        </p>
      </div>
    </div>
  );
}

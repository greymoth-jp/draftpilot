import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px" }}>
        ダッシュボード
      </h1>
      <p style={{ color: "var(--ink-subtle)", fontSize: "14px", marginBottom: "32px" }}>
        X を、静かに使う。
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        {[
          { label: "今日の生成", value: "—", sub: "回" },
          { label: "今日の投稿", value: "—", sub: "件" },
          { label: "下書き保存中", value: "—", sub: "件" },
          { label: "スケジュール待ち", value: "—", sub: "件" },
        ].map(({ label, value, sub }) => (
          <div
            key={label}
            style={{ background: "var(--surface-1)", border: "1px solid var(--hairline)", borderRadius: "12px", padding: "20px" }}
          >
            <p style={{ color: "var(--ink-subtle)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px" }}>{label}</p>
            <p style={{ color: "var(--ink)", fontSize: "28px", fontWeight: 700 }}>
              {value}<span style={{ fontSize: "14px", color: "var(--ink-subtle)", marginLeft: "4px" }}>{sub}</span>
            </p>
          </div>
        ))}
      </div>

      <div style={{ background: "var(--surface-1)", border: "1px solid var(--pilot-deep)", borderRadius: "12px", padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <p style={{ color: "var(--pilot-glow)", fontWeight: 600, fontSize: "15px", marginBottom: "4px" }}>下書きを作成する</p>
          <p style={{ color: "var(--ink-subtle)", fontSize: "13px" }}>テーマを入力して AI に 5 案を生成させましょう</p>
        </div>
        <Link
          href="/compose"
          style={{ background: "var(--pilot-primary)", color: "var(--canvas)", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "14px", whiteSpace: "nowrap" }}
        >
          下書きを作成 →
        </Link>
      </div>
    </div>
  );
}

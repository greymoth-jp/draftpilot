import Link from "next/link";

export default function DraftsPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 700, color: "var(--ink)" }}>
          下書き一覧
        </h1>
        <Link
          href="/compose"
          style={{ background: "var(--pilot-primary)", color: "var(--canvas)", padding: "10px 18px", borderRadius: "8px", textDecoration: "none", fontWeight: 600, fontSize: "14px" }}
        >
          新しく作成
        </Link>
      </div>
      <div style={{ background: "var(--surface-1)", border: "1px solid var(--hairline)", borderRadius: "12px", padding: "40px", textAlign: "center" }}>
        <p style={{ color: "var(--ink-subtle)", fontSize: "15px" }}>まだ下書きがありません</p>
        <p style={{ color: "var(--ink-tertiary)", fontSize: "13px", marginTop: "8px" }}>
          <Link href="/compose" style={{ color: "var(--pilot-primary)", textDecoration: "none" }}>下書きを作成</Link> して保存してください
        </p>
      </div>
    </div>
  );
}

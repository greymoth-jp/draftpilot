import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        textAlign: "center",
        padding: "24px",
        background: "var(--canvas)",
      }}
    >
      <p style={{ color: "var(--pilot-primary)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em" }}>
        404
      </p>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 700, color: "var(--ink)" }}>
        ページが見つかりません
      </h1>
      <p style={{ color: "var(--ink-subtle)", fontSize: "15px" }}>
        このページは存在しないか、移動されました。
      </p>
      <Link
        href="/"
        style={{
          color: "var(--pilot-primary)",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "14px",
        }}
      >
        ← ホームに戻る
      </Link>
    </div>
  );
}

"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
      <p style={{ color: "var(--danger)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em" }}>
        エラー
      </p>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 700, color: "var(--ink)" }}>
        問題が発生しました
      </h1>
      <p style={{ color: "var(--ink-subtle)", fontSize: "14px", maxWidth: "400px" }}>
        {error.message ?? "予期しないエラーが発生しました。"}
      </p>
      <button
        onClick={reset}
        style={{
          background: "var(--pilot-primary)",
          color: "var(--canvas)",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: "14px",
        }}
      >
        もう一度試す
      </button>
    </div>
  );
}

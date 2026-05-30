"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, callbackURL: "/dashboard" }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error ?? "メール送信に失敗しました");
        return;
      }
      setSent(true);
    } catch {
      alert("メール送信に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  }

  async function handleX() {
    await signIn.social({ provider: "twitter", callbackURL: "/dashboard" });
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--canvas)",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "var(--surface-1)",
          border: "1px solid var(--hairline)",
          borderRadius: "16px",
          padding: "40px 32px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "24px",
            fontWeight: 700,
            color: "var(--ink)",
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          draftpilot
        </h1>
        <p style={{ color: "var(--ink-subtle)", textAlign: "center", fontSize: "14px", marginBottom: "32px" }}>
          ログインまたは新規登録
        </p>

        {sent ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>✉️</div>
            <p style={{ color: "var(--ink-muted)", fontSize: "15px", lineHeight: 1.7 }}>
              {email} にログインリンクを送りました。メールを確認してください。
            </p>
          </div>
        ) : (
          <>
            <button
              onClick={handleX}
              style={{
                width: "100%",
                background: "var(--surface-2)",
                border: "1px solid var(--hairline-strong)",
                color: "var(--ink)",
                padding: "12px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <span>𝕏</span> X (Twitter) でログイン
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ flex: 1, height: "1px", background: "var(--hairline)" }} />
              <span style={{ color: "var(--ink-subtle)", fontSize: "12px" }}>または</span>
              <div style={{ flex: 1, height: "1px", background: "var(--hairline)" }} />
            </div>

            <form onSubmit={handleMagicLink} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="メールアドレス"
                required
                style={{
                  background: "var(--surface-3)",
                  border: "1px solid var(--hairline-strong)",
                  color: "var(--ink)",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "var(--pilot-primary)",
                  color: "var(--canvas)",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  fontWeight: 700,
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "送信中..." : "ログインリンクを送る"}
              </button>
            </form>
          </>
        )}

        <p style={{ color: "var(--ink-tertiary)", fontSize: "12px", textAlign: "center", marginTop: "24px", lineHeight: 1.6 }}>
          ログインすることで{" "}
          <a href="/terms" style={{ color: "var(--pilot-primary)" }}>利用規約</a> と{" "}
          <a href="/privacy" style={{ color: "var(--pilot-primary)" }}>プライバシーポリシー</a> に同意したことになります。
        </p>
      </div>
    </div>
  );
}

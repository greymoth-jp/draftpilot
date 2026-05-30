"use client";

import { signOut } from "@/lib/auth/client";

export default function SettingsPage() {
  async function handleDeleteAccount() {
    if (!confirm("アカウントを削除します。この操作は取り消せません。続けますか？")) return;
    try {
      const res = await fetch("/api/account/delete", { method: "DELETE" });
      if (res.ok) {
        await signOut();
        window.location.href = "/";
      } else {
        alert("削除に失敗しました。support@draftpilot.dev にお問い合わせください。");
      }
    } catch {
      alert("エラーが発生しました。");
    }
  }

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 700, color: "var(--ink)", marginBottom: "32px" }}>
        設定
      </h1>

      <section style={{ background: "var(--surface-1)", border: "1px solid var(--hairline)", borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
        <h2 style={{ color: "var(--ink)", fontWeight: 600, fontSize: "16px", marginBottom: "16px" }}>X アカウント</h2>
        <p style={{ color: "var(--ink-subtle)", fontSize: "14px", marginBottom: "16px" }}>
          X (Twitter) アカウントを連携して投稿機能を使えます。
        </p>
        <button
          style={{ background: "var(--surface-2)", border: "1px solid var(--hairline-strong)", color: "var(--ink)", padding: "10px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "14px" }}
        >
          X アカウントを連携する
        </button>
      </section>

      <section style={{ background: "var(--surface-1)", border: "1px solid var(--hairline)", borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
        <h2 style={{ color: "var(--ink)", fontWeight: 600, fontSize: "16px", marginBottom: "16px" }}>サブスクリプション</h2>
        <p style={{ color: "var(--ink-subtle)", fontSize: "14px", marginBottom: "16px" }}>
          現在のプラン: <strong style={{ color: "var(--ink)" }}>Free</strong>
        </p>
        <a href="/pricing" style={{ color: "var(--pilot-primary)", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>
          Pro にアップグレード →
        </a>
      </section>

      <section style={{ background: "var(--surface-1)", border: "1px solid var(--danger)", borderRadius: "12px", padding: "24px" }}>
        <h2 style={{ color: "var(--danger)", fontWeight: 600, fontSize: "16px", marginBottom: "12px" }}>
          アカウント削除
        </h2>
        <p style={{ color: "var(--ink-subtle)", fontSize: "14px", marginBottom: "16px" }}>
          アカウントと全データを削除します。この操作は取り消せません。
        </p>
        <button
          onClick={handleDeleteAccount}
          style={{ background: "transparent", border: "1px solid var(--danger)", color: "var(--danger)", padding: "10px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}
        >
          アカウントを削除する
        </button>
      </section>
    </div>
  );
}

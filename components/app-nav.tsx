"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/auth/client";

const navItems = [
  { href: "/dashboard", label: "ダッシュボード", icon: "◈" },
  { href: "/compose", label: "下書き作成", icon: "✦" },
  { href: "/drafts", label: "下書き一覧", icon: "≡" },
  { href: "/schedule", label: "スケジュール", icon: "◷" },
  { href: "/history", label: "投稿履歴", icon: "⊙" },
  { href: "/settings", label: "設定", icon: "⚙" },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        width: "220px",
        minWidth: "220px",
        borderRight: "1px solid var(--hairline)",
        display: "flex",
        flexDirection: "column",
        padding: "20px 12px",
        gap: "4px",
      }}
    >
      <Link
        href="/dashboard"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "16px",
          fontWeight: 700,
          color: "var(--ink)",
          textDecoration: "none",
          padding: "8px 12px",
          marginBottom: "12px",
          display: "block",
        }}
      >
        draftpilot
      </Link>

      {navItems.map(({ href, label, icon }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              color: active ? "var(--ink)" : "var(--ink-subtle)",
              background: active ? "var(--surface-2)" : "transparent",
              fontWeight: active ? 600 : 400,
              transition: "background 0.1s",
            }}
          >
            <span style={{ color: active ? "var(--pilot-primary)" : "var(--ink-tertiary)", fontSize: "16px" }}>
              {icon}
            </span>
            {label}
          </Link>
        );
      })}

      <div style={{ flex: 1 }} />

      <button
        onClick={() => signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } })}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 12px",
          borderRadius: "8px",
          background: "transparent",
          border: "none",
          color: "var(--ink-subtle)",
          fontSize: "14px",
          cursor: "pointer",
          width: "100%",
          textAlign: "left",
        }}
      >
        <span style={{ color: "var(--ink-tertiary)", fontSize: "16px" }}>→</span>
        ログアウト
      </button>
    </nav>
  );
}

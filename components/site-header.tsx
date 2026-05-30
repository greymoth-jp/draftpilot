"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth/client";

export function SiteHeader() {
  const { data: session } = useSession();

  return (
    <header
      style={{
        borderBottom: "1px solid var(--hairline)",
        padding: "0 24px",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--canvas)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "18px",
          fontWeight: 600,
          color: "var(--ink)",
          textDecoration: "none",
          letterSpacing: "-0.02em",
        }}
      >
        draftpilot
      </Link>

      <nav style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <Link
          href="/pricing"
          style={{
            color: "var(--ink-subtle)",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          料金
        </Link>
        {session ? (
          <Link
            href="/dashboard"
            style={{
              background: "var(--pilot-primary)",
              color: "var(--canvas)",
              padding: "8px 16px",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            ダッシュボード
          </Link>
        ) : (
          <Link
            href="/login"
            style={{
              background: "var(--pilot-primary)",
              color: "var(--canvas)",
              padding: "8px 16px",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            はじめる
          </Link>
        )}
      </nav>
    </header>
  );
}

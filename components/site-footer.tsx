import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--hairline)",
        padding: "32px 24px",
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        style={{ fontFamily: "var(--font-serif)", color: "var(--ink-subtle)", fontSize: "14px" }}
      >
        draftpilot © 2026 greymoth-jp
      </span>
      <nav style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {[
          ["/pricing", "料金"],
          ["/about", "About"],
          ["/privacy", "プライバシー"],
          ["/terms", "利用規約"],
          ["/tokushoho", "特商法"],
          ["/help", "ヘルプ"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            style={{
              color: "var(--ink-subtle)",
              textDecoration: "none",
              fontSize: "13px",
            }}
          >
            {label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}

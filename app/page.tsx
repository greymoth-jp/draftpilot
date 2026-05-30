import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function LandingPage() {
  return (
    <div style={{ background: "var(--canvas)", minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <SiteHeader />
      <main style={{ flex: 1, maxWidth: "720px", margin: "0 auto", padding: "80px 24px" }}>

        {/* Hero */}
        <section style={{ textAlign: "center", marginBottom: "80px" }}>
          <p style={{ color: "var(--pilot-primary)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "20px" }}>
            Claude Haiku 4.5 × X API v2
          </p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: "24px" }}>
            X を、静かに使う。
          </h1>
          <p style={{ color: "var(--ink-muted)", fontSize: "18px", lineHeight: 1.6, marginBottom: "40px", maxWidth: "520px", margin: "0 auto 40px" }}>
            AI が下書きを操縦する。タイムラインを開かずに、投稿できる。
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/login"
              style={{ background: "var(--pilot-primary)", color: "var(--canvas)", padding: "14px 28px", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "16px" }}
            >
              無料ではじめる
            </Link>
            <Link
              href="/pricing"
              style={{ background: "transparent", border: "1px solid var(--hairline-strong)", color: "var(--ink-muted)", padding: "14px 28px", borderRadius: "8px", textDecoration: "none", fontSize: "16px" }}
            >
              料金を見る
            </Link>
          </div>
        </section>

        {/* 3 bullets */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "80px" }}>
          {[
            { icon: "✦", title: "AI が5案生成", desc: "テーマを入力するだけ。Haiku 4.5 が候補を5件即時生成。" },
            { icon: "✦", title: "1クリック投稿", desc: "編集してそのまま投稿。X のタイムラインを一切開かない。" },
            { icon: "✦", title: "MCP 完結", desc: "Claude Code 内で /tweet と打つだけで投稿まで完結。" },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{ background: "var(--surface-1)", border: "1px solid var(--hairline)", borderRadius: "12px", padding: "24px" }}>
              <div style={{ color: "var(--pilot-primary)", fontSize: "20px", marginBottom: "12px" }}>{icon}</div>
              <h3 style={{ color: "var(--ink)", fontWeight: 600, fontSize: "16px", marginBottom: "8px" }}>{title}</h3>
              <p style={{ color: "var(--ink-subtle)", fontSize: "14px", lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </section>

        {/* Pricing sneak */}
        <section style={{ background: "var(--surface-1)", border: "1px solid var(--hairline)", borderRadius: "16px", padding: "40px", textAlign: "center", marginBottom: "64px" }}>
          <p style={{ color: "var(--ink-subtle)", fontSize: "14px", marginBottom: "8px" }}>無料プランで始められます</p>
          <p style={{ color: "var(--ink)", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>
            Pro <span style={{ color: "var(--pilot-primary)" }}>¥980</span>/月
          </p>
          <p style={{ color: "var(--cream-muted)", fontSize: "13px", marginBottom: "24px" }}>
            年払い ¥7,840 (2ヶ月分お得) · Founders 価格 ¥680/月 永久固定 残 100 枠
          </p>
          <Link href="/pricing" style={{ color: "var(--pilot-primary)", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>
            料金の詳細を見る →
          </Link>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: "64px" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--ink)", fontSize: "24px", fontWeight: 600, marginBottom: "24px" }}>
            よくある質問
          </h2>
          {[
            { q: "X の API は必要ですか？", a: "X OAuth 2.0 で連携するため、X アカウントが必要です。アクセス権は随時解除できます。" },
            { q: "Claude の API キーは必要ですか？", a: "不要です。draftpilot が Claude Haiku 4.5 へのアクセスを提供します。AI 生成コストは月額料金に含まれます。" },
            { q: "MCP とは何ですか？", a: "Claude Code 内で動作する拡張機能です。ターミナルから /tweet と入力するだけで投稿まで完結します。" },
            { q: "データは安全ですか？", a: "X の OAuth トークンは AES-256-GCM で暗号化して保存します。取得した下書き内容は学習データには使用しません。" },
          ].map(({ q, a }) => (
            <div key={q} style={{ borderBottom: "1px solid var(--hairline)", paddingBottom: "20px", marginBottom: "20px" }}>
              <p style={{ color: "var(--ink)", fontWeight: 600, fontSize: "15px", marginBottom: "8px" }}>{q}</p>
              <p style={{ color: "var(--ink-subtle)", fontSize: "14px", lineHeight: 1.7 }}>{a}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section style={{ textAlign: "center" }}>
          <Link
            href="/login"
            style={{ background: "var(--pilot-primary)", color: "var(--canvas)", padding: "16px 40px", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "16px", display: "inline-block" }}
          >
            今すぐ無料ではじめる
          </Link>
          <p style={{ color: "var(--ink-tertiary)", fontSize: "12px", marginTop: "12px" }}>
            クレジットカード不要 · 無料プランは永続
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

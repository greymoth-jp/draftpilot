import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "64px 24px" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 700, color: "var(--ink)", marginBottom: "32px" }}>
        About
      </h1>
      <div style={{ lineHeight: "1.9", color: "var(--ink-muted)", fontSize: "16px" }}>
        <p style={{ marginBottom: "20px" }}>
          こんにちは。greymoth-jp と申します。19歳、日本の大学生です。コードを書くこととギターを弾くことが好きです。
        </p>
        <p style={{ marginBottom: "20px" }}>
          draftpilot は、「X を使いたいが、タイムラインに飲み込まれたくない」という自分自身の問題から生まれました。
          投稿したいことはあるのに、X を開くたびに時間が溶けていく。その問題を解決するために作りました。
        </p>
        <p style={{ marginBottom: "20px" }}>
          Claude Haiku 4.5 が下書きを生成し、Claude Code の MCP サーバー経由でターミナルから投稿できます。
          タイムラインを開かずに、静かに X を使う。それだけのツールです。
        </p>
        <p style={{ marginBottom: "20px" }}>
          hype なし。大げさな約束なし。自分が使いたいものを、冷静に作っています。
        </p>
        <p>
          フィードバックは{" "}
          <Link href="https://x.com/greymoth_jp" style={{ color: "var(--pilot-primary)", textDecoration: "none" }}>
            @greymoth_jp
          </Link>{" "}
          まで。
        </p>
      </div>
    </div>
  );
}

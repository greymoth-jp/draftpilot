import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "料金プラン",
  description: "draftpilot の料金プラン。無料から始められます。",
  robots: { index: true, follow: true },
};

const plans = [
  {
    name: "Free",
    priceJpy: null,
    priceLabel: "¥0",
    period: "永続無料",
    features: [
      "AI 下書き生成 10回/日",
      "直接投稿 5回/日",
      "下書き保存 無制限",
      "MCP サーバー (基本)",
    ],
    cta: "無料ではじめる",
    ctaHref: "/login",
    highlight: false,
  },
  {
    name: "Pro",
    priceJpy: 980,
    priceLabel: "¥980",
    period: "/月",
    annualLabel: "年払い ¥7,840 (2ヶ月分お得)",
    foundingLabel: "Founders 価格 ¥680/月 永久固定 · 残 100 枠",
    features: [
      "AI 下書き生成 無制限",
      "投稿 無制限",
      "スケジュール投稿",
      "エンゲージメント分析",
      "MCP サーバー 完全版",
      "優先サポート",
    ],
    cta: "Pro ではじめる",
    ctaHref: "/login?plan=pro",
    highlight: true,
  },
  {
    name: "Lifetime",
    priceJpy: 14800,
    priceLabel: "¥14,800",
    period: "買い切り",
    slotsLabel: "残 50 枠",
    features: [
      "Pro の全機能 永久",
      "将来の機能追加も含む",
      "早期投資者バッジ",
      "月額費用なし",
    ],
    cta: "Lifetime を購入",
    ctaHref: "/login?plan=lifetime",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 24px" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", fontWeight: 700, color: "var(--ink)", textAlign: "center", marginBottom: "12px" }}>
        料金プラン
      </h1>
      <p style={{ color: "var(--ink-subtle)", textAlign: "center", marginBottom: "48px", fontSize: "16px" }}>
        無料から始められます。クレジットカード不要。
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "56px" }}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            style={{
              background: plan.highlight ? "var(--pilot-deep)" : "var(--surface-1)",
              border: `1px solid ${plan.highlight ? "var(--pilot-primary)" : "var(--hairline)"}`,
              borderRadius: "16px",
              padding: "32px 24px",
              position: "relative",
            }}
          >
            {plan.highlight && (
              <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "var(--pilot-primary)", color: "var(--canvas)", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "99px", whiteSpace: "nowrap" }}>
                推奨
              </div>
            )}
            <p style={{ color: "var(--ink-subtle)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>
              {plan.name}
            </p>
            <div style={{ marginBottom: "4px" }}>
              <span style={{ fontSize: "32px", fontWeight: 700, color: "var(--ink)" }}>{plan.priceLabel}</span>
              <span style={{ color: "var(--ink-subtle)", fontSize: "14px" }}>{plan.period}</span>
            </div>
            {plan.annualLabel && (
              <p style={{ color: "var(--pilot-primary)", fontSize: "12px", marginBottom: "4px" }}>{plan.annualLabel}</p>
            )}
            {plan.foundingLabel && (
              <p style={{ color: "var(--cream-muted)", fontSize: "12px", marginBottom: "4px" }}>{plan.foundingLabel}</p>
            )}
            {plan.slotsLabel && (
              <p style={{ color: "var(--warning)", fontSize: "12px", marginBottom: "4px" }}>{plan.slotsLabel}</p>
            )}
            <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 24px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {plan.features.map((f) => (
                <li key={f} style={{ color: "var(--ink-muted)", fontSize: "14px", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{ color: "var(--pilot-primary)", marginTop: "2px" }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={plan.ctaHref}
              style={{
                display: "block",
                textAlign: "center",
                background: plan.highlight ? "var(--pilot-primary)" : "transparent",
                border: `1px solid ${plan.highlight ? "transparent" : "var(--hairline-strong)"}`,
                color: plan.highlight ? "var(--canvas)" : "var(--ink-muted)",
                padding: "12px 16px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* 特商法 6項目 */}
      <section style={{ background: "var(--surface-1)", border: "1px solid var(--hairline)", borderRadius: "12px", padding: "32px" }}>
        <h2 style={{ color: "var(--ink)", fontWeight: 600, fontSize: "16px", marginBottom: "20px" }}>ご購入の前に</h2>
        <dl style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "12px 20px", fontSize: "14px" }}>
          {[
            ["販売価格", "Free: ¥0 / Pro月額: ¥980 / Pro年額: ¥7,840 / Lifetime: ¥14,800"],
            ["支払時期", "お申込み完了時。サブスクリプションは毎月または毎年自動更新。"],
            ["支払方法", "クレジットカード (Stripe 決済)"],
            ["サービス提供", "お申込み完了後、即時にご利用いただけます。"],
            ["解約方法", "マイページ > 設定 > サブスクリプション管理 より3クリック以内でキャンセル可能。"],
            ["返金ポリシー", "購入から30日以内は全額返金対応。お問い合わせください。"],
          ].map(([k, v]) => (
            <>
              <dt key={`dt-${k}`} style={{ color: "var(--ink-subtle)", fontWeight: 600 }}>{k}</dt>
              <dd key={`dd-${k}`} style={{ color: "var(--ink-muted)" }}>{v}</dd>
            </>
          ))}
        </dl>
        <p style={{ color: "var(--ink-tertiary)", fontSize: "12px", marginTop: "16px" }}>
          ※ Pro サブスクリプションは自動更新されます。継続を希望しない場合はご利用期間中にキャンセル手続きをお願いします。
        </p>
        <p style={{ marginTop: "12px" }}>
          <Link href="/tokushoho" style={{ color: "var(--pilot-primary)", fontSize: "13px", textDecoration: "none" }}>
            特定商取引法に基づく表示 →
          </Link>
        </p>
      </section>
    </div>
  );
}

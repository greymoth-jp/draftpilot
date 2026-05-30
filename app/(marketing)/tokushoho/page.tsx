import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表示",
};

export default function TokushohoPage() {
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "64px 24px" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 700, color: "var(--ink)", marginBottom: "40px" }}>
        特定商取引法に基づく表示
      </h1>
      <dl style={{ display: "grid", gap: "20px" }}>
        {[
          ["販売業者", "greymoth-jp (個人事業主)"],
          ["代表者", "非公開 (請求があれば遅滞なく開示)"],
          ["所在地", "非公開 (請求があれば遅滞なく開示)"],
          ["電話番号", "非公開 (請求があれば遅滞なく開示)"],
          ["メールアドレス", "support@draftpilot.dev"],
          ["サービス名", "draftpilot"],
          ["販売価格", "Free: ¥0 / Pro月額: ¥980 / Pro年額: ¥7,840 / Lifetime: ¥14,800 (税込)"],
          ["追加費用", "なし"],
          ["支払方法", "クレジットカード (Visa, Mastercard, American Express) — Stripe 決済"],
          ["支払時期", "お申込み完了時。サブスクリプションは毎月または毎年、自動更新。"],
          ["サービス提供時期", "お申込み完了後、即時に利用可能。"],
          ["返品・キャンセル", "購入から30日以内であれば全額返金。デジタルコンテンツの性質上、30日経過後の返金は原則不可。"],
          ["動作環境", "モダンブラウザ (Chrome, Firefox, Safari, Edge 最新版)"],
        ].map(([k, v]) => (
          <div key={k as string} style={{ borderBottom: "1px solid var(--hairline)", paddingBottom: "20px" }}>
            <dt style={{ color: "var(--ink-subtle)", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>{k}</dt>
            <dd style={{ color: "var(--ink-muted)", fontSize: "14px" }}>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

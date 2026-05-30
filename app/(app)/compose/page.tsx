"use client";

import { useState } from "react";

interface Draft {
  id: string;
  content: string;
  edited: string;
}

export default function ComposePage() {
  const [prompt, setPrompt] = useState("");
  const [context, setContext] = useState("");
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState<string | null>(null);
  const [postedIds, setPostedIds] = useState<Set<string>>(new Set());

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setDrafts([]);
    try {
      const res = await fetch("/api/drafts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, context }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error ?? "生成に失敗しました");
        return;
      }
      const { drafts: generated } = await res.json();
      setDrafts(
        (generated as string[]).map((content, i) => ({
          id: `draft-${i}`,
          content,
          edited: content,
        }))
      );
    } finally {
      setLoading(false);
    }
  }

  async function handlePost(draft: Draft) {
    setPosting(draft.id);
    try {
      const res = await fetch("/api/tweet/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: draft.edited }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error ?? "投稿に失敗しました");
        return;
      }
      setPostedIds((prev) => new Set([...prev, draft.id]));
    } finally {
      setPosting(null);
    }
  }

  async function handleSaveDraft(content: string) {
    await fetch("/api/drafts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, sourcePrompt: prompt }),
    });
    alert("下書きを保存しました");
  }

  const charCount = (text: string) => text.length;
  const isOver = (text: string) => charCount(text) > 280;

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px" }}>
        下書き作成
      </h1>
      <p style={{ color: "var(--ink-subtle)", fontSize: "14px", marginBottom: "32px" }}>
        テーマを入力すると Claude Haiku 4.5 が 5 案を生成します。
      </p>

      <form onSubmit={handleGenerate} style={{ marginBottom: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label style={{ color: "var(--ink-subtle)", fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "8px" }}>
            投稿テーマ / トピック *
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="例: 今日リリースした draftpilot について、solo dev として正直に伝えたいこと"
            required
            rows={3}
            style={{
              width: "100%",
              background: "var(--surface-2)",
              border: "1px solid var(--hairline-strong)",
              color: "var(--ink)",
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "15px",
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
              lineHeight: 1.6,
            }}
          />
        </div>
        <div>
          <label style={{ color: "var(--ink-subtle)", fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "8px" }}>
            追加コンテキスト (任意)
          </label>
          <input
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="例: 日本語で / ハッシュタグ不要 / 19歳 solo dev らしいトーンで"
            style={{
              width: "100%",
              background: "var(--surface-2)",
              border: "1px solid var(--hairline-strong)",
              color: "var(--ink)",
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "15px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          style={{
            background: loading ? "var(--surface-3)" : "var(--pilot-primary)",
            color: loading ? "var(--ink-subtle)" : "var(--canvas)",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "15px",
            fontWeight: 700,
            alignSelf: "flex-start",
          }}
        >
          {loading ? "生成中..." : "5案を生成する"}
        </button>
      </form>

      {drafts.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h2 style={{ color: "var(--ink)", fontWeight: 600, fontSize: "16px" }}>生成された下書き</h2>
          {drafts.map((draft, i) => (
            <div
              key={draft.id}
              style={{
                background: "var(--surface-1)",
                border: `1px solid ${postedIds.has(draft.id) ? "var(--success)" : "var(--hairline)"}`,
                borderRadius: "12px",
                padding: "20px",
                opacity: postedIds.has(draft.id) ? 0.6 : 1,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ color: "var(--pilot-primary)", fontSize: "12px", fontWeight: 600 }}>案 {i + 1}</span>
                <span
                  style={{
                    color: isOver(draft.edited) ? "var(--danger)" : "var(--ink-subtle)",
                    fontSize: "12px",
                  }}
                >
                  {charCount(draft.edited)}/280
                </span>
              </div>
              <textarea
                value={draft.edited}
                onChange={(e) =>
                  setDrafts((prev) =>
                    prev.map((d) =>
                      d.id === draft.id ? { ...d, edited: e.target.value } : d
                    )
                  )
                }
                disabled={postedIds.has(draft.id)}
                rows={4}
                style={{
                  width: "100%",
                  background: "var(--surface-2)",
                  border: `1px solid ${isOver(draft.edited) ? "var(--danger)" : "var(--hairline)"}`,
                  color: "var(--ink)",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                  lineHeight: 1.6,
                }}
              />
              {postedIds.has(draft.id) ? (
                <p style={{ color: "var(--success)", fontSize: "13px", marginTop: "10px", fontWeight: 600 }}>
                  ✓ 投稿済み
                </p>
              ) : (
                <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                  <button
                    onClick={() => handlePost(draft)}
                    disabled={posting === draft.id || isOver(draft.edited)}
                    style={{
                      background: "var(--pilot-primary)",
                      color: "var(--canvas)",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      cursor: posting === draft.id || isOver(draft.edited) ? "not-allowed" : "pointer",
                      fontSize: "13px",
                      fontWeight: 700,
                      opacity: posting === draft.id || isOver(draft.edited) ? 0.6 : 1,
                    }}
                  >
                    {posting === draft.id ? "投稿中..." : "今すぐ投稿"}
                  </button>
                  <button
                    onClick={() => handleSaveDraft(draft.edited)}
                    style={{
                      background: "transparent",
                      border: "1px solid var(--hairline-strong)",
                      color: "var(--ink-subtle)",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                  >
                    下書き保存
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

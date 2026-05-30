# draftpilot — Vision

## One-line
X を、静かに使う。AI が下書きを操縦する。

## Problem
X (Twitter) のタイムラインは依存設計されている。投稿するたびにフィードを開き、平均 8 分を浪費する。
プロクリエイターほどアウトプット頻度が求められるが、タイムライン汚染が認知コストを蝕む。

## Solution
draftpilot は Claude Haiku 4.5 が 5 案生成→ユーザーがインライン編集→1クリック投稿 まで
タイムラインを一度も開かずに完結する X 投稿ツール。
さらに MCP サーバーを通じて Claude Code から直接 X を操作できる "X オートパイロット" を提供する。

## Core Loop
```
prompt → AI 5案生成 → インライン編集 → post / schedule / save
```

## Principles
1. タイムラインを見せない — UX 設計の制約として不可逆
2. 静かなトーン — hype 排除、calm/honest コピー
3. MCP ファースト — AI ネイティブ操作を第一UI として位置付け
4. 音楽クリエイター起点 — ターゲットは発信したいが時間を奪われたくない個人

## Phase Roadmap
- Phase 0 (MVP): Web UI + MCP server + X OAuth PKCE + AI生成
- Phase 1: スケジュール投稿 + エンゲージメント可視化
- Phase 2: チームワークスペース + 分析ダッシュボード
- Phase 3: iOS/Android ネイティブ (Capacitor)

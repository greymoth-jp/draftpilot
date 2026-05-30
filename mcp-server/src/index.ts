#!/usr/bin/env node
/**
 * draftpilot MCP server
 * Tools: draft_tweet, post_tweet, schedule_tweet, recent_engagement
 *
 * Usage in Claude Code:
 *   claude mcp add draftpilot -- node /path/to/mcp-server/dist/index.js
 *   Set env: DRAFTPILOT_API_KEY=your-api-key DRAFTPILOT_BASE_URL=https://draftpilot.dev
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const BASE_URL =
  process.env.DRAFTPILOT_BASE_URL ?? "https://draftpilot.dev";
const API_KEY = process.env.DRAFTPILOT_API_KEY ?? "";

async function callAPI(
  path: string,
  method: "GET" | "POST",
  body?: unknown
): Promise<unknown> {
  const res = await fetch(`${BASE_URL}/api/mcp${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as Record<string, string>).error ??
        `API error ${res.status}`
    );
  }
  return res.json();
}

const server = new Server(
  { name: "draftpilot", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "draft_tweet",
      description:
        "Claude Haiku 4.5 を使って X (Twitter) の投稿下書きを 5 案生成します。タイムラインを開かずに使えます。",
      inputSchema: {
        type: "object",
        properties: {
          theme: {
            type: "string",
            description: "投稿したいテーマ・トピック",
          },
          context: {
            type: "string",
            description: "追加コンテキスト (言語、トーン、禁止ハッシュタグ等)",
          },
        },
        required: ["theme"],
      },
    },
    {
      name: "post_tweet",
      description: "指定したテキストを X に投稿します (280文字以内)。",
      inputSchema: {
        type: "object",
        properties: {
          text: {
            type: "string",
            description: "投稿するツイートテキスト (280文字以内)",
          },
        },
        required: ["text"],
      },
    },
    {
      name: "schedule_tweet",
      description: "指定した日時に X へ投稿をスケジュールします (Pro 以上)。",
      inputSchema: {
        type: "object",
        properties: {
          text: {
            type: "string",
            description: "投稿するツイートテキスト (280文字以内)",
          },
          scheduled_at: {
            type: "string",
            description: "ISO 8601 形式の日時 (例: 2026-06-01T09:00:00+09:00)",
          },
        },
        required: ["text", "scheduled_at"],
      },
    },
    {
      name: "recent_engagement",
      description: "直近 10 件の投稿とエンゲージメント指標を取得します。",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "draft_tweet": {
        const { theme, context } = args as {
          theme: string;
          context?: string;
        };
        const data = await callAPI("/draft", "POST", {
          prompt: theme,
          context,
        });
        const { drafts } = data as { drafts: string[] };
        const formatted = drafts
          .map((d, i) => `【案 ${i + 1}】\n${d}`)
          .join("\n\n---\n\n");
        return {
          content: [{ type: "text", text: formatted }],
        };
      }

      case "post_tweet": {
        const { text } = args as { text: string };
        if (text.length > 280) {
          return {
            content: [
              {
                type: "text",
                text: `エラー: ${text.length} 文字は 280 文字制限を超えています。`,
              },
            ],
            isError: true,
          };
        }
        const data = await callAPI("/post", "POST", { content: text });
        const { url } = data as { url: string; xTweetId: string };
        return {
          content: [
            {
              type: "text",
              text: `投稿完了: ${url}`,
            },
          ],
        };
      }

      case "schedule_tweet": {
        const { text, scheduled_at } = args as {
          text: string;
          scheduled_at: string;
        };
        const data = await callAPI("/schedule", "POST", {
          content: text,
          scheduledFor: scheduled_at,
        });
        const { queueId } = data as { queueId: string };
        return {
          content: [
            {
              type: "text",
              text: `スケジュール登録完了 (ID: ${queueId})。${scheduled_at} に自動投稿されます。`,
            },
          ],
        };
      }

      case "recent_engagement": {
        const data = await callAPI("/history?limit=10", "GET");
        const { tweets } = data as {
          tweets: Array<{
            content: string;
            postedAt: string;
            likes: number;
            reposts: number;
            replies: number;
            impressions: number;
          }>;
        };
        if (!tweets.length) {
          return {
            content: [{ type: "text", text: "まだ投稿履歴がありません。" }],
          };
        }
        const formatted = tweets
          .map(
            (t, i) =>
              `[${i + 1}] ${t.postedAt.slice(0, 10)}\n${t.content}\n♥${t.likes} 🔁${t.reposts} 💬${t.replies} 👁${t.impressions}`
          )
          .join("\n\n---\n\n");
        return { content: [{ type: "text", text: formatted }] };
      }

      default:
        return {
          content: [{ type: "text", text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }
  } catch (err) {
    return {
      content: [
        {
          type: "text",
          text: `エラー: ${(err as Error).message}`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("draftpilot MCP server started");
}

main().catch(console.error);

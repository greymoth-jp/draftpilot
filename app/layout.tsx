import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "draftpilot — X を、静かに使う",
    template: "%s | draftpilot",
  },
  description:
    "Claude Haiku 4.5 が X の下書きを操縦する。タイムラインを開かずに、静かに投稿。",
  keywords: ["X", "Twitter", "AI", "tweet", "draft", "Claude", "MCP"],
  authors: [{ name: "greymoth-jp" }],
  creator: "greymoth-jp",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://draftpilot.dev"
  ),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "https://draftpilot.dev",
    siteName: "draftpilot",
    title: "draftpilot — X を、静かに使う",
    description:
      "Claude Haiku 4.5 が X の下書きを操縦する。タイムラインを開かずに、静かに投稿。",
    images: [{ url: "/marketing/og-1200x630.png", width: 1200, height: 630, alt: "draftpilot" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "draftpilot — X を、静かに使う",
    description:
      "Claude Haiku 4.5 が X の下書きを操縦する。タイムラインを開かずに、静かに投稿。",
    creator: "@greymoth_jp",
    images: ["/marketing/og-1200x630.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} ${lora.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>{children}</body>
    </html>
  );
}

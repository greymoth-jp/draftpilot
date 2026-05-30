import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "draftpilot",
    short_name: "draftpilot",
    description: "X を、静かに使う。",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#08090c",
    theme_color: "#4ecdc4",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

import { AppNav } from "@/components/app-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100dvh", background: "var(--canvas)" }}>
      <AppNav />
      <main style={{ flex: 1, padding: "24px", overflow: "auto", maxWidth: "900px" }}>
        {children}
      </main>
    </div>
  );
}

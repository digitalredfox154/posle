import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useClientAuth } from "@/hooks/useClientAuth";
import { LayoutDashboard, PawPrint, BookOpen, CreditCard, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const navItems = [
  { href: "/account", label: "Обзор", icon: LayoutDashboard },
  { href: "/account/pets", label: "Мои питомцы", icon: PawPrint },
  { href: "/account/diary", label: "Дневник визитов", icon: BookOpen },
  { href: "/account/subscription", label: "Подписка", icon: CreditCard },
];

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  const { client, isLoading } = useClientAuth(true);
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = trpc.posleClient.logout.useMutation({
    onSuccess: () => { window.location.href = "/"; },
    onError: () => toast.error("Ошибка выхода"),
  });

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0E0E0E", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "1px", height: "48px", background: "#A8C5B5", animation: "pulse 1.5s ease-in-out infinite" }} />
      </div>
    );
  }

  if (!client) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#0E0E0E", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <header style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", gap: "16px", background: "#0E0E0E" }}>
        <Link href="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 300, letterSpacing: "0.2em", color: "#F5F0E8", textDecoration: "none" }}>
          ПОСЛЕ
        </Link>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.1em", color: "rgba(245,240,232,0.35)", display: "none" }} className="md:block">
          {client.name || client.email || client.phone}
        </span>
        <button
          onClick={() => logout.mutate()}
          style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", color: "rgba(245,240,232,0.3)", fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.1em", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#A8C5B5")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.3)")}
          className="hidden md:flex"
        >
          <LogOut size={13} />
          Выйти
        </button>
        <button
          style={{ background: "none", border: "none", cursor: "pointer", color: "#F5F0E8", padding: "4px" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <aside
          style={{
            width: "220px",
            flexShrink: 0,
            background: "#0A0A0A",
            borderRight: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            flexDirection: "column",
            padding: "32px 0",
            position: "sticky",
            top: 0,
            height: "calc(100vh - 64px)",
          }}
          className={`
            fixed md:static inset-0 z-40 transition-transform duration-300
            ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
        >
          {/* User info */}
          <div style={{ padding: "0 20px 28px", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: "20px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(168,197,181,0.12)", border: "1px solid rgba(168,197,181,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "#A8C5B5" }}>
                {(client.name || client.email || "?")[0].toUpperCase()}
              </span>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", fontWeight: 300, color: "#F5F0E8", marginBottom: "2px" }}>
              {client.name || "Клиент"}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(245,240,232,0.3)", letterSpacing: "0.05em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {client.email || client.phone}
            </p>
          </div>

          <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px", padding: "0 12px" }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 12px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    color: active ? "#A8C5B5" : "rgba(245,240,232,0.4)",
                    background: active ? "rgba(168,197,181,0.08)" : "transparent",
                    borderLeft: active ? "2px solid #A8C5B5" : "2px solid transparent",
                  }}
                  onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.7)"; }}
                  onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.4)"; }}
                >
                  <Icon size={14} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div style={{ padding: "20px 12px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <button
              onClick={() => logout.mutate()}
              style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)", transition: "color 0.2s", width: "100%" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.6)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.25)")}
            >
              <LogOut size={14} />
              Выйти
            </button>
          </div>
        </aside>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            style={{ position: "fixed", inset: 0, zIndex: 30, background: "rgba(0,0,0,0.6)" }}
            onClick={() => setMobileOpen(false)}
            className="md:hidden"
          />
        )}

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0, padding: "40px 32px", background: "#0E0E0E" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

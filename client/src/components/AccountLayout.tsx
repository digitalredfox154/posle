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
      <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
        <div className="w-px h-12 bg-[#A8C5B5] animate-pulse" />
      </div>
    );
  }

  if (!client) return null;

  const SidebarContent = () => (
    <>
      {/* User info */}
      <div className="px-5 pb-7 border-b border-white/5 mb-5">
        <div className="w-10 h-10 rounded-full bg-[#A8C5B5]/10 border border-[#A8C5B5]/20 flex items-center justify-center mb-3">
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "#A8C5B5" }}>
            {(client.name || client.email || "?")[0].toUpperCase()}
          </span>
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", fontWeight: 300, color: "#F5F0E8", marginBottom: "2px" }}>
          {client.name || "Клиент"}
        </p>
        <p className="text-[10px] text-white/30 truncate" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em" }}>
          {client.email || client.phone}
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 transition-all duration-200 no-underline"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: active ? "#A8C5B5" : "rgba(245,240,232,0.4)",
                background: active ? "rgba(168,197,181,0.08)" : "transparent",
                borderLeft: active ? "2px solid #A8C5B5" : "2px solid transparent",
              }}
            >
              <Icon size={14} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pt-5 border-t border-white/5">
        <button
          onClick={() => logout.mutate()}
          className="flex items-center gap-2.5 px-3 py-2.5 w-full bg-transparent border-0 cursor-pointer transition-colors duration-200 text-white/25 hover:text-white/60"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}
        >
          <LogOut size={14} />
          Выйти
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex flex-col">
      {/* Top bar */}
      <header className="border-b border-white/[0.06] bg-[#0E0E0E] h-16 flex items-center px-4 md:px-6 gap-4 flex-shrink-0">
        <Link href="/" className="no-underline" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 300, letterSpacing: "0.2em", color: "#F5F0E8" }}>
          ПОСЛЕ
        </Link>
        <div className="flex-1" />
        <span className="hidden md:block text-white/35" style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.1em" }}>
          {client.name || client.email || client.phone}
        </span>
        <button
          onClick={() => logout.mutate()}
          className="hidden md:flex items-center gap-1.5 bg-transparent border-0 cursor-pointer text-white/30 hover:text-[#A8C5B5] transition-colors"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.1em" }}
        >
          <LogOut size={13} />
          Выйти
        </button>
        {/* Mobile hamburger */}
        <button
          className="md:hidden bg-transparent border-0 cursor-pointer text-white/80 p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Desktop sidebar — always visible */}
        <aside className="hidden md:flex flex-col w-[220px] flex-shrink-0 bg-[#0A0A0A] border-r border-white/5 py-8 sticky top-0 h-[calc(100vh-64px)]">
          <SidebarContent />
        </aside>

        {/* Mobile drawer overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-50 md:hidden"
            onClick={() => setMobileOpen(false)}
            style={{ background: "rgba(0,0,0,0.65)" }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-72 bg-[#0A0A0A] flex flex-col py-8"
              onClick={(e) => e.stopPropagation()}
            >
              <SidebarContent />
            </div>
          </div>
        )}

        {/* Main content — full width on mobile */}
        <main className="flex-1 min-w-0 bg-[#0E0E0E] p-5 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}

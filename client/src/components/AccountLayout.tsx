import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useClientAuth } from "@/hooks/useClientAuth";
import { LayoutDashboard, PawPrint, BookOpen, CreditCard, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const navItems = [
  { href: "/account", label: "Дашборд", icon: LayoutDashboard },
  { href: "/account/pets", label: "Мои питомцы", icon: PawPrint },
  { href: "/account/diary", label: "Дневник", icon: BookOpen },
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
    onSuccess: () => {
      window.location.href = "/";
    },
    onError: () => toast.error("Ошибка выхода"),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-px h-12 bg-[#A8C5B5] animate-pulse" />
      </div>
    );
  }

  if (!client) return null;

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col">
      {/* Top bar */}
      <header className="w-full bg-[#0E0E0E] h-16 flex items-center px-4 md:px-8 gap-4">
        <Link href="/" className="text-white font-light tracking-[0.15em] mr-auto" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px" }}>
          ПОСЛЕ
        </Link>
        <span className="text-white/40 text-xs hidden md:block" style={{ fontFamily: "'Inter', sans-serif" }}>
          {client.name || client.phone}
        </span>
        <button
          onClick={() => logout.mutate()}
          className="text-white/40 hover:text-white transition-colors hidden md:flex items-center gap-2 text-xs"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <LogOut size={14} />
          Выйти
        </button>
        <button
          className="text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`
          fixed md:static inset-0 z-40 bg-[#0E0E0E] md:bg-white
          w-64 flex flex-col pt-8 pb-8 px-6
          border-r border-[#E8F0EC]
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          <nav className="flex flex-col gap-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 text-xs tracking-wider uppercase transition-all duration-200 ${
                    active
                      ? "bg-[#A8C5B5]/20 text-[#0E0E0E] md:text-[#0E0E0E]"
                      : "text-white/60 md:text-[#0E0E0E]/50 hover:text-white md:hover:text-[#0E0E0E]"
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <Icon size={15} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={() => logout.mutate()}
            className="flex items-center gap-3 px-3 py-3 text-xs tracking-wider uppercase text-white/40 md:text-[#0E0E0E]/30 hover:text-white md:hover:text-[#0E0E0E]/60 transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <LogOut size={15} />
            Выйти
          </button>
        </aside>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}

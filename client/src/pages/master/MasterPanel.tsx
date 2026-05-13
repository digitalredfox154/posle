import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useClientAuth } from "@/hooks/useClientAuth";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { LogOut, Calendar, Plus, X, Upload, Scissors } from "lucide-react";

const NAV = [
  { href: "/master", label: "Визиты" },
  { href: "/master/new-visit", label: "Новый визит" },
];

function MasterLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const logout = trpc.posleClient.logout.useMutation({ onSuccess: () => { window.location.href = "/"; } });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      <header className="bg-[#0E0E0E] h-16 flex items-center px-6 gap-6">
        <Link href="/" className="text-white font-light tracking-[0.15em] mr-auto" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px" }}>
          ПОСЛЕ
        </Link>
        <span className="text-[#A8C5B5] text-[10px] tracking-[0.2em] uppercase hidden sm:block" style={{ fontFamily: "'Inter', sans-serif" }}>Мастер</span>
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className={`text-xs tracking-widest uppercase transition-colors ${location === n.href ? "text-white" : "text-white/40 hover:text-white"}`} style={{ fontFamily: "'Inter', sans-serif" }}>
            {n.label}
          </Link>
        ))}
        <button onClick={() => logout.mutate()} className="text-white/30 hover:text-white transition-colors">
          <LogOut size={16} />
        </button>
      </header>
      <main className="container py-10 max-w-3xl">{children}</main>
    </div>
  );
}

export default function MasterPanel() {
  useClientAuth(true);
  const today = new Date().toISOString().split("T")[0];
  const { data: todayVisits, isLoading } = trpc.visits.masterList.useQuery({ date: today });

  return (
    <MasterLayout>
      <div className="mb-8">
        <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Панель мастера</p>
        <h1 className="font-light text-[#0E0E0E]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 40px)" }}>
          Визиты сегодня
        </h1>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map(i => <div key={i} className="bg-white border border-[#E8F0EC] h-20 animate-pulse" />)}
        </div>
      ) : todayVisits && todayVisits.length > 0 ? (
        <div className="flex flex-col gap-3">
          {todayVisits.map((visit: any) => (
            <div key={visit.id} className="bg-white border border-[#E8F0EC] p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#F7FAF9] flex items-center justify-center flex-shrink-0">
                <Scissors size={14} className="text-[#A8C5B5]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#0E0E0E] font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>
                  {visit.petName || "Питомец"}
                </p>
                <p className="text-[#0E0E0E]/40 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {visit.serviceType || "Груминг"} · {new Date(visit.visitDate).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              <Link
                href={`/master/visit/${visit.id}`}
                className="text-xs tracking-[0.2em] uppercase text-[#A8C5B5] hover:text-[#0E0E0E] border-b border-[#A8C5B5] pb-0.5 transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Заполнить
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-[#E8F0EC] p-12 text-center">
          <Calendar size={28} className="text-[#A8C5B5] mx-auto mb-4" />
          <p className="text-[#0E0E0E]/50 text-sm mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>На сегодня визитов нет</p>
          <Link href="/master/new-visit" className="text-xs tracking-[0.2em] uppercase text-[#A8C5B5] hover:text-[#0E0E0E] border-b border-[#A8C5B5] pb-0.5 transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
            Добавить визит вручную
          </Link>
        </div>
      )}
    </MasterLayout>
  );
}

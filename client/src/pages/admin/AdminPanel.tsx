import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { useClientAuth } from "@/hooks/useClientAuth";
import { Search, Users, PawPrint, Calendar, LogOut, ChevronRight, Plus } from "lucide-react";
import { toast } from "sonner";

export default function AdminPanel() {
  const { client, isLoading } = useClientAuth(true);
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");

  const { data: clients, isLoading: clientsLoading } = trpc.admin.listClients.useQuery(undefined, {
    onError: (e: any) => {
      if (e.data?.code === "FORBIDDEN" || e.data?.code === "UNAUTHORIZED") {
        setLocation("/account");
      }
    },
  } as any);

  const logout = trpc.posleClient.logout.useMutation({
    onSuccess: () => { window.location.href = "/"; },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
        <div className="w-px h-12 bg-[#A8C5B5] animate-pulse" />
      </div>
    );
  }

  const filtered = (clients || []).filter((c: any) =>
    !search ||
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search)
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0E0E0E" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 16px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "22px",
            fontWeight: 300,
            letterSpacing: "0.2em",
            color: "#F5F0E8",
            marginRight: "auto",
            textDecoration: "none",
          }}
        >
          ПОСЛЕ
        </Link>
        <span
          className="hidden sm:inline"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#A8C5B5",
            padding: "4px 10px",
            border: "1px solid rgba(168,197,181,0.3)",
          }}
        >
          Администратор
        </span>
        <span
          className="hidden md:inline"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            color: "rgba(245,240,232,0.4)",
          }}
        >
          {client?.email}
        </span>
        <button
          onClick={() => logout.mutate()}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(245,240,232,0.3)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.1em",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.7)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.3)")}
        >
          <LogOut size={14} />
          Выйти
        </button>
      </header>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 16px", width: "100%" }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "40px" }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#A8C5B5",
              marginBottom: "12px",
            }}
          >
            Панель управления
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 300,
              color: "#F5F0E8",
              lineHeight: 1.1,
            }}
          >
            Клиенты
          </h1>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "40px" }}
        >
          {[
            { icon: Users, label: "Всего клиентов", value: clients?.length ?? "—" },
            { icon: PawPrint, label: "Питомцев", value: clients?.reduce((s: number, c: any) => s + (c.petsCount || 0), 0) ?? "—" },
            { icon: Calendar, label: "Визитов", value: clients?.reduce((s: number, c: any) => s + (c.visitsCount || 0), 0) ?? "—" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <stat.icon size={18} color="#A8C5B5" />
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", marginBottom: "4px" }}>
                  {stat.label}
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 300, color: "#F5F0E8" }}>
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{ marginBottom: "24px", position: "relative" }}
        >
          <Search size={14} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(245,240,232,0.3)" }} />
          <input
            type="text"
            placeholder="Поиск по имени, email или телефону..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "12px 16px 12px 44px",
              color: "#F5F0E8",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(168,197,181,0.4)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
          />
        </motion.div>

        {/* Clients list */}
        {clientsLoading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
            <div style={{ width: "1px", height: "40px", background: "#A8C5B5", animation: "pulse 1.5s infinite" }} />
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 300, color: "rgba(245,240,232,0.3)" }}>
              {search ? "Клиенты не найдены" : "Клиентов пока нет"}
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            style={{ display: "flex", flexDirection: "column", gap: "2px" }}
          >
            {filtered.map((c: any, i: number) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <Link
                  href={`/admin/client/${c.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    padding: "18px 24px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    textDecoration: "none",
                    transition: "background 0.2s, border-color 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(168,197,181,0.06)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,197,181,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "rgba(168,197,181,0.12)",
                      border: "1px solid rgba(168,197,181,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "18px",
                      fontWeight: 300,
                      color: "#A8C5B5",
                    }}
                  >
                    {(c.name || c.email || "?")[0].toUpperCase()}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 300, color: "#F5F0E8", marginBottom: "2px" }}>
                      {c.name || "Без имени"}
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(245,240,232,0.4)" }}>
                      {c.email || c.phone || "—"}
                    </p>
                  </div>

                  {/* Meta — hidden on mobile to prevent overflow */}
                  <div className="hidden sm:flex" style={{ gap: "24px", alignItems: "center" }}>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 300, color: "#F5F0E8" }}>{c.petsCount}</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)" }}>питомцев</p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 300, color: "#F5F0E8" }}>{c.visitsCount}</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)" }}>визитов</p>
                    </div>
                    {c.lastVisit && (
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(245,240,232,0.4)" }}>
                          {new Date(c.lastVisit).toLocaleDateString("ru-RU", { day: "numeric", month: "short" })}
                        </p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)" }}>последний визит</p>
                      </div>
                    )}
                    <ChevronRight size={14} color="rgba(245,240,232,0.25)" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

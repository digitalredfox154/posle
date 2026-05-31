import AccountLayout from "@/components/AccountLayout";
import { trpc } from "@/lib/trpc";
import { useClientAuth } from "@/hooks/useClientAuth";
import { Link } from "wouter";
import { PawPrint, Calendar, CreditCard, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function AccountDashboard() {
  const { client } = useClientAuth(true);
  const { data: pets } = trpc.pets.list.useQuery();
  const { data: subscription } = trpc.subscriptions.mySubscription.useQuery();
  const { data: nextAppointment } = trpc.visits.nextAppointment.useQuery();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Доброе утро";
    if (h < 18) return "Добрый день";
    return "Добрый вечер";
  };

  const cardBase: React.CSSProperties = {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    textDecoration: "none",
    transition: "all 0.25s",
    cursor: "pointer",
  };

  return (
    <AccountLayout>
      <div style={{ maxWidth: "760px" }}>
        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginBottom: "40px" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#A8C5B5", marginBottom: "10px" }}>
            Личный кабинет
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, color: "#F5F0E8", lineHeight: 1.1 }}>
            {greeting()}{client?.name ? `, ${client.name}` : ""}
          </h1>
        </motion.div>

        {/* Next appointment */}
        {nextAppointment && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}
            style={{ background: "rgba(168,197,181,0.07)", border: "1px solid rgba(168,197,181,0.2)", padding: "16px 20px", marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#A8C5B5", marginBottom: "6px" }}>Ближайший визит</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 300, color: "#F5F0E8" }}>
                {new Date(nextAppointment.visitDate).toLocaleDateString("ru-RU", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}
              </p>
              {nextAppointment.serviceType && (
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(245,240,232,0.4)", marginTop: "4px" }}>{nextAppointment.serviceType}</p>
              )}
            </div>
            <Calendar size={18} color="#A8C5B5" />
          </motion.div>
        )}

        {/* Quick actions */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "32px" }}>
          <Link href="/booking"
            style={{ ...cardBase, background: "rgba(168,197,181,0.08)", borderColor: "rgba(168,197,181,0.2)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(168,197,181,0.14)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,197,181,0.4)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(168,197,181,0.08)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,197,181,0.2)"; }}>
            <Calendar size={18} color="#A8C5B5" />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 300, color: "#F5F0E8" }}>Записаться</p>
            <ArrowRight size={13} color="rgba(168,197,181,0.6)" />
          </Link>
          <Link href="/account/pets"
            style={cardBase}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,197,181,0.2)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}>
            <PawPrint size={18} color="#A8C5B5" />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 300, color: "#F5F0E8" }}>
              Питомцы {pets ? `(${pets.length})` : ""}
            </p>
            <ArrowRight size={13} color="rgba(245,240,232,0.2)" />
          </Link>
          <Link href="/account/subscription"
            style={cardBase}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,197,181,0.2)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}>
            <CreditCard size={18} color="#A8C5B5" />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 300, color: "#F5F0E8" }}>
              {subscription?.status === "active" ? "Резидент" : "Подписка"}
            </p>
            <ArrowRight size={13} color="rgba(245,240,232,0.2)" />
          </Link>
        </motion.div>

        {/* Subscription status */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} style={{ marginBottom: "32px" }}>
          {subscription?.status === "active" ? (
            <div style={{ background: "rgba(168,197,181,0.06)", border: "1px solid rgba(168,197,181,0.2)", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#A8C5B5", marginBottom: "6px" }}>Статус</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 300, color: "#F5F0E8" }}>Резидент ПОСЛЕ</p>
                {subscription.nextBillingAt && (
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(245,240,232,0.35)", marginTop: "4px" }}>
                    Следующее списание: {new Date(subscription.nextBillingAt).toLocaleDateString("ru-RU")}
                  </p>
                )}
              </div>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#A8C5B5", boxShadow: "0 0 8px rgba(168,197,181,0.6)" }} />
            </div>
          ) : (
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)", marginBottom: "6px" }}>Подписка</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 300, color: "rgba(245,240,232,0.6)" }}>Вы не резидент</p>
              </div>
              <Link href="/subscription"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A8C5B5", textDecoration: "none", borderBottom: "1px solid rgba(168,197,181,0.4)", paddingBottom: "2px" }}>
                Стать резидентом
              </Link>
            </div>
          )}
        </motion.div>

        {/* Pets preview */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          {pets && pets.length > 0 ? (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)" }}>Питомцы</p>
                <Link href="/account/pets" style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#A8C5B5", textDecoration: "none" }}>
                  Все питомцы
                </Link>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "10px" }}>
                {pets.slice(0, 3).map((pet) => (
                  <Link key={pet.id} href={`/account/diary/${pet.id}`}
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: "18px", textDecoration: "none", display: "block", transition: "border-color 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,197,181,0.2)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}>
                    {(pet as any).photoUrl ? (
                      <img src={(pet as any).photoUrl} alt={pet.name} style={{ width: "100%", height: "100px", objectFit: "cover", marginBottom: "12px" }} />
                    ) : (
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(168,197,181,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                        <PawPrint size={14} color="#A8C5B5" />
                      </div>
                    )}
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 300, color: "#F5F0E8", marginBottom: "4px" }}>{pet.name}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(245,240,232,0.35)" }}>
                      {pet.species === "dog" ? "Собака" : pet.species === "cat" ? "Кошка" : "Другое"}
                      {pet.breed ? ` · ${pet.breed}` : ""}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.08)", padding: "48px 32px", textAlign: "center" }}>
              <Sparkles size={24} color="rgba(168,197,181,0.4)" style={{ margin: "0 auto 16px" }} />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.4)", marginBottom: "20px" }}>
                Добавьте питомца, чтобы вести дневник визитов
              </p>
              <Link href="/account/pets"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A8C5B5", textDecoration: "none", borderBottom: "1px solid rgba(168,197,181,0.4)", paddingBottom: "2px" }}>
                Добавить питомца
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </AccountLayout>
  );
}

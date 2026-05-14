import { motion } from "framer-motion";
import PublicLayout from "@/components/PublicLayout";
import { Link } from "wouter";

const advantages = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
    title: "Напоминание о визите",
    text: "Мы заранее напомним, когда пора прийти на груминг, чтобы уход был регулярным, а не «когда вспомнили».",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: "Всегда свободное время",
    text: "Для подписчиков заранее резервируются удобные окна. Не нужно срочно искать место в расписании перед важной датой.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: "Дневник посещений",
    text: "Фиксируем историю процедур, состояние шерсти, кожи, когтей и рекомендации мастера после каждого визита.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Неограниченные посещения",
    text: "Можно приходить в течение года столько раз, сколько нужно питомцу в рамках условий подписки.",
  },
];

const fits = [
  "Убрать хаос с записью",
  "Поддерживать постоянный ухоженный вид питомца",
  "Получать рекомендации после каждого визита",
  "Не думать каждый раз, когда пора на груминг",
  "Закрепить за собой приоритетное время в расписании",
];

const faqs = [
  { q: "Как работает приоритетная запись?", a: "Резиденты видят свободные слоты раньше остальных и имеют возможность записаться на ближайшее удобное время." },
  { q: "Можно ли поставить подписку на паузу?", a: "Да, один раз в год можно приостановить подписку на срок до одного месяца." },
  { q: "Как отменить подписку?", a: "В любой момент через личный кабинет. Деньги за текущий период не возвращаются." },
  { q: "Подписка на одного питомца или на всех?", a: "Подписка оформляется на клиента и распространяется на всех его питомцев." },
];

export default function Subscription() {
  return (
    <PublicLayout>

      {/* ── HERO ── */}
      <section style={{
        position: "relative",
        backgroundColor: "#0A0A08",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "100px",
        paddingBottom: "0",
        overflow: "hidden",
      }}>
        {/* Gold arc top-right */}
        <svg style={{ position: "absolute", top: 0, right: 0, width: "40%", opacity: 0.25, pointerEvents: "none" }} viewBox="0 0 500 300" fill="none">
          <path d="M500 0 Q300 100 400 300" stroke="#C9A96E" strokeWidth="1" fill="none"/>
          <path d="M500 50 Q320 130 420 300" stroke="#C9A96E" strokeWidth="0.5" fill="none"/>
        </svg>
        {/* Gold arc bottom-left */}
        <svg style={{ position: "absolute", bottom: 0, left: 0, width: "35%", opacity: 0.2, pointerEvents: "none" }} viewBox="0 0 500 300" fill="none">
          <path d="M0 300 Q200 200 100 0" stroke="#C9A96E" strokeWidth="1" fill="none"/>
        </svg>
        {/* Sparkles */}
        <svg style={{ position: "absolute", top: "18%", left: "38%", opacity: 0.6, pointerEvents: "none" }} width="14" height="14" viewBox="0 0 20 20"><path d="M10 0L11.8 8.2L20 10L11.8 11.8L10 20L8.2 11.8L0 10L8.2 8.2Z" fill="#C9A96E"/></svg>
        <svg style={{ position: "absolute", bottom: "25%", left: "10%", opacity: 0.4, pointerEvents: "none" }} width="8" height="8" viewBox="0 0 20 20"><path d="M10 0L11.8 8.2L20 10L11.8 11.8L10 20L8.2 11.8L0 10L8.2 8.2Z" fill="#C9A96E"/></svg>

        {/* fade to next section */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "160px",
          background: "linear-gradient(to bottom, transparent, #0D0D0B)",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1, paddingBottom: "120px", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.1fr", gap: "0", alignItems: "center", minHeight: "80vh" }}>

            {/* Left — text + buttons */}
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ paddingRight: "40px" }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#C9A96E",
                marginBottom: "12px",
              }}>Годовая подписка</p>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
                <div style={{ height: "1px", width: "32px", background: "#C9A96E" }} />
                <svg width="7" height="7" viewBox="0 0 10 10"><path d="M5 0L6.2 3.8L10 5L6.2 6.2L5 10L3.8 6.2L0 5L3.8 3.8Z" fill="#C9A96E"/></svg>
              </div>

              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(44px, 5.5vw, 76px)",
                fontWeight: 300,
                color: "#F0EDE8",
                lineHeight: 1.05,
                marginBottom: "28px",
              }}>
                Системный уход<br />на весь год.
              </h1>

              <div style={{ height: "1px", width: "60px", background: "rgba(201,169,110,0.5)", marginBottom: "28px" }} />

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(13px, 1.1vw, 15px)",
                fontWeight: 300,
                color: "rgba(240,237,232,0.5)",
                lineHeight: 1.8,
                marginBottom: "40px",
                maxWidth: "360px",
              }}>
                Подписка создана для владельцев, которые хотят, чтобы питомец всегда выглядел ухоженно, а уход не превращался в очередную задачу в календаре.
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link
                  href="/booking"
                  style={{
                    display: "inline-block",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#111110",
                    backgroundColor: "#C9A96E",
                    padding: "14px 32px",
                    textDecoration: "none",
                  }}
                >
                  Оформить подписку
                </Link>
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#F0EDE8",
                    border: "1px solid rgba(240,237,232,0.3)",
                    padding: "14px 32px",
                    textDecoration: "none",
                  }}
                >
                  Узнать условия
                </a>
              </div>
            </motion.div>

            {/* Center — dog photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.15 }}
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                height: "100%",
                minHeight: "500px",
              }}
            >
              <img
                src="/manus-storage/subscription_hero_bg_206534b7.png"
                alt=""
                style={{
                  width: "100%",
                  maxWidth: "420px",
                  height: "auto",
                  objectFit: "contain",
                  objectPosition: "bottom",
                  filter: "drop-shadow(0 0 60px rgba(201,169,110,0.12))",
                }}
              />
            </motion.div>

            {/* Right — 4 cards 2×2 */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", paddingLeft: "20px" }}
            >
              {advantages.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 + i * 0.1 }}
                  style={{
                    backgroundColor: "rgba(20,18,14,0.85)",
                    border: "1px solid rgba(201,169,110,0.18)",
                    padding: "24px 20px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    position: "relative",
                  }}
                >
                  {/* sparkle top-right */}
                  <svg style={{ position: "absolute", top: "10px", right: "10px", opacity: 0.5 }} width="10" height="10" viewBox="0 0 20 20"><path d="M10 0L11.8 8.2L20 10L11.8 11.8L10 20L8.2 11.8L0 10L8.2 8.2Z" fill="#C9A96E"/></svg>
                  {/* icon in circle */}
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    border: "1px solid rgba(201,169,110,0.35)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#C9A96E",
                  }}>{a.icon}</div>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "17px",
                    fontWeight: 400,
                    color: "#F0EDE8",
                    lineHeight: 1.3,
                  }}>{a.title}</h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    color: "rgba(240,237,232,0.4)",
                    lineHeight: 1.7,
                  }}>{a.text}</p>
                  {/* bottom line */}
                  <div style={{ height: "1px", width: "32px", background: "rgba(201,169,110,0.3)", marginTop: "4px" }} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FITS BLOCK ── */}
      <section style={{
        position: "relative",
        backgroundColor: "#0D0D0B",
        paddingTop: "80px",
        paddingBottom: "100px",
        overflow: "hidden",
      }}>
        {/* Gold wave SVG bottom-left */}
        <svg style={{ position: "absolute", bottom: 0, left: 0, width: "50%", opacity: 0.35, pointerEvents: "none" }} viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 160 Q80 80 160 140 Q240 200 320 120 Q400 40 480 100 Q560 160 600 80" stroke="#C9A96E" strokeWidth="1" fill="none"/>
          <path d="M0 180 Q100 100 200 160 Q300 220 400 140 Q500 60 600 120" stroke="#C9A96E" strokeWidth="0.5" fill="none"/>
        </svg>
        {/* Gold sparkle top-right */}
        <svg style={{ position: "absolute", top: "20px", right: "40px", opacity: 0.5, pointerEvents: "none" }} width="20" height="20" viewBox="0 0 20 20">
          <path d="M10 0L11.8 8.2L20 10L11.8 11.8L10 20L8.2 11.8L0 10L8.2 8.2Z" fill="#C9A96E"/>
        </svg>
        <svg style={{ position: "absolute", bottom: "60px", right: "200px", opacity: 0.3, pointerEvents: "none" }} width="10" height="10" viewBox="0 0 20 20">
          <path d="M10 0L11.8 8.2L20 10L11.8 11.8L10 20L8.2 11.8L0 10L8.2 8.2Z" fill="#C9A96E"/>
        </svg>

        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "120px",
          background: "linear-gradient(to bottom, transparent, #0D0D0B)",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: "80px",
              alignItems: "center",
            }}
          >
            {/* Left label + heading */}
            <div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#C9A96E",
                marginBottom: "24px",
              }}>Подходит, если вы хотите</p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(40px, 4.5vw, 64px)",
                fontWeight: 300,
                color: "#F0EDE8",
                lineHeight: 1.1,
                marginBottom: "32px",
              }}>
                Уход без<br />лишних усилий.
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ height: "1px", width: "40px", background: "rgba(201,169,110,0.4)" }} />
                <svg width="8" height="8" viewBox="0 0 10 10"><path d="M5 0L6.2 3.8L10 5L6.2 6.2L5 10L3.8 6.2L0 5L3.8 3.8Z" fill="#C9A96E"/></svg>
              </div>
            </div>

            {/* Right list with circle icons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>, text: "Убрать хаос с записью" },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 21.7C5.4 15.5 2 10.6 2 7a10 10 0 0 1 20 0c0 3.6-3.4 8.5-10 14.7z"/><circle cx="12" cy="7" r="3"/></svg>, text: "Поддерживать постоянный ухоженный вид питомца" },
                { icon: <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 0L11.8 8.2L20 10L11.8 11.8L10 20L8.2 11.8L0 10L8.2 8.2Z" fill="currentColor"/></svg>, text: "Получать рекомендации после каждого визита" },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/><circle cx="12" cy="15" r="1" fill="currentColor"/></svg>, text: "Не думать каждый раз, когда пора на груминг" },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>, text: "Закрепить за собой приоритетное время в расписании" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    padding: "20px 0",
                    borderBottom: "1px solid rgba(201,169,110,0.12)",
                  }}
                >
                  <div style={{
                    flexShrink: 0,
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    border: "1px solid rgba(201,169,110,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#C9A96E",
                  }}>{item.icon}</div>
                  <div style={{ flex: 1, height: "1px", background: "rgba(201,169,110,0.15)" }} />
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "20px",
                    fontWeight: 300,
                    color: "#F0EDE8",
                  }}>{item.text}</span>
                  <svg width="8" height="8" viewBox="0 0 10 10" style={{ flexShrink: 0 }}>
                    <path d="M5 0L6.2 3.8L10 5L6.2 6.2L5 10L3.8 6.2L0 5L3.8 3.8Z" fill="#C9A96E"/>
                  </svg>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{
        position: "relative",
        backgroundColor: "#0D0D0B",
        paddingTop: "80px",
        paddingBottom: "120px",
      }}>
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "120px",
          background: "linear-gradient(to bottom, transparent, #080808)",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "760px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ marginBottom: "56px", textAlign: "center" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{ height: "1px", width: "60px", background: "rgba(201,169,110,0.4)" }} />
              <svg width="8" height="8" viewBox="0 0 10 10"><path d="M5 0L6.2 3.8L10 5L6.2 6.2L5 10L3.8 6.2L0 5L3.8 3.8Z" fill="#C9A96E"/></svg>
              <div style={{ height: "1px", width: "60px", background: "rgba(201,169,110,0.4)" }} />
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 300,
              color: "#F0EDE8",
            }}>Вопросы</h2>
          </motion.div>

          {faqs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ borderBottom: "1px solid rgba(201,169,110,0.12)", padding: "28px 0" }}
            >
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "22px",
                fontWeight: 300,
                color: "#F0EDE8",
                marginBottom: "12px",
              }}>{item.q}</p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "rgba(240,237,232,0.45)",
                lineHeight: 1.7,
              }}>{item.a}</p>
            </motion.div>
          ))}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ marginTop: "64px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link
              href="/booking"
              style={{
                display: "inline-block",
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#111110",
                backgroundColor: "#C9A96E",
                padding: "16px 48px",
                textDecoration: "none",
              }}
            >
              Оформить подписку
            </Link>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#F0EDE8",
                border: "1px solid rgba(240,237,232,0.25)",
                padding: "16px 48px",
                textDecoration: "none",
              }}
            >
              Написать в Telegram
            </a>
          </motion.div>
        </div>
      </section>

    </PublicLayout>
  );
}

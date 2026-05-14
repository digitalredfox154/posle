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
        backgroundColor: "#0D0D0B",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "120px",
        paddingBottom: "0",
        overflow: "hidden",
      }}>
        {/* subtle radial glow */}
        <div style={{
          position: "absolute",
          top: "30%",
          right: "15%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        {/* fade to next section */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "140px",
          background: "linear-gradient(to bottom, transparent, #111110)",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1, paddingBottom: "100px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#C9A96E",
                marginBottom: "16px",
              }}>Годовая подписка</p>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "36px" }}>
                <div style={{ height: "1px", width: "40px", background: "#C9A96E" }} />
                <svg width="8" height="8" viewBox="0 0 10 10"><path d="M5 0L6.2 3.8L10 5L6.2 6.2L5 10L3.8 6.2L0 5L3.8 3.8Z" fill="#C9A96E"/></svg>
              </div>

              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(48px, 7vw, 88px)",
                fontWeight: 300,
                color: "#F0EDE8",
                lineHeight: 1.05,
                marginBottom: "32px",
              }}>
                Системный уход<br />на весь год.
              </h1>

              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(17px, 1.5vw, 21px)",
                fontWeight: 300,
                color: "rgba(240,237,232,0.5)",
                lineHeight: 1.7,
                marginBottom: "48px",
                maxWidth: "440px",
              }}>
                Подписка создана для владельцев, которые хотят, чтобы питомец всегда выглядел ухоженно, а уход не превращался в очередную задачу в календаре.
              </p>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
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
                    padding: "16px 40px",
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
                    padding: "16px 40px",
                    textDecoration: "none",
                  }}
                >
                  Узнать условия
                </a>
              </div>
            </motion.div>

            {/* Right — 4 cards 2×2 */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
            >
              {advantages.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(201,169,110,0.15)",
                    padding: "28px 24px",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div style={{ color: "#C9A96E" }}>{a.icon}</div>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "18px",
                    fontWeight: 400,
                    color: "#F0EDE8",
                    lineHeight: 1.3,
                  }}>{a.title}</h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    color: "rgba(240,237,232,0.45)",
                    lineHeight: 1.7,
                  }}>{a.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FITS BLOCK ── */}
      <section style={{
        position: "relative",
        backgroundColor: "#111110",
        paddingTop: "80px",
        paddingBottom: "100px",
      }}>
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
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "start",
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
                fontSize: "clamp(36px, 4vw, 56px)",
                fontWeight: 300,
                color: "#F0EDE8",
                lineHeight: 1.15,
              }}>
                Уход без<br />лишних усилий.
              </h2>
            </div>

            {/* Right list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {fits.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "20px 0",
                    borderBottom: "1px solid rgba(201,169,110,0.12)",
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 10 10" style={{ flexShrink: 0 }}>
                    <path d="M5 0L6.2 3.8L10 5L6.2 6.2L5 10L3.8 6.2L0 5L3.8 3.8Z" fill="#C9A96E"/>
                  </svg>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "20px",
                    fontWeight: 300,
                    color: "#F0EDE8",
                  }}>{item}</span>
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

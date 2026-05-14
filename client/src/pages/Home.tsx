import { Link } from "wouter";
import { motion } from "framer-motion";
import PublicLayout from "@/components/PublicLayout";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { trpc } from "@/lib/trpc";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

// Real before/after photos — 4 best dog pairs, after photos mirrored to match direction
const PAIRS = [
  // Pair 1: black poodle — swapped: after (groomed) is now "before" side, before (ungroomed) is "after" side
  { before: "/manus-storage/after1_1140459b.jpg", after: "/manus-storage/before1_fb6caf90.jpg" },
  // Pair 2: ginger poodle — both face camera
  { before: "/manus-storage/before2_929dde77.jpg", after: "/manus-storage/after2_8b3d0f2b.jpg" },
  // Pair 4: yorkie — both face LEFT
  { before: "/manus-storage/before4_ff6d2058.jpg", after: "/manus-storage/after4_68ffd188.jpg" },
  // Pair 5: brown poodle — both face RIGHT
  { before: "/manus-storage/before5_1c1723f8.png", after: "/manus-storage/after5_cc507478.png" },
];
const MASTER_PHOTO = "/manus-storage/master_191c8f08.jpg";

export default function Home() {
  const { data: plans } = trpc.subscriptions.plans.useQuery();

  return (
    <PublicLayout>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[100vh] flex items-center overflow-hidden"
        style={{
          backgroundImage: "url('/manus-storage/hero_bg_v3_f07e7468.png')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#F0EDE8",
        }}
      >
        {/* Subtle warm overlay on left for text readability */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(240,237,232,0.6) 0%, rgba(240,237,232,0.25) 55%, transparent 100%)",
          }}
        />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[88vh] py-16">

            {/* LEFT: text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                className="text-[10px] tracking-[0.3em] uppercase mb-5"
                style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.3em", color: "#7A9E8E" }}
              >
                Камерный груминг-сервис · Новосибирск
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="leading-none mb-4"
                style={{
                  color: "#0E0E0E",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(72px, 11vw, 130px)",
                  fontWeight: 300,
                  letterSpacing: "0.15em",
                }}
              >
                ПОСЛЕ
              </motion.h1>

              {/* Gold divider with star */}
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                <div className="h-px w-24" style={{ background: "linear-gradient(to right, transparent, #A8C5B5)" }} />
                <span style={{ color: "#A8C5B5", fontSize: "14px" }}>&#10022;</span>
                <div className="h-px w-24" style={{ background: "linear-gradient(to left, transparent, #A8C5B5)" }} />
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="font-light leading-relaxed mb-12 max-w-sm"
                style={{ color: "rgba(14,14,14,0.55)", fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: "1.7" }}
              >
                Деликатный уход для собак, где важны<br />
                не только чистота и форма, но и состояние<br />
                питомца после визита.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                {/* Olive-green button like in mockup */}
                <Link
                  href="/booking"
                  className="inline-block text-center text-[11px] tracking-[0.25em] uppercase px-10 py-4 font-medium transition-all duration-300 hover:opacity-90"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    backgroundColor: "#A8C5B5",
                    color: "#0E0E0E",
                  }}
                >
                  Записаться
                </Link>
                <Link
                  href="/results"
                  className="inline-block text-center text-[11px] tracking-[0.25em] uppercase px-10 py-4 transition-all duration-300 hover:border-[#0E0E0E] hover:text-[#0E0E0E]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    border: "1px solid rgba(14,14,14,0.3)",
                    color: "rgba(14,14,14,0.55)",
                  }}
                >
                  Посмотреть работы
                </Link>
              </motion.div>
            </motion.div>

            {/* RIGHT: empty — background image handles the logo */}
            <div />

          </div>
        </div>
      </section>
        {/* ── PHILOSOPHY ────────────────────────────────────────────────── */}



      {/* ── PHILOSOPHY ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: "#F0EDE8" }}>


        <div className="container relative" style={{ zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 80px)", alignItems: "center" }}>

            {/* ── LEFT: heading + text ── */}
            <div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(9px, 0.7vw, 11px)",
                letterSpacing: "0.35em",
                color: "#A8C5B5",
                textTransform: "uppercase",
                marginBottom: "clamp(10px, 1.2vw, 18px)",
              }}>ФИЛОСОФИЯ</p>

              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(28px, 3.8vw, 56px)",
                fontWeight: 300,
                color: "#1a1a14",
                lineHeight: 1.15,
                marginBottom: "clamp(10px, 1.2vw, 18px)",
              }}>
                Один питомец.<br />Полное внимание.{" "}
                <span style={{ color: "#A8C5B5" }}>✦</span>
              </h2>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "clamp(16px, 2vw, 28px)" }}>
                <div style={{ width: "28px", height: "1px", backgroundColor: "rgba(184,150,90,0.45)" }} />
                <span style={{ color: "#B8965A", fontSize: "9px" }}>&#10022;</span>
              </div>

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(12px, 0.95vw, 15px)", color: "rgba(14,14,14,0.58)", lineHeight: 1.85, marginBottom: "clamp(10px, 1.2vw, 18px)" }}>
                Мы не работаем в потоке. У каждой собаки есть свой характер, привычки, тревоги и границы. Поэтому визит в ПОСЛЕ строится спокойно: без спешки, лишнего шума и ощущения конвейера.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(12px, 0.95vw, 15px)", color: "rgba(14,14,14,0.58)", lineHeight: 1.85, marginBottom: "clamp(10px, 1.2vw, 18px)" }}>
                Мастер видит не только шерсть и форму, но и настроение питомца. Где нужно — даст время привыкнуть. Где важно — сделает мягче. Где можно — доведёт образ до аккуратного, чистого и выразительного результата.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(12px, 0.95vw, 15px)", color: "rgba(14,14,14,0.58)", lineHeight: 1.85 }}>
                ПОСЛЕ — это момент, когда собака выглядит ухоженно, чувствует себя спокойно, а владелец понимает: к деталям здесь относятся всерьёз.
              </p>
            </div>

            {/* ── RIGHT: 2×2 cards ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(12px, 1.5vw, 20px)" }}>

              {/* Card 01 */}
              <div style={{
                backgroundColor: "rgba(255,255,255,0.82)",
                borderRadius: "20px",
                padding: "clamp(18px, 2.2vw, 32px)",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                minHeight: "clamp(160px, 18vw, 260px)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.2vw, 48px)", fontWeight: 300, color: "rgba(168,197,181,0.65)", lineHeight: 1 }}>01</span>
                  <div style={{ width: "clamp(32px,3vw,44px)", height: "clamp(32px,3vw,44px)", borderRadius: "50%", border: "1px solid rgba(168,197,181,0.45)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="clamp(14px,1.4vw,20px)" height="clamp(14px,1.4vw,20px)" viewBox="0 0 32 32" fill="none" stroke="#A8C5B5" strokeWidth="1.5"><rect x="4" y="4" width="10" height="10" rx="1.5"/><rect x="18" y="4" width="10" height="10" rx="1.5"/><rect x="4" y="18" width="10" height="10" rx="1.5"/><rect x="18" y="18" width="10" height="10" rx="1.5"/></svg>
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "clamp(6px, 0.8vw, 12px)" }}>
                    <div style={{ width: "20px", height: "1px", backgroundColor: "rgba(184,150,90,0.5)" }} />
                    <span style={{ color: "#B8965A", fontSize: "8px" }}>&#10022;</span>
                  </div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 1.8vw, 26px)", fontWeight: 300, color: "#1a1a14", lineHeight: 1.25, margin: 0 }}>Камерный<br/>формат</p>
                </div>
                {/* mini branch bottom-right */}
                <img src="/manus-storage/branch_transparent_222dc413.png" alt="" aria-hidden="true" style={{ position: "absolute", bottom: "-8%", right: "-6%", width: "42%", opacity: 0.55, transform: "rotate(15deg)", pointerEvents: "none" }} />
              </div>

              {/* Card 02 */}
              <div style={{
                backgroundColor: "rgba(255,255,255,0.82)",
                borderRadius: "20px",
                padding: "clamp(18px, 2.2vw, 32px)",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                minHeight: "clamp(160px, 18vw, 260px)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.2vw, 48px)", fontWeight: 300, color: "rgba(168,197,181,0.65)", lineHeight: 1 }}>02</span>
                  <div style={{ width: "clamp(32px,3vw,44px)", height: "clamp(32px,3vw,44px)", borderRadius: "50%", border: "1px solid rgba(168,197,181,0.45)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="clamp(14px,1.4vw,20px)" height="clamp(14px,1.4vw,20px)" viewBox="0 0 32 32" fill="none" stroke="#A8C5B5" strokeWidth="1.5"><circle cx="16" cy="16" r="11"/><path d="M16 9v7l4 4" strokeLinecap="round"/></svg>
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "clamp(6px, 0.8vw, 12px)" }}>
                    <div style={{ width: "20px", height: "1px", backgroundColor: "rgba(184,150,90,0.5)" }} />
                    <span style={{ color: "#B8965A", fontSize: "8px" }}>&#10022;</span>
                  </div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 1.8vw, 26px)", fontWeight: 300, color: "#1a1a14", lineHeight: 1.25, margin: 0 }}>Спокойный<br/>процесс</p>
                </div>
                <img src="/manus-storage/branch_transparent_222dc413.png" alt="" aria-hidden="true" style={{ position: "absolute", bottom: "-8%", right: "-6%", width: "42%", opacity: 0.55, transform: "rotate(15deg)", pointerEvents: "none" }} />
              </div>

              {/* Card 03 */}
              <div style={{
                backgroundColor: "rgba(255,255,255,0.82)",
                borderRadius: "20px",
                padding: "clamp(18px, 2.2vw, 32px)",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                minHeight: "clamp(160px, 18vw, 260px)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.2vw, 48px)", fontWeight: 300, color: "rgba(168,197,181,0.65)", lineHeight: 1 }}>03</span>
                  <div style={{ width: "clamp(32px,3vw,44px)", height: "clamp(32px,3vw,44px)", borderRadius: "50%", border: "1px solid rgba(168,197,181,0.45)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="clamp(14px,1.4vw,20px)" height="clamp(14px,1.4vw,20px)" viewBox="0 0 32 32" fill="none" stroke="#A8C5B5" strokeWidth="1.5"><path d="M16 27S5 20 5 12a6 6 0 0111-3.3A6 6 0 0127 12c0 8-11 15-11 15z"/></svg>
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "clamp(6px, 0.8vw, 12px)" }}>
                    <div style={{ width: "20px", height: "1px", backgroundColor: "rgba(184,150,90,0.5)" }} />
                    <span style={{ color: "#B8965A", fontSize: "8px" }}>&#10022;</span>
                  </div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 1.8vw, 26px)", fontWeight: 300, color: "#1a1a14", lineHeight: 1.25, margin: 0 }}>Внимание<br/>к характеру</p>
                </div>
                <img src="/manus-storage/branch_transparent_222dc413.png" alt="" aria-hidden="true" style={{ position: "absolute", bottom: "-8%", right: "-6%", width: "42%", opacity: 0.55, transform: "rotate(15deg)", pointerEvents: "none" }} />
              </div>

              {/* Card 04 */}
              <div style={{
                backgroundColor: "rgba(255,255,255,0.82)",
                borderRadius: "20px",
                padding: "clamp(18px, 2.2vw, 32px)",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                minHeight: "clamp(160px, 18vw, 260px)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.2vw, 48px)", fontWeight: 300, color: "rgba(168,197,181,0.65)", lineHeight: 1 }}>04</span>
                  <div style={{ width: "clamp(32px,3vw,44px)", height: "clamp(32px,3vw,44px)", borderRadius: "50%", border: "1px solid rgba(168,197,181,0.45)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="clamp(14px,1.4vw,20px)" height="clamp(14px,1.4vw,20px)" viewBox="0 0 32 32" fill="none" stroke="#A8C5B5" strokeWidth="1.5"><circle cx="16" cy="16" r="11"/><circle cx="16" cy="16" r="5"/><path d="M16 5v3M16 24v3M5 16h3M24 16h3" strokeLinecap="round"/></svg>
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "clamp(6px, 0.8vw, 12px)" }}>
                    <div style={{ width: "20px", height: "1px", backgroundColor: "rgba(184,150,90,0.5)" }} />
                    <span style={{ color: "#B8965A", fontSize: "8px" }}>&#10022;</span>
                  </div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 1.8vw, 26px)", fontWeight: 300, color: "#1a1a14", lineHeight: 1.25, margin: 0 }}>Постоянный<br/>мастер</p>
                </div>
                <img src="/manus-storage/branch_transparent_222dc413.png" alt="" aria-hidden="true" style={{ position: "absolute", bottom: "-8%", right: "-6%", width: "42%", opacity: 0.55, transform: "rotate(15deg)", pointerEvents: "none" }} />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ───────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 relative" style={{ backgroundColor: "#F0EDE8", backgroundImage: "url('/manus-storage/sections_bg_seamless_1439c1ee.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8"
          >
            {/* РЕЗУЛЬТАТЫ label */}
            <p className="text-[#A8C5B5] text-[10px] tracking-[0.35em] uppercase mb-3"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              РЕЗУЛЬТАТЫ
            </p>
            {/* Gold divider + paw icon */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #A8C5B5)" }} />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#A8C5B5">
                <ellipse cx="12" cy="17" rx="5" ry="4" />
                <ellipse cx="6" cy="11" rx="2.5" ry="3" />
                <ellipse cx="18" cy="11" rx="2.5" ry="3" />
                <ellipse cx="9" cy="7" rx="2" ry="2.5" />
                <ellipse cx="15" cy="7" rx="2" ry="2.5" />
              </svg>
              <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #A8C5B5)" }} />
            </div>
            <h2 className="font-light text-[#2C2416] mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(40px, 5vw, 60px)",
              }}>
              До и после
            </h2>
            <p className="text-[#2C2416]/50 text-sm max-w-md mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              Передвиньте разделитель, чтобы увидеть разницу в деталях
            </p>
          </motion.div>

          {/* 4 sliders in 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {PAIRS.map((pair, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.12 }}
              >
                <BeforeAfterSlider
                  beforeSrc={pair.before}
                  afterSrc={pair.after}
                  aspectRatio="4/3"
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom paw divider */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #A8C5B5)" }} />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#A8C5B5">
              <ellipse cx="12" cy="17" rx="5" ry="4" />
              <ellipse cx="6" cy="11" rx="2.5" ry="3" />
              <ellipse cx="18" cy="11" rx="2.5" ry="3" />
              <ellipse cx="9" cy="7" rx="2" ry="2.5" />
              <ellipse cx="15" cy="7" rx="2" ry="2.5" />
            </svg>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #A8C5B5)" }} />
          </div>

          <div className="text-center mt-6">
            <Link
              href="/results"
              className="btn-outline-dark inline-block text-xs tracking-[0.2em] uppercase px-8 py-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Все результаты
            </Link>
          </div>
        </div>
      </section>

      {/* ── SUBSCRIPTION TEASER ────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#0D0D0B", padding: "48px 0", position: "relative" }}>   <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", alignItems: "stretch" }}>

            {/* ─── LEFT: yorkie photo + text ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "6px",
                border: "1px solid rgba(200,170,100,0.18)",
                minHeight: "620px",
              }}
            >
              <img
                src="/manus-storage/sub_yorkie_v2_ae03f7d0.png"
                alt=""
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(5,5,3,0.85) 0%, rgba(5,5,3,0.6) 50%, rgba(5,5,3,0.05) 100%)" }} />
              <div style={{ position: "relative", zIndex: 1, padding: "48px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", minHeight: "620px" }}>
                <div>
                  {/* Label row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                    <div style={{ height: "1px", width: "28px", backgroundColor: "rgba(200,170,100,0.6)" }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.28em", fontSize: "10px", color: "#C8AA64", textTransform: "uppercase" }}>Клуб резидентов</span>
                    <div style={{ height: "1px", width: "8px", backgroundColor: "rgba(200,170,100,0.4)" }} />
                    <span style={{ color: "#C8AA64", fontSize: "9px" }}>✦</span>
                  </div>
                  {/* Heading */}
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(44px, 5vw, 66px)", fontWeight: 300, lineHeight: 1.05, color: "#FFFFFF", margin: 0 }}>
                    Для тех, кто<br />выбирает<br />
                    <span style={{ color: "#C8AA64" }}>постоянство</span>
                  </h2>
                  {/* Description */}
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: "rgba(255,255,255,0.52)", lineHeight: 1.65, marginTop: "24px", maxWidth: "270px" }}>
                    Онлайн-дневник питомца в личном кабинете — всё о его жизни: визиты, уход, рекомендации и важные заметки. Всегда под рукой.
                  </p>
                </div>
                {/* CTA button */}
                <Link
                  href="/booking"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    backgroundColor: "#A8C5B5",
                    color: "#0E0E0E",
                    padding: "15px 28px",
                    width: "220px",
                    marginTop: "48px",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                >
                  <span>Записаться</span>
                  <span style={{ fontSize: "18px" }}>→</span>
                </Link>
              </div>
            </motion.div>

            {/* ─── RIGHT: poodle photo + diary + subscription card ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.12 }}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "6px",
                border: "1px solid rgba(200,170,100,0.18)",
                minHeight: "620px",
              }}
            >
              <img
                src="/manus-storage/sub_poodle_v3_adbbb892.png"
                alt=""
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(5,5,3,0.92) 0%, rgba(5,5,3,0.78) 52%, rgba(5,5,3,0.12) 100%)" }} />
              <div style={{ position: "relative", zIndex: 1, padding: "48px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", minHeight: "620px" }}>
                <div>
                  {/* Diary heading */}
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 300, color: "#FFFFFF", margin: "0 0 12px 0" }}>
                    Онлайн-дневник питомца
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                    <div style={{ height: "1px", width: "40px", backgroundColor: "rgba(200,170,100,0.45)" }} />
                    <span style={{ color: "#C8AA64", fontSize: "11px" }}>✦</span>
                  </div>
                  {/* Feature list */}
                  {[
                    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A8C5B5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h2M14 14h2M8 18h2M14 18h2"/></svg>, text: "История визитов и процедур" },
                    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A8C5B5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>, text: "Рекомендации по уходу и питанию" },
                    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A8C5B5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h10M7 12h6M7 16h4"/></svg>, text: "Заметки и важные наблюдения" },
                    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A8C5B5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>, text: "Напоминания о записях и процедурах" },
                  ].map((item, idx, arr) => (
                    <div key={idx}>
                      <div style={{ display: "flex", alignItems: "center", gap: "18px", padding: "14px 0" }}>
                        <div style={{ flexShrink: 0, width: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>{item.icon}</div>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: "rgba(255,255,255,0.78)", lineHeight: 1.4 }}>{item.text}</span>
                      </div>
                      {idx < arr.length - 1 && <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.07)" }} />}
                    </div>
                  ))}
                </div>

                {/* Subscription card */}
                <div style={{ marginTop: "24px", border: "1px solid rgba(200,170,100,0.22)", backgroundColor: "rgba(8,8,6,0.65)", padding: "20px", display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.25em", fontSize: "9px", color: "#C8AA64", textTransform: "uppercase", marginBottom: "8px" }}>Дополнение</p>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 2.5vw, 28px)", fontWeight: 300, color: "#FFFFFF", lineHeight: 1.2, margin: "0 0 8px 0" }}>
                      Индивидуальная<br />подписка
                    </h4>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: "rgba(255,255,255,0.42)", lineHeight: 1.55, marginBottom: "16px" }}>
                      Персональные привилегии и особое внимание для вашего питомца.
                    </p>
                    <Link
                      href="/subscription"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 20px",
                        border: "1px solid rgba(255,255,255,0.18)",
                        color: "rgba(255,255,255,0.7)",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "9px",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        transition: "border-color 0.2s",
                      }}
                    >
                      <span>Обсудить условия</span>
                      <span style={{ fontSize: "15px" }}>→</span>
                    </Link>
                  </div>
                  <div style={{ flexShrink: 0, width: "64px", height: "64px", marginTop: "4px" }}>
                    <img src="/manus-storage/posle-logo-olive_44f3e3e8.png" alt="POSLE" style={{ width: "100%", height: "100%", objectFit: "contain", opacity: 0.72 }} />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── MASTER BIO ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: "#F0EDE8" }}>
        {/* Branch left — large, bottom-left, leaning right like on mockup */}
        <img
          src="/manus-storage/branch_transparent_222dc413.png"
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "380px", opacity: 0.85, pointerEvents: "none", zIndex: 2, transform: "rotate(20deg)" }}
        />
        {/* Branch right — small, top-right corner, hanging down */}
        <img
          src="/manus-storage/branch_transparent_222dc413.png"
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", top: "-20px", right: "0px", width: "220px", opacity: 0.85, pointerEvents: "none", zIndex: 2, transform: "rotate(170deg) scaleX(-1)" }}
        />
        <div className="container relative" style={{ zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl mx-auto rounded-2xl overflow-hidden"
            style={{ backgroundColor: "rgba(248,245,240,0.9)", border: "1px solid rgba(180,150,90,0.18)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-[42%_58%]">
              {/* Left — photo */}
              <div className="relative" style={{ minHeight: "480px" }}>
                <img
                  src={MASTER_PHOTO}
                  alt="Мастер"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                />
                {/* Experience badge */}
                <div style={{
                  position: "absolute", bottom: "24px", right: "24px",
                  width: "112px", height: "112px",
                  backgroundColor: "#A8C5B5",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  borderRadius: "4px",
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" style={{ marginBottom: "6px" }}>
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <line x1="5" y1="5" x2="19" y2="19" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                    <circle cx="12" cy="12" r="2" fill="rgba(255,255,255,0.6)" stroke="none" />
                  </svg>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: "#fff", textAlign: "center", lineHeight: 1.3, letterSpacing: "0.06em" }}>5 ЛЕТ<br />ОПЫТА</span>
                </div>
              </div>

              {/* Right — text */}
              <div style={{ padding: "48px 48px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                {/* Label + line + diamond */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.3em", color: "#B8965A", textTransform: "uppercase", margin: 0 }}>МАСТЕР</p>
                  <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(184,150,90,0.35)" }} />
                  <span style={{ color: "#B8965A", fontSize: "14px" }}>&#10022;</span>
                </div>

                {/* Heading */}
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 3.5vw, 46px)", fontWeight: 300, color: "#1a1a14", lineHeight: 1.2, margin: "0 0 16px 0" }}>
                  Работаю не с потоком,<br />а с характером
                </h2>

                {/* Ornamental divider */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                  <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(184,150,90,0.25)" }} />
                  <span style={{ color: "#B8965A", fontSize: "14px" }}>&#10022;</span>
                  <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(184,150,90,0.25)" }} />
                </div>

                {/* Text */}
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(26,26,20,0.65)", lineHeight: 1.75, marginBottom: "14px" }}>
                  Для меня груминг начинается не с инструмента, а с контакта. Я смотрю, как собака реагирует, где ей спокойно, где нужно больше времени, какой уход подойдёт именно ей.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(26,26,20,0.65)", lineHeight: 1.75, marginBottom: "24px" }}>
                  Мне важно, чтобы после процедуры питомец выглядел ухоженно, но не был уставшим и зажатым. Красивый результат имеет смысл только тогда, когда он получен бережно.
                </p>

                {/* Link */}
                <Link
                  href="/about"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.2em", color: "#1a1a14", textDecoration: "none", textTransform: "uppercase", borderBottom: "1px solid rgba(26,26,20,0.3)", paddingBottom: "2px", alignSelf: "flex-start", marginBottom: "32px" }}
                >
                  Подробнее обо мне →
                </Link>

                {/* 3 icons row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", borderTop: "1px solid rgba(184,150,90,0.15)", paddingTop: "24px" }}>
                  {[
                    {
                      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A8C5B5" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
                      text: "Берегу комфорт каждого питомца"
                    },
                    {
                      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A8C5B5" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
                      text: "Индивидуальный подход"
                    },
                    {
                      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A8C5B5" strokeWidth="1.5"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
                      text: "Только мягкие и безопасные средства"
                    },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <div style={{ flexShrink: 0, marginTop: "1px" }}>{item.icon}</div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(26,26,20,0.55)", lineHeight: 1.5, margin: 0 }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FIRST VISIT / BOOKING CTA ──────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundImage: "url('/manus-storage/cta_bg3_c36fca8d.png')", backgroundSize: "cover", backgroundPosition: "center center", backgroundRepeat: "no-repeat" }}
      >
        <div className="container relative z-10 py-16 md:py-24">
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(24px, 3vw, 48px)", alignItems: "center", maxWidth: "680px", marginLeft: "30%" }}>

            {/* ── LEFT: text + button ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.4em", color: "#A8C5B5", textTransform: "uppercase", marginBottom: "18px" }}>
                ПЕРВЫЙ ВИЗИТ
              </p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(40px, 5vw, 72px)",
                fontWeight: 300,
                color: "#FFFFFF",
                lineHeight: 1.05,
                marginBottom: "18px",
              }}>
                Начните<br />с первого визита.
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: "32px", maxWidth: "260px" }}>
                Познакомимся, подберём уход и создадим безупречный образ для вашего любимца.
              </p>
              <Link href="/booking" className="inline-flex items-center gap-4 group">
                <span
                  className="btn-mint text-[10px] tracking-[0.3em] uppercase px-8 py-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  ЗАПИСАТЬСЯ НА ПЕРВЫЙ ВИЗИТ
                </span>
                <span className="link-arrow text-[#A8C5B5] text-2xl">→</span>
              </Link>
            </motion.div>

            {/* ── RIGHT: contact cards ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {/* Address */}
              <div style={{ backgroundColor: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "16px 20px", display: "flex", gap: "14px", alignItems: "flex-start", backdropFilter: "blur(6px)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A8C5B5" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: "2px" }}><path d="M12 21s-8-5.5-8-11a8 8 0 0116 0c0 5.5-8 11-8 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.3em", color: "#A8C5B5", textTransform: "uppercase", marginBottom: "5px" }}>АДРЕС</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: "rgba(255,255,255,0.8)", lineHeight: 1.4, margin: 0 }}>Вокзальная магистраль, 16</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)", margin: "3px 0 0" }}>Новосибирск</p>
                </div>
              </div>
              {/* Phone */}
              <a href="tel:+79130187219" style={{ backgroundColor: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "16px 20px", display: "flex", gap: "14px", alignItems: "flex-start", textDecoration: "none", backdropFilter: "blur(6px)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A8C5B5" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: "2px" }}><path d="M6.6 10.8a15.3 15.3 0 006.6 6.6l2.2-2.2a1 1 0 011.1-.2 11.4 11.4 0 003.6 1.1 1 1 0 011 1V21a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1c.1 1.3.4 2.5 1.1 3.6a1 1 0 01-.2 1.1L6.6 10.8z"/></svg>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.3em", color: "#A8C5B5", textTransform: "uppercase", marginBottom: "5px" }}>ТЕЛЕФОН</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: "rgba(255,255,255,0.8)", margin: 0 }}>+7 913 018-72-19</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)", margin: "3px 0 0" }}>Ежедневно с 10:00 до 20:00</p>
                </div>
              </a>
              {/* Hours */}
              <div style={{ backgroundColor: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "16px 20px", display: "flex", gap: "14px", alignItems: "flex-start", backdropFilter: "blur(6px)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A8C5B5" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: "2px" }}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3" strokeLinecap="round"/></svg>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.3em", color: "#A8C5B5", textTransform: "uppercase", marginBottom: "5px" }}>ВРЕМЯ РАБОТЫ</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: "rgba(255,255,255,0.8)", margin: 0 }}>Пн — Вс: 10:00 — 20:00</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)", margin: "3px 0 0" }}>Без выходных</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

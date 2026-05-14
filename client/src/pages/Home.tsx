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
        className="relative min-h-[88vh] flex items-center overflow-hidden"
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
      {/* ── PHILOSOPHY ───────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 relative" style={{ backgroundColor: "#F4F0EC" }}>
        {/* Seamless top fade from hero #F0EDE8 */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: "80px", background: "linear-gradient(to bottom, #F0EDE8, #F4F0EC)", zIndex: 1 }} />
        {/* Seamless bottom fade to before/after #F0EDE8 */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: "80px", background: "linear-gradient(to top, #F0EDE8, #F4F0EC)", zIndex: 1 }} />
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Left: label + heading + paragraphs */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-5"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Философия
              </p>
              <h2
                className="font-light leading-tight mb-5 text-[#0E0E0E]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(40px, 5vw, 60px)",
                }}>
                Один питомец.<br />Полное внимание.{" "}
                <span className="text-[#A8C5B5]" style={{ fontSize: "0.7em" }}>✦</span>
              </h2>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed mb-3"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Мы не работаем в потоке. У каждой собаки есть свой характер, привычки, тревоги и границы. Поэтому визит в ПОСЛЕ строится спокойно: без спешки, лишнего шума и ощущения конвейера.
              </p>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed mb-3"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Мастер видит не только шерсть и форму, но и настроение питомца. Где нужно — даст время привыкнуть. Где важно — сделает мягче. Где можно — доведёт образ до аккуратного, чистого и выразительного результата.
              </p>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                ПОСЛЕ — это момент, когда собака выглядит ухоженно, чувствует себя спокойно, а владелец понимает: к деталям здесь относятся всерьёз.
              </p>
            </motion.div>

            {/* Right: 2x2 cards with icon — aligned to h2 start */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4 mt-[calc(1.5rem+1.2em)]"
            >
              {[
                {
                  num: "01",
                  text: "Камерный формат",
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#A8C5B5" strokeWidth="1.2">
                      <rect x="4" y="4" width="10" height="10" />
                      <rect x="18" y="4" width="10" height="10" />
                      <rect x="4" y="18" width="10" height="10" />
                      <rect x="18" y="18" width="10" height="10" />
                    </svg>
                  ),
                },
                {
                  num: "02",
                  text: "Спокойный процесс",
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#A8C5B5" strokeWidth="1.2">
                      <path d="M16 4C16 4 6 10 6 18a10 10 0 0020 0C26 10 16 4 16 4z" />
                      <path d="M10 20c1-3 3-5 6-6" />
                    </svg>
                  ),
                },
                {
                  num: "03",
                  text: "Внимание к характеру",
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#A8C5B5" strokeWidth="1.2">
                      <path d="M16 27S5 20 5 12a6 6 0 0111-3.3A6 6 0 0127 12c0 8-11 15-11 15z" />
                    </svg>
                  ),
                },
                {
                  num: "04",
                  text: "Постоянный мастер",
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#A8C5B5" strokeWidth="1.2">
                      <circle cx="16" cy="16" r="11" />
                      <circle cx="16" cy="16" r="6" />
                      <path d="M16 5v3M16 24v3M5 16h3M24 16h3" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="card-lift rounded-2xl p-6 border border-[#EDE8DF] flex flex-col justify-between min-h-[160px]" style={{ backgroundColor: "#F7F5F2" }}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[#0E0E0E]/40 text-sm"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px" }}>
                      {item.num}
                    </span>
                    {item.icon}
                  </div>
                  <div>
                    <div className="w-8 h-px bg-[#A8C5B5] mb-4" />
                    <p className="text-[#0E0E0E] font-light"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
       </section>{/* ── BEFORE / AFTER ───────────────────────────────────────────────── */}
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
      <section className="py-14 md:py-20" style={{ backgroundColor: "#F0EDE8" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="border rounded-sm max-w-5xl mx-auto overflow-hidden"
            style={{ borderColor: "rgba(180,150,90,0.25)", backgroundColor: "#F0EDE8" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-[45%_55%]">
              {/* Left — photo */}
              <div className="relative">
                <div className="h-full min-h-[420px] overflow-hidden">
                  <img
                    src={MASTER_PHOTO}
                    alt="Мастер"
                    className="w-full h-full object-cover object-top"
                    style={{ minHeight: "420px" }}
                  />
                </div>
                {/* Experience badge */}
                <div
                  className="absolute bottom-6 right-6 w-28 h-28 flex flex-col items-center justify-center"
                  style={{ backgroundColor: "#A8C5B5" }}
                >
                  <span className="text-[#2a2a2a] text-center leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", letterSpacing: "0.08em" }}>
                    5 ЛЕТ<br />ОПЫТА
                  </span>
                </div>
              </div>

              {/* Right — text */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                {/* Label */}
                <p className="uppercase mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", letterSpacing: "0.35em", color: "#B8965A" }}>
                  Мастер
                </p>
                {/* Gold line + paw divider */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px" style={{ backgroundColor: "rgba(180,150,90,0.4)" }} />
                  <span style={{ color: "#B8965A", fontSize: "18px" }}>🐾</span>
                  <div className="flex-1 h-px" style={{ backgroundColor: "rgba(180,150,90,0.4)" }} />
                </div>
                {/* Heading */}
                <h2 className="font-light leading-tight mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.2vw, 42px)", color: "#1a1a14" }}>
                  Работаю не с потоком,<br />а с характером
                </h2>
                {/* Ornamental divider */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px" style={{ backgroundColor: "rgba(180,150,90,0.3)" }} />
                  <span style={{ color: "#B8965A", fontSize: "20px" }}>❧</span>
                  <div className="flex-1 h-px" style={{ backgroundColor: "rgba(180,150,90,0.3)" }} />
                </div>
                {/* Text */}
                <p className="leading-relaxed mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: "rgba(26,26,20,0.7)" }}>
                  Для меня груминг начинается не с инструмента, а с контакта. Я смотрю, как собака реагирует, где ей спокойно, где нужно больше времени, какой уход подойдёт именно ей.
                </p>
                <p className="leading-relaxed mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: "rgba(26,26,20,0.7)" }}>
                  Мне важно, чтобы после процедуры питомец выглядел ухоженно, но не был уставшим и зажатым. Красивый результат имеет смысл только тогда, когда он получен бережно.
                </p>
                {/* Link */}
                <Link
                  href="/about"
                  className="link-arrow self-start uppercase pb-0.5"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "0.25em", color: "#A8C5B5", borderBottom: "1px solid rgba(168,197,181,0.4)" }}
                >
                  Подробнее обо мне →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BOOKING CTA ──────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#0E0E0E", minHeight: "480px" }}
      >
        {/* Decorative gold lines */}
        <div className="absolute inset-0 pointer-events-none">
          {/* top-left corner lines */}
          <div className="absolute top-0 left-0 w-32 h-px" style={{ background: "linear-gradient(to right, #A8C5B5, transparent)" }} />
          <div className="absolute top-0 left-0 h-32 w-px" style={{ background: "linear-gradient(to bottom, #A8C5B5, transparent)" }} />
          {/* bottom-right corner lines */}
          <div className="absolute bottom-0 right-0 w-32 h-px" style={{ background: "linear-gradient(to left, #A8C5B5, transparent)" }} />
          <div className="absolute bottom-0 right-0 h-32 w-px" style={{ background: "linear-gradient(to top, #A8C5B5, transparent)" }} />
          {/* faint center circle */}
          <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[420px] h-[420px] rounded-full opacity-[0.04]"
            style={{ border: "1px solid #A8C5B5" }} />
          <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[280px] h-[280px] rounded-full opacity-[0.06]"
            style={{ border: "1px solid #A8C5B5" }} />
        </div>

        <div className="container relative z-10 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center">

            {/* Left — typography */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[#A8C5B5] text-[10px] tracking-[0.4em] uppercase mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Запись
              </p>
              <h2 className="font-light text-white leading-[1.05] mb-8"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(48px, 6vw, 80px)",
                }}>
                Начните<br />
                <span style={{ color: "#A8C5B5" }}>с знакомства.</span>

              </h2>
              <p className="text-white/40 max-w-sm leading-relaxed mb-10"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>
                Первый визит — это знакомство. Мы смотрим, слушаем и подбираем то, что нужно именно вашему питомцу.
              </p>
              <Link
                href="/booking"
                className="inline-flex items-center gap-4 group"
              >
                <span
                  className="btn-mint text-[10px] tracking-[0.3em] uppercase px-10 py-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Записаться
                </span>
                <span className="link-arrow text-[#A8C5B5] text-2xl">→</span>
              </Link>
            </motion.div>

            {/* Right — contact info cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-4 min-w-[260px]"
            >
              {/* Address */}
              <div className="card-lift-dark border border-white/[0.08] p-6" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                <p className="text-[#A8C5B5] text-[9px] tracking-[0.35em] uppercase mb-3"
                  style={{ fontFamily: "'Inter', sans-serif" }}>
                  Адрес
                </p>
                <p className="text-white/70 leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>
                  Вокзальная магистраль, 16<br />
                  <span className="text-white/35 text-sm">Новосибирск</span>
                </p>
              </div>
              {/* Phone */}
              <a
                href="tel:+79130187219"
                className="border border-white/[0.08] p-6 group hover:border-[#A8C5B5]/40 transition-all duration-300"
                style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              >
                <p className="text-[#A8C5B5] text-[9px] tracking-[0.35em] uppercase mb-3"
                  style={{ fontFamily: "'Inter', sans-serif" }}>
                  Телефон
                </p>
                <p className="text-white/70 group-hover:text-white transition-colors duration-300"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", letterSpacing: "0.04em" }}>
                  +7 913 018-72-19
                </p>
              </a>
              {/* Hours */}
              <div className="card-lift-dark border border-white/[0.08] p-6" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                <p className="text-[#A8C5B5] text-[9px] tracking-[0.35em] uppercase mb-3"
                  style={{ fontFamily: "'Inter', sans-serif" }}>
                  Часы работы
                </p>
                <p className="text-white/70"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>
                  Ежедневно, 10:00 — 20:00
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

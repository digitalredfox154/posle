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
          backgroundImage: "url('/manus-storage/posle-hero-bg_068adb5d.png')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#111111",
        }}
      >
        {/* Subtle dark overlay on left for text readability */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(10,10,14,0.75) 0%, rgba(10,10,14,0.4) 50%, transparent 100%)",
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
                className="text-[#C4A96A] text-[10px] tracking-[0.35em] uppercase mb-6"
                style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.3em" }}
              >
                Камерный груминг-сервис · Новосибирск
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="text-white leading-none mb-4"
                style={{
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
                <div className="h-px w-24" style={{ background: "linear-gradient(to right, transparent, #C4A96A)" }} />
                <span style={{ color: "#C4A96A", fontSize: "14px" }}>&#10022;</span>
                <div className="h-px w-24" style={{ background: "linear-gradient(to left, transparent, #C4A96A)" }} />
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="text-white/60 font-light leading-relaxed mb-12 max-w-sm"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: "1.7" }}
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
                    backgroundColor: "#8B9B6B",
                    color: "#ffffff",
                  }}
                >
                  Записаться
                </Link>
                <Link
                  href="/results"
                  className="inline-block text-center text-[11px] tracking-[0.25em] uppercase text-white/65 px-10 py-4 hover:text-white transition-all duration-300"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    border: "1px solid rgba(255,255,255,0.25)",
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
      <section className="py-24 md:py-32 bg-[#FDFCF9]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Left: label + heading + paragraphs */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[#C4A96A] text-[10px] tracking-[0.3em] uppercase mb-8"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Философия
              </p>
              <h2 className="font-light leading-tight mb-8 text-[#0E0E0E]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(40px, 5vw, 60px)",
                }}>
                Один питомец.<br />Полное внимание.{" "}
                <span className="text-[#C4A96A]" style={{ fontSize: "0.7em" }}>✦</span>
              </h2>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed mb-5"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Мы не работаем в потоке. У каждой собаки есть свой характер, привычки, тревоги и границы. Поэтому визит в ПОСЛЕ строится спокойно: без спешки, лишнего шума и ощущения конвейера.
              </p>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed mb-5"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Мастер видит не только шерсть и форму, но и настроение питомца. Где нужно — даст время привыкнуть. Где важно — сделает мягче. Где можно — доведёт образ до аккуратного, чистого и выразительного результата.
              </p>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                ПОСЛЕ — это момент, когда собака выглядит ухоженно, чувствует себя спокойно, а владелец понимает: к деталям здесь относятся всерьёз.
              </p>
            </motion.div>

            {/* Right: 2x2 cards with icon */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  num: "01",
                  text: "Камерный формат",
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C4A96A" strokeWidth="1.2">
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
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C4A96A" strokeWidth="1.2">
                      <path d="M16 4C16 4 6 10 6 18a10 10 0 0020 0C26 10 16 4 16 4z" />
                      <path d="M10 20c1-3 3-5 6-6" />
                    </svg>
                  ),
                },
                {
                  num: "03",
                  text: "Внимание к характеру",
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C4A96A" strokeWidth="1.2">
                      <path d="M16 27S5 20 5 12a6 6 0 0111-3.3A6 6 0 0127 12c0 8-11 15-11 15z" />
                    </svg>
                  ),
                },
                {
                  num: "04",
                  text: "Постоянный мастер",
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C4A96A" strokeWidth="1.2">
                      <circle cx="16" cy="16" r="11" />
                      <circle cx="16" cy="16" r="6" />
                      <path d="M16 5v3M16 24v3M5 16h3M24 16h3" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="bg-white rounded-2xl p-6 border border-[#EDE8DF] flex flex-col justify-between min-h-[160px]"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[#0E0E0E]/40 text-sm"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px" }}>
                      {item.num}
                    </span>
                    {item.icon}
                  </div>
                  <div>
                    <div className="w-8 h-px bg-[#C4A96A] mb-4" />
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
      </section>

      {/* ── BEFORE / AFTER ───────────────────────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            {/* РЕЗУЛЬТАТЫ label */}
            <p className="text-[#C4A96A] text-[10px] tracking-[0.35em] uppercase mb-3"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              РЕЗУЛЬТАТЫ
            </p>
            {/* Gold divider + paw icon */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #C4A96A)" }} />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#C4A96A">
                <ellipse cx="12" cy="17" rx="5" ry="4" />
                <ellipse cx="6" cy="11" rx="2.5" ry="3" />
                <ellipse cx="18" cy="11" rx="2.5" ry="3" />
                <ellipse cx="9" cy="7" rx="2" ry="2.5" />
                <ellipse cx="15" cy="7" rx="2" ry="2.5" />
              </svg>
              <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #C4A96A)" }} />
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
          <div className="flex items-center justify-center gap-3 mt-12">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #C4A96A)" }} />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#C4A96A">
              <ellipse cx="12" cy="17" rx="5" ry="4" />
              <ellipse cx="6" cy="11" rx="2.5" ry="3" />
              <ellipse cx="18" cy="11" rx="2.5" ry="3" />
              <ellipse cx="9" cy="7" rx="2" ry="2.5" />
              <ellipse cx="15" cy="7" rx="2" ry="2.5" />
            </svg>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #C4A96A)" }} />
          </div>

          <div className="text-center mt-8">
            <Link
              href="/results"
              className="inline-block text-xs tracking-[0.2em] uppercase border border-[#2C2416]/20 text-[#2C2416]/60 px-8 py-3 hover:border-[#C4A96A] hover:text-[#C4A96A] transition-all duration-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Все результаты
            </Link>
          </div>
        </div>
      </section>

      {/* ── SUBSCRIPTION TEASER ──────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#111110" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr_0.9fr] gap-6 items-stretch">

            {/* Col 1 — heading + text + button */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col justify-between border border-white/[0.07] p-8"
              style={{ backgroundColor: "#1a1a18" }}
            >
              <div>
                <p className="text-[#C4A96A] uppercase mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.3em", fontSize: "13px" }}>
                  Клуб резидентов
                </p>
                <h2 className="text-white font-light leading-[1.15] mb-8"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(36px, 4.5vw, 58px)",
                  }}>
                  Для тех, кто выбирает постоянство
                </h2>
                <p className="text-white/45 text-sm leading-relaxed mb-10"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px" }}>
                  Онлайн-дневник питомца в личном кабинете — всё о его жизни: визиты, уход, рекомендации и важные заметки. Всегда под рукой.
                </p>
              </div>
              <Link
                href="/booking"
                className="inline-block text-[10px] tracking-[0.25em] uppercase border border-[#A8C5B5]/60 text-[#A8C5B5] px-8 py-4 hover:bg-[#A8C5B5]/10 transition-all duration-300 self-start"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Записаться
              </Link>
            </motion.div>

            {/* Col 2 — diary card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="border border-white/[0.07] p-8"
              style={{ backgroundColor: "#1a1a18" }}
            >
              <p className="text-[#C4A96A] uppercase mb-8"
                style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.3em", fontSize: "13px" }}>
                Онлайн-дневник питомца
              </p>
              <div className="flex flex-col">
                {[
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4A96A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                        <path d="M8 14h2M14 14h2M8 18h2M14 18h2" />
                      </svg>
                    ),
                    text: "История визитов и процедур",
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4A96A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    ),
                    text: "Рекомендации по уходу и питанию",
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4A96A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M7 8h10M7 12h6M7 16h4" />
                      </svg>
                    ),
                    text: "Заметки и важные наблюдения",
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4A96A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      </svg>
                    ),
                    text: "Напоминания о записях и процедурах",
                  },
                ].map((item, idx, arr) => (
                  <div key={idx}>
                    <div className="flex items-center gap-5 py-5">
                      <div className="shrink-0 w-8 flex items-center justify-center">{item.icon}</div>
                      <p className="text-white/80"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", lineHeight: "1.4" }}>
                        {item.text}
                      </p>
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Col 3 — subscription card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="border border-white/[0.07] p-8 flex flex-col items-center text-center"
              style={{ backgroundColor: "#1a1a18" }}
            >
              {/* Logo emblem — olive PNG */}
              <div className="mb-6 w-24 h-24 flex items-center justify-center">
                <img
                  src="/manus-storage/posle-logo-olive_44f3e3e8.png"
                  alt="ПОСЛЕ логотип"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[#C4A96A] uppercase mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.3em", fontSize: "13px" }}>
                Дополнение
              </p>
              <h3 className="text-white font-light leading-tight mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(26px, 3vw, 34px)",
                }}>
                Индивидуальная<br />подписка
              </h3>
              {/* small gold star divider */}
              <div className="my-4">
                <span className="text-[#C4A96A]" style={{ fontSize: "18px" }}>✦</span>
              </div>
              <p className="text-white/45 leading-relaxed mb-8"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px" }}>
                Персональные привилегии и особое внимание для вашего питомца.
              </p>
              <Link
                href="/subscription"
                className="w-full flex items-center justify-between border border-white/[0.15] text-white/60 px-5 py-3.5 hover:border-[#C4A96A]/60 hover:text-[#C4A96A] transition-all duration-300 mt-auto"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <span className="tracking-[0.25em] uppercase" style={{ fontSize: "13px" }}>Обсудить условия</span>
                <span className="text-lg">→</span>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── MASTER BIO ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="border rounded-sm max-w-5xl mx-auto overflow-hidden"
            style={{ borderColor: "rgba(180,150,90,0.25)", backgroundColor: "#FAF7F2" }}
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
              <div className="p-10 md:p-14 flex flex-col justify-center">
                {/* Label */}
                <p className="uppercase mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", letterSpacing: "0.35em", color: "#B8965A" }}>
                  Мастер
                </p>
                {/* Gold line + paw divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px" style={{ backgroundColor: "rgba(180,150,90,0.4)" }} />
                  <span style={{ color: "#B8965A", fontSize: "18px" }}>🐾</span>
                  <div className="flex-1 h-px" style={{ backgroundColor: "rgba(180,150,90,0.4)" }} />
                </div>
                {/* Heading */}
                <h2 className="font-light leading-tight mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 3.5vw, 46px)", color: "#1a1a14" }}>
                  Работаю не с потоком,<br />а с характером
                </h2>
                {/* Ornamental divider */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex-1 h-px" style={{ backgroundColor: "rgba(180,150,90,0.3)" }} />
                  <span style={{ color: "#B8965A", fontSize: "20px" }}>❧</span>
                  <div className="flex-1 h-px" style={{ backgroundColor: "rgba(180,150,90,0.3)" }} />
                </div>
                {/* Text */}
                <p className="leading-relaxed mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "rgba(26,26,20,0.7)" }}>
                  Для меня груминг начинается не с инструмента, а с контакта. Я смотрю, как собака реагирует, где ей спокойно, где нужно больше времени, какой уход подойдёт именно ей.
                </p>
                <p className="leading-relaxed mb-10" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "rgba(26,26,20,0.7)" }}>
                  Мне важно, чтобы после процедуры питомец выглядел ухоженно, но не был уставшим и зажатым. Красивый результат имеет смысл только тогда, когда он получен бережно.
                </p>
                {/* Link */}
                <Link
                  href="/about"
                  className="self-start uppercase pb-0.5 transition-all duration-200 hover:opacity-100"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "0.25em", color: "#B8965A", borderBottom: "1px solid rgba(180,150,90,0.5)" }}
                >
                  Подробнее обо мне
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BOOKING CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#F7FAF9]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-xl mx-auto"
          >
            <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              Запись
            </p>
            <h2 className="font-light text-[#0E0E0E] mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px, 5vw, 56px)",
              }}>
              Запишитесь на уход в ПОСЛЕ
            </h2>
            <p className="text-[#0E0E0E]/50 text-sm mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              Подберём удобное время и процедуру под состояние шерсти, характер собаки и желаемый результат.
            </p>
            <p className="text-[#0E0E0E]/50 text-sm mb-10"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              Вокзальная магистраль, 16 · +7 913 018-72-19
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="inline-block text-center text-xs tracking-[0.2em] uppercase bg-[#0E0E0E] text-white px-10 py-4 hover:bg-[#1a1a1a] transition-all duration-300 font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Записаться онлайн
              </Link>
              <a
                href="tel:+79130187219"
                className="inline-block text-center text-xs tracking-[0.2em] uppercase border border-[#0E0E0E]/20 text-[#0E0E0E]/60 px-10 py-4 hover:border-[#0E0E0E] hover:text-[#0E0E0E] transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Позвонить
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

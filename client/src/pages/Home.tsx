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
      <section className="relative min-h-[88vh] flex items-center bg-[#111009] overflow-hidden">
        {/* Subtle dot texture */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Gold vignette glow */}
        <div className="absolute bottom-0 right-0 w-[60%] h-[70%] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 80% 80%, rgba(196,169,106,0.08) 0%, transparent 70%)",
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
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Камерный груминг-сервис · Новосибирск
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="text-white font-light leading-none mb-4"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(72px, 11vw, 130px)",
                  letterSpacing: "-0.01em",
                }}
              >
                после
              </motion.h1>

              {/* Gold divider with star */}
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <div className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, #C4A96A)" }} />
                <span className="text-[#C4A96A] text-sm">&#10022;</span>
                <div className="h-px w-20" style={{ background: "linear-gradient(to left, transparent, #C4A96A)" }} />
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="text-white/55 text-base font-light leading-relaxed mb-12 max-w-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Деликатный уход для собак, где важны<br />
                не только чистота и форма, но и состояние<br />
                питомца после визита.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/booking"
                  className="inline-block text-center text-[11px] tracking-[0.25em] uppercase px-10 py-4 font-medium transition-all duration-300 hover:opacity-90"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    background: "linear-gradient(135deg, #C4A96A 0%, #9E7F44 100%)",
                    color: "#111009",
                  }}
                >
                  Записаться
                </Link>
                <Link
                  href="/results"
                  className="inline-block text-center text-[11px] tracking-[0.25em] uppercase border border-white/25 text-white/65 px-10 py-4 hover:border-[#C4A96A] hover:text-[#C4A96A] transition-all duration-300"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Посмотреть работы
                </Link>
              </motion.div>
            </motion.div>

            {/* RIGHT: logo image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
              className="flex items-center justify-center"
            >
              <img
                src="/manus-storage/posle-logo-only_fef94be3.png"
                alt="ПОСЛЕ — груминг-сервис"
                className="w-full max-w-[520px] object-contain select-none"
                draggable={false}
              />
            </motion.div>

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
      <section className="py-24 md:py-32 bg-[#F7FAF9]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              Результаты
            </p>
            <h2 className="font-light text-[#0E0E0E]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px, 5vw, 56px)",
              }}>
              До и после
            </h2>
            <p className="text-[#0E0E0E]/50 text-sm mt-4 max-w-md mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              Передвиньте разделитель, чтобы увидеть разницу в деталях
            </p>
          </motion.div>

          {/* 4 sliders in 2x2 grid — no labels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
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

          <p className="text-center text-[#0E0E0E]/50 text-sm mt-10 max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            Аккуратная форма, чистая шерсть, выразительный силуэт и тот самый вид, ради которого хочется сделать фото сразу после процедуры.
          </p>
          <div className="text-center mt-8">
            <Link
              href="/results"
              className="inline-block text-xs tracking-[0.2em] uppercase border border-[#0E0E0E]/20 text-[#0E0E0E]/60 px-8 py-3 hover:border-[#0E0E0E] hover:text-[#0E0E0E] transition-all duration-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Все результаты
            </Link>
          </div>
        </div>
      </section>

      {/* ── SUBSCRIPTION TEASER ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#0E0E0E]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Клуб резидентов
              </p>
              <h2 className="text-white font-light leading-tight mb-8"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(36px, 5vw, 56px)",
                }}>
                Для тех, кто выбирает постоянство
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-8"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Резиденты ПОСЛЕ — это клиенты, чьих собак мы знаем не по карточке, а по характеру. Привычки, особенности шерсти, комфортный темп, предпочтения владельца — всё сохраняется и учитывается при каждом визите.
              </p>
              <Link
                href="/subscription"
                className="inline-block text-xs tracking-[0.2em] uppercase bg-[#A8C5B5] text-[#0E0E0E] px-8 py-4 hover:bg-[#C8DDD4] transition-all duration-300 font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Стать резидентом
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              {(plans && plans.length > 0 ? plans : [
                { id: 1, name: "Резидент", priceKopecks: 199000, features: JSON.stringify(["Приоритетная запись", "Индивидуальные условия", "История ухода питомца"]) },
              ]).slice(0, 1).map((plan) => (
                <div key={plan.id} className="border border-white/10 p-8">
                  <p className="text-[#A8C5B5] text-xs tracking-widest uppercase mb-4"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    {plan.name}
                  </p>
                  <p className="text-white font-light mb-6"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "42px" }}>
                    {(plan.priceKopecks / 100).toLocaleString("ru-RU")} ₽
                    <span className="text-white/30 text-base ml-2">/мес</span>
                  </p>
                  <div className="flex flex-col gap-2">
                    {(JSON.parse(plan.features || "[]") as string[]).map((f: string) => (
                      <div key={f} className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full bg-[#A8C5B5]" />
                        <span className="text-white/60 text-xs"
                          style={{ fontFamily: "'Inter', sans-serif" }}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MASTER BIO ───────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#F7FAF9]">
                <img
                  src={MASTER_PHOTO}
                  alt="Мастер"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#A8C5B5] flex items-center justify-center">
                <span className="text-[#0E0E0E] text-xs tracking-widest uppercase text-center leading-tight"
                  style={{ fontFamily: "'Inter', sans-serif" }}>
                  5 лет<br />опыта
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Мастер
              </p>
              <h2 className="font-light leading-tight mb-6 text-[#0E0E0E]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(32px, 4vw, 48px)",
                }}>
                Работаю не с потоком,<br />а с характером
              </h2>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Для меня груминг начинается не с инструмента, а с контакта. Я смотрю, как собака реагирует, где ей спокойно, где нужно больше времени, какой уход подойдёт именно ей.
              </p>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed mb-8"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Мне важно, чтобы после процедуры питомец выглядел ухоженно, но не был уставшим и зажатым. Красивый результат имеет смысл только тогда, когда он получен бережно.
              </p>
              <Link
                href="/about"
                className="text-xs tracking-[0.2em] uppercase text-[#0E0E0E]/50 hover:text-[#0E0E0E] border-b border-[#0E0E0E]/20 hover:border-[#0E0E0E] pb-0.5 transition-all duration-200"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Подробнее обо мне
              </Link>
            </motion.div>
          </div>
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

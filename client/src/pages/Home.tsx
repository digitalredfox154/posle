import { Link } from "wouter";
import { useState } from "react";
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

// Real before/after photos
const PAIRS = [
  { before: "/manus-storage/before1_fb6caf90.jpg", after: "/manus-storage/after1_6b1450ec.jpg", label: "Чёрный пудель" },
  { before: "/manus-storage/before2_929dde77.jpg", after: "/manus-storage/after2_8b3d0f2b.jpg", label: "Рыжий пудель" },
  { before: "/manus-storage/before3_425e89a3.png", after: "/manus-storage/after3_180d1793.png", label: "Шпиц" },
  { before: "/manus-storage/before4_ff6d2058.jpg", after: "/manus-storage/after4_15677a44.jpg", label: "Йоркшир" },
  { before: "/manus-storage/before5_1c1723f8.png", after: "/manus-storage/after5_2fb66477.png", label: "Коричневый пудель" },
];
const MASTER_PHOTO = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80";

export default function Home() {
  const { data: plans } = trpc.subscriptions.plans.useQuery();
  const [selectedPair, setSelectedPair] = useState(0);

  return (
    <PublicLayout>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-[#0E0E0E] overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)"
          }}
        />
        <div className="container relative z-10 py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-[#A8C5B5] text-xs tracking-[0.3em] uppercase mb-8"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Камерный груминг-сервис · Новосибирск
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-white font-light leading-none mb-8"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(64px, 10vw, 120px)",
                letterSpacing: "-0.02em",
              }}
            >
              ПОСЛЕ
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-12 max-w-lg"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Не просто груминг. Результат, который вы замечаете сразу — чистота, ухоженность, характер.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/booking"
                className="inline-block text-center text-xs tracking-[0.2em] uppercase bg-[#A8C5B5] text-[#0E0E0E] px-8 py-4 hover:bg-[#C8DDD4] transition-all duration-300 font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Записаться
              </Link>
              <Link
                href="/results"
                className="inline-block text-center text-xs tracking-[0.2em] uppercase border border-white/30 text-white/70 px-8 py-4 hover:border-white hover:text-white transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Смотреть результаты
              </Link>
            </motion.div>
          </motion.div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-white animate-pulse" />
        </div>
      </section>

      {/* ── PHILOSOPHY ───────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Философия
              </p>
              <h2 className="font-light leading-tight mb-8 text-[#0E0E0E]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(36px, 5vw, 56px)",
                }}>
                Один питомец.<br />Полное внимание.
              </h2>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                ПОСЛЕ — это не поток. Мы принимаем ограниченное количество клиентов, чтобы каждый визит был событием, а не рутиной.
              </p>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Каждая процедура заканчивается результатом, который вы видите и чувствуете. Именно поэтому мы называемся ПОСЛЕ.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { num: "01", text: "Камерный формат" },
                { num: "02", text: "Только результат" },
                { num: "03", text: "Без суеты" },
                { num: "04", text: "Постоянный мастер" },
              ].map((item) => (
                <div key={item.num} className="bg-[#F7FAF9] p-6 border border-[#E8F0EC]">
                  <p className="text-[#A8C5B5] text-xs tracking-widest mb-3"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    {item.num}
                  </p>
                  <p className="text-[#0E0E0E] text-sm font-light"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>
                    {item.text}
                  </p>
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
              Потяните разделитель, чтобы увидеть разницу
            </p>
          </motion.div>

          {/* Pair selector tabs */}
          <div className="flex justify-center gap-2 flex-wrap mb-8">
            {PAIRS.map((pair, i) => (
              <button
                key={i}
                onClick={() => setSelectedPair(i)}
                className={`text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-300 ${
                  selectedPair === i
                    ? "border-[#A8C5B5] text-[#0E0E0E] bg-[#A8C5B5]/20"
                    : "border-[#0E0E0E]/20 text-[#0E0E0E]/50 hover:border-[#0E0E0E]/50 hover:text-[#0E0E0E]/70"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {pair.label}
              </button>
            ))}
          </div>

          {/* Single slider for selected pair */}
          <motion.div
            key={selectedPair}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <BeforeAfterSlider
              beforeSrc={PAIRS[selectedPair].before}
              afterSrc={PAIRS[selectedPair].after}
              aspectRatio="4/3"
            />
            <p className="text-center text-xs text-[#0E0E0E]/40 mt-3 tracking-widest uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              {PAIRS[selectedPair].label}
            </p>
          </motion.div>

          <div className="text-center mt-12">
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
                Постоянство — это привилегия
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-8"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Резиденты ПОСЛЕ получают приоритетную запись, персональный подход и особые условия. Не для всех — для своих.
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
                { id: 1, name: "Резидент", priceKopecks: 199000, features: JSON.stringify(["Приоритетная запись", "Скидка 10%", "Дневник питомца"]) },
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
                Я работаю<br />с характером
              </h2>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Каждый питомец — это личность. Я не тороплюсь и не работаю в потоке. Мне важно, чтобы и животное, и хозяин уходили с ощущением заботы.
              </p>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed mb-8"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Специализация: собаки и кошки всех пород. Работаю только с профессиональной косметикой.
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
              Готовы к результату?
            </h2>
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

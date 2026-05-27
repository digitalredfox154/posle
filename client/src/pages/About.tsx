import { motion } from "framer-motion";
import PublicLayout from "@/components/PublicLayout";
import { Link } from "wouter";

const MASTER_PHOTO = "/manus-storage/master_191c8f08.jpg";

export default function About() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section
        className="about-hero-section"
        style={{
          position: "relative",
          backgroundImage: "url('/manus-storage/about_hero_bg_new_9c6d631d.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#111110",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "clamp(80px, 15vw, 120px)",
          paddingBottom: "clamp(48px, 8vw, 80px)",
        }}
      >
        {/* Bottom fade to dark */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "220px",
          background: "linear-gradient(to bottom, transparent, #111110)",
          pointerEvents: "none",
          zIndex: 1,
        }} />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: "520px", width: "100%" }}
          >
            {/* Label */}
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "8px" }}>
              О СЕРВИСЕ
            </p>
            {/* Gold divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
              <div style={{ height: "1px", width: "32px", background: "#C9A96E" }} />
              <svg width="8" height="8" viewBox="0 0 8 8"><path d="M4 0L5 3L8 4L5 5L4 8L3 5L0 4L3 3Z" fill="#C9A96E"/></svg>
            </div>
            {/* Headline */}
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(52px, 7vw, 88px)",
                fontWeight: 300,
                color: "#FFFFFF",
                lineHeight: 1.1,
                marginBottom: "28px",
              }}
            >
              Не для всех.<br />Для своих.
            </h1>
            {/* Bottom divider + subtitle */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ height: "1px", width: "32px", background: "#C9A96E" }} />
              <svg width="8" height="8" viewBox="0 0 8 8"><path d="M4 0L5 3L8 4L5 5L4 8L3 5L0 4L3 3Z" fill="#C9A96E"/></svg>
              <div style={{ height: "1px", width: "32px", background: "#C9A96E" }} />
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
              СЕЛЕКТИВНЫЙ ГРУМИНГ
            </p>
          </motion.div>
        </div>
      </section>


      {/* How I Work */}
      <section className="py-14 md:py-32" style={{ backgroundColor: "#111110" }}>
        <div className="container">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-4"
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 300,
                color: "#F0EDE8",
                letterSpacing: "0.01em",
              }}
            >
              Как я работаю
            </h2>
          </motion.div>
          {/* Gold divider */}
          <div className="flex items-center justify-center gap-3 mb-14">
            <div style={{ height: "1px", width: "48px", background: "#C9A96E" }} />
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#C9A96E" }} />
            <div style={{ height: "1px", width: "48px", background: "#C9A96E" }} />
          </div>
          {/* Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {[
              { num: "01", title: "Камерный формат", text: "Один питомец за раз. Никакого шума, никакого стресса от других животных." },
              { num: "02", title: "Спокойный процесс", text: "Без спешки и конвейера. Там, где нужно больше времени — я даю его." },
              { num: "03", title: "Внимание к характеру", text: "Каждая собака уникальна. Подход строится под конкретного питомца." },
              { num: "04", title: "Постоянный мастер", text: "Вас всегда встречает один и тот же мастер, который знает вашего питомца." },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                style={{
                  backgroundColor: "#1A1A18",
                  border: "1px solid rgba(201,169,110,0.18)",
                  padding: "36px 28px 40px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "32px",
                    fontWeight: 300,
                    color: "#C9A96E",
                    marginBottom: "12px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.num}
                </p>
                <div style={{ height: "1px", width: "28px", background: "rgba(201,169,110,0.45)", marginBottom: "24px" }} />
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(20px, 2vw, 26px)",
                    fontWeight: 300,
                    color: "#F0EDE8",
                    lineHeight: 1.25,
                    marginBottom: "16px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    color: "rgba(240,237,232,0.5)",
                    lineHeight: 1.7,
                  }}
                >
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Space / Location */}
      <section className="py-14 md:py-32" style={{ backgroundColor: "#111110" }}>
        <div className="container">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "8px" }}>
              Пространство
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ height: "1px", width: "32px", background: "#C9A96E" }} />
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#C9A96E" }} />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left: text */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(36px, 4.5vw, 58px)",
                  fontWeight: 300,
                  color: "#F0EDE8",
                  lineHeight: 1.15,
                  marginBottom: "32px",
                }}
              >
                Место, где<br />хочется остаться
              </h2>

              {/* Info rows */}
              {[
                { label: "Адрес", value: "Вокзальная магистраль, 16" },
                { label: "Город", value: "Новосибирск" },
                { label: "Работаем", value: "Чт — Вс: 10:00 — 20:00" },
                { label: "Запись", value: "По телефону или онлайн" },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    borderBottom: "1px solid rgba(201,169,110,0.15)",
                    paddingBottom: "14px",
                    marginBottom: "14px",
                  }}
                >
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,237,232,0.35)" }}>
                    {row.label}
                  </span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 300, color: "#F0EDE8" }}>
                    {row.value}
                  </span>
                </div>
              ))}

              <Link
                href="/contacts"
                style={{
                  display: "inline-block",
                  marginTop: "24px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#A8C5B5",
                  borderBottom: "1px solid rgba(168,197,181,0.4)",
                  paddingBottom: "2px",
                  transition: "color 0.3s ease",
                  textDecoration: "none",
                }}
              >
                Как добраться →
              </Link>
            </motion.div>

            {/* Right: map */}
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div style={{ overflow: "hidden", border: "1px solid rgba(201,169,110,0.18)" }}>
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=82.9201%2C55.0415&z=16&pt=82.9201%2C55.0415%2Cpm2rdm&text=Вокзальная+магистраль+16+Новосибирск"
                  width="100%"
                  height="420"
                  frameBorder="0"
                  title="ПОСЛЕ на карте"
                  style={{ display: "block", filter: "grayscale(0.3) brightness(0.85)" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          position: "relative",
          backgroundColor: "#111110",
          paddingTop: "clamp(56px, 10vw, 96px)",
          paddingBottom: "clamp(72px, 12vw, 120px)",
        }}
      >
        {/* Fade to footer */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, transparent, #080808)",
          pointerEvents: "none",
        }} />

        <div className="container text-center" style={{ position: "relative", zIndex: 1 }}>
          {/* Gold divider top */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "40px" }}>
            <div style={{ height: "1px", width: "60px", background: "rgba(201,169,110,0.4)" }} />
            <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 0L6.2 3.8L10 5L6.2 6.2L5 10L3.8 6.2L0 5L3.8 3.8Z" fill="#C9A96E"/></svg>
            <div style={{ height: "1px", width: "60px", background: "rgba(201,169,110,0.4)" }} />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 300,
              color: "#F0EDE8",
              marginBottom: "24px",
              lineHeight: 1.15,
            }}
          >
            Начните с знакомства
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "20px",
              fontWeight: 300,
              color: "rgba(240,237,232,0.45)",
              maxWidth: "440px",
              margin: "0 auto 48px",
              lineHeight: 1.6,
            }}
          >
            Первый визит — это знакомство. Мы смотрим, слушаем и подбираем то, что нужно именно вашему питомцу.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <Link
              href="/booking"
              className="btn-mint"
              style={{
                display: "inline-block",
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                padding: "16px 48px",
                textDecoration: "none",
              }}
            >
              Записаться
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

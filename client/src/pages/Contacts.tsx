import { motion } from "framer-motion";
import PublicLayout from "@/components/PublicLayout";
import { Link } from "wouter";

export default function Contacts() {
  return (
    <PublicLayout>

      {/* ── HERO ── */}
      <section
        className="dark-hero-section"
        style={{
          position: "relative",
          minHeight: "100vh",
          backgroundImage: "url('/manus-storage/contacts_hero_bg_c3d5fab0.png')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundColor: "#111110",
          display: "flex",
          alignItems: "center",
          paddingTop: "clamp(80px, 15vw, 120px)",
          paddingBottom: "clamp(48px, 8vw, 80px)",
        }}
      >
        {/* dark overlay left */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(8,8,8,0.92) 45%, rgba(8,8,8,0.25) 100%)",
          pointerEvents: "none",
        }} />
        {/* fade to contacts block */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "160px",
          background: "linear-gradient(to bottom, transparent, #111110)",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: "520px" }}>
            {/* label */}
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#C9A96E",
              marginBottom: "12px",
            }}>
              Контакты
            </p>
            {/* gold divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
              <div style={{ height: "1px", width: "40px", background: "#C9A96E" }} />
              <svg width="8" height="8" viewBox="0 0 10 10"><path d="M5 0L6.2 3.8L10 5L6.2 6.2L5 10L3.8 6.2L0 5L3.8 3.8Z" fill="#C9A96E"/></svg>
            </div>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(56px, 9vw, 110px)",
              fontWeight: 300,
              color: "#F0EDE8",
              lineHeight: 1.05,
              marginBottom: "32px",
            }}>
              Найдите нас.
            </h1>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(18px, 2vw, 24px)",
              fontWeight: 300,
              color: "rgba(240,237,232,0.5)",
              maxWidth: "360px",
              lineHeight: 1.6,
            }}>
              Вокзальная магистраль, 16 — Новосибирск
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACTS GRID ── */}
      <section
        style={{
          position: "relative",
          backgroundColor: "#111110",
          paddingTop: "clamp(48px, 8vw, 80px)",
          paddingBottom: "clamp(60px, 10vw, 100px)",
        }}
      >
        {/* fade to CTA */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "120px",
          background: "linear-gradient(to bottom, transparent, #0D0D0B)",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ display: "flex", flexDirection: "column", gap: "40px" }}
            >
              {/* Address */}
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "12px" }}>Адрес</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 300, color: "#F0EDE8", marginBottom: "4px" }}>
                  Вокзальная магистраль, 16
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(240,237,232,0.4)", marginBottom: "16px" }}>Новосибирск</p>
                <a
                  href="https://yandex.ru/maps/?text=Вокзальная+магистраль+16+Новосибирск"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A8C5B5", borderBottom: "1px solid rgba(168,197,181,0.4)", paddingBottom: "2px", textDecoration: "none", transition: "color 0.3s ease" }}
                >
                  Открыть в Яндекс Картах →
                </a>
              </div>

              {/* Phone */}
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "12px" }}>Телефон</p>
                <a
                  href="tel:+79130187219"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 300, color: "#F0EDE8", textDecoration: "none" }}
                >
                  +7 913 018-72-19
                </a>
              </div>

              {/* Hours */}
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "16px" }}>Режим работы</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid rgba(201,169,110,0.15)", paddingBottom: "12px" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(240,237,232,0.4)" }}>Чт — Вс</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 300, color: "#F0EDE8" }}>10:00 — 20:00</span>
                </div>
              </div>

              {/* Social */}
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "16px" }}>Соцсети</p>
                <div style={{ display: "flex", gap: "32px" }}>
                  <a href="https://t.me/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(240,237,232,0.5)", textDecoration: "none", letterSpacing: "0.1em" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.03 9.57c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.893.651z"/></svg>
                    Telegram
                  </a>

                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div style={{ overflow: "hidden", border: "1px solid rgba(201,169,110,0.18)" }}>
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=82.9201%2C55.0415&z=16&pt=82.9201%2C55.0415%2Cpm2rdm&text=Вокзальная+магистраль+16+Новосибирск"
                  width="100%"
                  height="480"
                  frameBorder="0"
                  title="ПОСЛЕ на карте"
                  style={{ display: "block", filter: "grayscale(0.3) brightness(0.8)" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          position: "relative",
          backgroundColor: "#0D0D0B",
          paddingTop: "clamp(56px, 10vw, 96px)",
          paddingBottom: "clamp(72px, 12vw, 120px)",
        }}
      >
        {/* fade to footer */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "120px",
          background: "linear-gradient(to bottom, transparent, #080808)",
          pointerEvents: "none",
        }} />

        <div className="container text-center" style={{ position: "relative", zIndex: 1 }}>
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
            style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
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
              Записаться онлайн
            </Link>
            <a
              href="tel:+79130187219"
              className="btn-outline-light"
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
              Позвонить
            </a>
          </motion.div>
        </div>
      </section>

    </PublicLayout>
  );
}

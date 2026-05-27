import { motion } from "framer-motion";
import PublicLayout from "@/components/PublicLayout";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { Link } from "wouter";

const gallery = [
  { id: 1, before: "/manus-storage/after1_1140459b.jpg", after: "/manus-storage/before1_fb6caf90.jpg" },
  { id: 2, before: "/manus-storage/before2_929dde77.jpg", after: "/manus-storage/after2_8b3d0f2b.jpg" },
  { id: 3, before: "/manus-storage/before4_ff6d2058.jpg", after: "/manus-storage/after4_68ffd188.jpg" },
  { id: 4, before: "/manus-storage/before5_1c1723f8.png", after: "/manus-storage/after5_cc507478.png" },
];

export default function Results() {
  return (
    <PublicLayout>

      {/* ── HERO ── */}
      <section
        className="dark-hero-section"
        style={{
          position: "relative",
          minHeight: "100vh",
          backgroundImage: "url('/manus-storage/results_hero_bg_new_cf828d60.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
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
          background: "linear-gradient(to right, rgba(10,10,10,0.85) 40%, rgba(10,10,10,0.2) 100%)",
          pointerEvents: "none",
        }} />
        {/* fade to gallery */}
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
              Результаты
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
              До и после.
            </h1>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(18px, 2vw, 24px)",
              fontWeight: 300,
              color: "rgba(240,237,232,0.5)",
              maxWidth: "380px",
              lineHeight: 1.6,
            }}>
              Потяните разделитель на каждом фото, чтобы увидеть разницу
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY ── */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gallery.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.15 }}
                style={{ border: "1px solid rgba(201,169,110,0.12)" }}
              >
                <BeforeAfterSlider
                  beforeSrc={item.before}
                  afterSrc={item.after}
                  aspectRatio="4/3"
                />
              </motion.div>
            ))}
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

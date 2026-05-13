import { motion } from "framer-motion";
import PublicLayout from "@/components/PublicLayout";
import { Link } from "wouter";

export default function Contacts() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-[#0E0E0E] py-24 md:py-32">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>Контакты</p>
            <h1 className="text-white font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 8vw, 96px)" }}>
              Найдите нас
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Contacts grid */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Info */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col gap-10">
              <div>
                <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>Адрес</p>
                <p className="text-[#0E0E0E] font-light text-xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Вокзальная магистраль, 16
                </p>
                <p className="text-[#0E0E0E]/50 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Новосибирск</p>
                <a
                  href="https://yandex.ru/maps/?text=Вокзальная+магистраль+16+Новосибирск"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-xs tracking-[0.2em] uppercase text-[#A8C5B5] hover:text-[#0E0E0E] border-b border-[#A8C5B5] pb-0.5 transition-all duration-200"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Открыть в Яндекс Картах
                </a>
              </div>

              <div>
                <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>Телефон</p>
                <a href="tel:+79130187219" className="text-[#0E0E0E] font-light text-xl hover:text-[#A8C5B5] transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  +7 913 018-72-19
                </a>
              </div>

              <div>
                <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>Режим работы</p>
                <div className="flex flex-col gap-2">
                  {[
                    { days: "Пн — Пт", time: "10:00 — 19:00" },
                    { days: "Сб", time: "10:00 — 17:00" },
                    { days: "Вс", time: "Выходной" },
                  ].map((row) => (
                    <div key={row.days} className="flex justify-between items-center border-b border-[#E8F0EC] pb-2">
                      <span className="text-[#0E0E0E]/60 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{row.days}</span>
                      <span className="text-[#0E0E0E] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>Соцсети</p>
                <div className="flex gap-6">
                  <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#0E0E0E]/60 hover:text-[#0E0E0E] transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.03 9.57c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.893.651z"/></svg>
                    Telegram
                  </a>
                  <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#0E0E0E]/60 hover:text-[#0E0E0E] transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    Instagram
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="w-full h-80 md:h-full min-h-[400px] bg-[#F7F5F2] overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=82.9201%2C55.0415&z=16&pt=82.9201%2C55.0415%2Cpm2rdm&text=Вокзальная+магистраль+16+Новосибирск"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="ПОСЛЕ на карте"
                  className="w-full h-full"
                  style={{ minHeight: "400px" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 bg-[#F7F5F2]">
        <div className="container text-center">
          <h2 className="font-light text-[#0E0E0E] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)" }}>
            Готовы записаться?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="inline-block text-center text-xs tracking-[0.2em] uppercase bg-[#0E0E0E] text-white px-10 py-4 hover:bg-[#1a1a1a] transition-all duration-300" style={{ fontFamily: "'Inter', sans-serif" }}>
              Записаться онлайн
            </Link>
            <a href="tel:+79130187219" className="inline-block text-center text-xs tracking-[0.2em] uppercase border border-[#0E0E0E]/20 text-[#0E0E0E]/60 px-10 py-4 hover:border-[#0E0E0E] hover:text-[#0E0E0E] transition-all duration-300" style={{ fontFamily: "'Inter', sans-serif" }}>
              Позвонить
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

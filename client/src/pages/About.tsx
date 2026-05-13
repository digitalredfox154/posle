import { motion } from "framer-motion";
import PublicLayout from "@/components/PublicLayout";
import { Link } from "wouter";

const MASTER_PHOTO = "/manus-storage/master_191c8f08.jpg";

export default function About() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-[#0E0E0E] py-24 md:py-32">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>О сервисе</p>
            <h1 className="text-white font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 8vw, 96px)" }}>
              Не для всех.<br />Для своих.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F0EDE8" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="aspect-[3/4] overflow-hidden" style={{ backgroundColor: "#F7F5F2" }}>
                <img src={MASTER_PHOTO} alt="Мастер ПОСЛЕ" className="w-full h-full object-cover object-top" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
              <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>Мастер</p>
              <h2 className="font-light text-[#0E0E0E] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)" }}>
                Работаю не с потоком,<br />а с характером
              </h2>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                Я работаю с животными больше 5 лет. Для меня груминг начинается не с инструмента, а с контакта. Я смотрю, как собака реагирует, где ей спокойно, где нужно больше времени, какой уход подойдёт именно ей.
              </p>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                ПОСЛЕ — это мой ответ на конвейерный груминг. Камерный формат, где я знаю каждого питомца по имени, знаю его характер и особенности. Где результат важнее скорости.
              </p>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                Мне важно, чтобы после процедуры питомец выглядел ухоженно, но не был уставшим и зажатым. Красивый результат имеет смысл только тогда, когда он получен бережно.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F7F5F2" }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
            <h2 className="font-light text-[#0E0E0E]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)" }}>
              Как я работаю
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                className="card-lift border border-[#EDE8DF] p-8 flex flex-col"
                style={{ backgroundColor: "#FDFCFA" }}
              >
                <p className="text-[#A8C5B5] text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>{item.num}</p>
                <div className="w-8 h-px bg-[#A8C5B5] mb-4" />
                <h3 className="text-[#0E0E0E] font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px" }}>{item.title}</h3>
                <p className="text-[#0E0E0E]/60 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Space / Location */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F0EDE8" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>Пространство</p>
              <h2 className="font-light text-[#0E0E0E] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)" }}>
                Место, где<br />хочется остаться
              </h2>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                Вокзальная магистраль, 16, Новосибирск. Небольшое, аккуратное пространство без лишнего. Спокойно для животных, приятно для хозяев.
              </p>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                Работаем ежедневно с 10:00 до 20:00. Запись по телефону или онлайн.
              </p>
              <Link href="/contacts" className="link-arrow text-xs tracking-[0.2em] uppercase text-[#A8C5B5] border-b border-[#A8C5B5]/40 pb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                Как добраться →
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="aspect-[4/3] overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=82.9201%2C55.0415&z=16&pt=82.9201%2C55.0415%2Cpm2rdm&text=Вокзальная+магистраль+16+Новосибирск"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="ПОСЛЕ на карте"
                  className="w-full h-full"
                  style={{ minHeight: "320px" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "#0E0E0E" }}>
        <div className="container text-center">
          <h2 className="text-white font-light mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)" }}>
            Начните с знакомства
          </h2>
          <p className="text-white/40 max-w-sm mx-auto leading-relaxed mb-10" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>
            Первый визит — это знакомство. Мы смотрим, слушаем и подбираем то, что нужно именно вашему питомцу.
          </p>
          <Link href="/booking" className="btn-mint inline-block text-[10px] tracking-[0.3em] uppercase px-10 py-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            Записаться
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}

import { motion } from "framer-motion";
import PublicLayout from "@/components/PublicLayout";
import { Link } from "wouter";

const MASTER_PHOTO = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80";
const INTERIOR = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80";

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
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="aspect-[3/4] overflow-hidden bg-[#F7F5F2]">
                <img src={MASTER_PHOTO} alt="Мастер ПОСЛЕ" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
              <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>Мастер</p>
              <h2 className="font-light text-[#0E0E0E] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)" }}>
                Я создала ПОСЛЕ,<br />потому что хотела иначе
              </h2>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                Я работаю с животными больше 5 лет. Долгое время я видела, как груминг превращается в конвейер — быстро, много, без внимания к деталям.
              </p>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                ПОСЛЕ — это мой ответ на это. Камерный формат, где я знаю каждого питомца по имени, знаю его характер и особенности. Где результат важнее скорости.
              </p>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                Вокзальная магистраль, 16 — это не просто адрес. Это пространство, которое я создавала с мыслью о комфорте — и для питомцев, и для хозяев.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#F7F5F2]">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
            <h2 className="font-light text-[#0E0E0E]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)" }}>
              Как я работаю
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Один за раз", text: "Я принимаю одного питомца за раз. Никакого шума, никакого стресса от других животных." },
              { title: "Только профессиональная косметика", text: "Использую проверенные бренды, подобранные под тип шерсти и кожи каждого питомца." },
              { title: "Дневник каждого визита", text: "После каждой процедуры вы получаете карточку с фото до/после, заметками и рекомендациями." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }} className="bg-white p-8 border border-[#E8F0EC]">
                <p className="text-[#A8C5B5] text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>0{i + 1}</p>
                <h3 className="text-[#0E0E0E] font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px" }}>{item.title}</h3>
                <p className="text-[#0E0E0E]/60 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interior */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>Пространство</p>
              <h2 className="font-light text-[#0E0E0E] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)" }}>
                Место, где<br />хочется остаться
              </h2>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                Вокзальная магистраль, 16. Небольшое, аккуратное пространство без лишнего. Спокойно для животных, приятно для хозяев.
              </p>
              <Link href="/contacts" className="text-xs tracking-[0.2em] uppercase text-[#0E0E0E]/50 hover:text-[#0E0E0E] border-b border-[#0E0E0E]/20 hover:border-[#0E0E0E] pb-0.5 transition-all duration-200" style={{ fontFamily: "'Inter', sans-serif" }}>
                Как добраться
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={INTERIOR} alt="Интерьер ПОСЛЕ" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0E0E0E]">
        <div className="container text-center">
          <h2 className="text-white font-light mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)" }}>
            Запишитесь на первый визит
          </h2>
          <Link href="/booking" className="inline-block text-xs tracking-[0.2em] uppercase bg-[#A8C5B5] text-[#0E0E0E] px-10 py-4 hover:bg-[#C8DDD4] transition-all duration-300 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
            Записаться
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}

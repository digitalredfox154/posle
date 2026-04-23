import { motion } from "framer-motion";
import PublicLayout from "@/components/PublicLayout";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

const gallery = [
  {
    id: 1,
    before: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    after: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    label: "Золотистый ретривер",
  },
  {
    id: 2,
    before: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
    after: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&q=80",
    label: "Персидская кошка",
  },
  {
    id: 3,
    before: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    after: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    label: "Шпиц",
  },
  {
    id: 4,
    before: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
    after: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&q=80",
    label: "Мейн-кун",
  },
];

export default function Results() {
  return (
    <PublicLayout>
      <section className="bg-[#0E0E0E] py-24 md:py-32">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>Результаты</p>
            <h1 className="text-white font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 8vw, 96px)" }}>
              До и после
            </h1>
            <p className="text-white/40 text-sm mt-6 max-w-md" style={{ fontFamily: "'Inter', sans-serif" }}>
              Потяните разделитель на каждом фото, чтобы увидеть разницу
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {gallery.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.15 }}
              >
                <BeforeAfterSlider
                  beforeSrc={item.before}
                  afterSrc={item.after}
                  aspectRatio="4/3"
                />
                <p className="text-[#0E0E0E]/50 text-xs tracking-widest uppercase mt-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

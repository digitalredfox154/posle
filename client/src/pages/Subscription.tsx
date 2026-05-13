import { motion } from "framer-motion";
import PublicLayout from "@/components/PublicLayout";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Check } from "lucide-react";

const defaultPlans = [
  {
    id: 1,
    name: "Резидент",
    priceKopecks: 199000,
    intervalMonths: 1,
    description: "Для тех, кто хочет регулярный уход без лишних забот",
    features: JSON.stringify([
      "Приоритетная запись",
      "Скидка 10% на все услуги",
      "Напоминания о визите",
      "Дневник питомца с фото",
      "Персональные рекомендации",
    ]),
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Постоянный резидент",
    priceKopecks: 490000,
    intervalMonths: 3,
    description: "Максимальный приоритет и лучшие условия для постоянных клиентов",
    features: JSON.stringify([
      "Максимальный приоритет записи",
      "Скидка 20% на все услуги",
      "Напоминания о визите",
      "Дневник питомца с фото",
      "Персональные рекомендации",
      "Квартальный отчёт об уходе",
    ]),
    isActive: true,
    createdAt: new Date(),
  },
];

export default function Subscription() {
  const { data: plans } = trpc.subscriptions.plans.useQuery();
  const displayPlans = (plans && plans.length > 0) ? plans : defaultPlans;

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-[#0E0E0E] py-24 md:py-32">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>Клуб резидентов</p>
            <h1 className="text-white font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 8vw, 96px)" }}>
              Подписка
            </h1>
            <p className="text-white/40 text-sm mt-6 max-w-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
              Резиденты ПОСЛЕ — это постоянные клиенты, которых мы знаем по имени. Приоритет, особые условия, полное внимание.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {displayPlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className={`border p-8 flex flex-col ${i === 1 ? "border-[#0E0E0E] bg-[#0E0E0E]" : "border-[#E8F0EC] bg-[#F7F5F2]"}`}
              >
                <p className={`text-[10px] tracking-[0.3em] uppercase mb-4 ${i === 1 ? "text-[#A8C5B5]" : "text-[#A8C5B5]"}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                  {plan.name}
                </p>
                <p className={`font-light mb-2 ${i === 1 ? "text-white" : "text-[#0E0E0E]"}`} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "48px" }}>
                  {(plan.priceKopecks / 100).toLocaleString("ru-RU")} ₽
                </p>
                <p className={`text-xs mb-6 ${i === 1 ? "text-white/40" : "text-[#0E0E0E]/40"}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                  {plan.intervalMonths === 1 ? "в месяц" : `за ${plan.intervalMonths} месяца`}
                </p>
                <p className={`text-sm leading-relaxed mb-8 ${i === 1 ? "text-white/60" : "text-[#0E0E0E]/60"}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                  {plan.description}
                </p>
                <div className="flex flex-col gap-3 mb-10 flex-1">
                  {(JSON.parse(plan.features || "[]") as string[]).map((f: string) => (
                    <div key={f} className="flex items-center gap-3">
                      <Check size={14} className={i === 1 ? "text-[#A8C5B5]" : "text-[#A8C5B5]"} />
                      <span className={`text-xs ${i === 1 ? "text-white/70" : "text-[#0E0E0E]/70"}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/login"
                  className={`text-center text-xs tracking-[0.2em] uppercase py-4 transition-all duration-300 ${
                    i === 1
                      ? "bg-[#A8C5B5] text-[#0E0E0E] hover:bg-[#C8DDD4]"
                      : "bg-[#0E0E0E] text-white hover:bg-[#1a1a1a]"
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Стать резидентом
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#F7F5F2]">
        <div className="container max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12">
            <h2 className="font-light text-[#0E0E0E]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)" }}>
              Вопросы
            </h2>
          </motion.div>
          {[
            { q: "Как работает приоритетная запись?", a: "Резиденты видят свободные слоты раньше остальных и имеют возможность записаться на ближайшее удобное время." },
            { q: "Можно ли поставить подписку на паузу?", a: "Да, один раз в год можно приостановить подписку на срок до одного месяца." },
            { q: "Как отменить подписку?", a: "В любой момент через личный кабинет. Деньги за текущий период не возвращаются." },
            { q: "Подписка на одного питомца или на всех?", a: "Подписка оформляется на клиента и распространяется на всех его питомцев." },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="border-b border-[#E8F0EC] py-6">
              <p className="text-[#0E0E0E] font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px" }}>{item.q}</p>
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{item.a}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}

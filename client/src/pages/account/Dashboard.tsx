import AccountLayout from "@/components/AccountLayout";
import { trpc } from "@/lib/trpc";
import { useClientAuth } from "@/hooks/useClientAuth";
import { Link } from "wouter";
import { PawPrint, Calendar, CreditCard, ArrowRight } from "lucide-react";

export default function AccountDashboard() {
  const { client } = useClientAuth(true);
  const { data: pets } = trpc.pets.list.useQuery();
  const { data: subscription } = trpc.subscriptions.mySubscription.useQuery();
  const { data: nextAppointment } = trpc.visits.nextAppointment.useQuery();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Доброе утро";
    if (h < 18) return "Добрый день";
    return "Добрый вечер";
  };

  return (
    <AccountLayout>
      <div className="max-w-3xl">
        {/* Greeting */}
        <div className="mb-10">
          <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Личный кабинет
          </p>
          <h1 className="font-light text-[#0E0E0E]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)" }}>
            {greeting()}{client?.name ? `, ${client.name}` : ""}
          </h1>
        </div>

        {/* Next appointment banner */}
        {nextAppointment && (
          <div className="bg-[#F7FAF9] border border-[#E8F0EC] p-5 mb-8 flex items-center justify-between">
            <div>
              <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Ближайший визит</p>
              <p className="text-[#0E0E0E] font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px" }}>
                {new Date(nextAppointment.visitDate).toLocaleDateString("ru-RU", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}
              </p>
              {nextAppointment.serviceType && (
                <p className="text-[#0E0E0E]/40 text-xs mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{nextAppointment.serviceType}</p>
              )}
            </div>
            <Calendar size={18} className="text-[#A8C5B5]" />
          </div>
        )}

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <Link href="/booking" className="bg-[#0E0E0E] text-white p-6 flex flex-col gap-3 hover:bg-[#1a1a1a] transition-colors group">
            <Calendar size={20} className="text-[#A8C5B5]" />
            <p className="text-sm font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>Записаться</p>
            <ArrowRight size={14} className="text-white/40 group-hover:text-white/70 transition-colors" />
          </Link>
          <Link href="/account/pets" className="bg-white border border-[#E8F0EC] p-6 flex flex-col gap-3 hover:border-[#A8C5B5] transition-colors group">
            <PawPrint size={20} className="text-[#A8C5B5]" />
            <p className="text-sm font-light text-[#0E0E0E]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>
              Питомцы {pets ? `(${pets.length})` : ""}
            </p>
            <ArrowRight size={14} className="text-[#0E0E0E]/30 group-hover:text-[#0E0E0E]/60 transition-colors" />
          </Link>
          <Link href="/account/subscription" className="bg-white border border-[#E8F0EC] p-6 flex flex-col gap-3 hover:border-[#A8C5B5] transition-colors group">
            <CreditCard size={20} className="text-[#A8C5B5]" />
            <p className="text-sm font-light text-[#0E0E0E]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>
              {subscription?.status === "active" ? "Резидент" : "Подписка"}
            </p>
            <ArrowRight size={14} className="text-[#0E0E0E]/30 group-hover:text-[#0E0E0E]/60 transition-colors" />
          </Link>
        </div>

        {/* Subscription status */}
        {subscription?.status === "active" ? (
          <div className="bg-[#0E0E0E] p-6 mb-6 flex items-center justify-between">
            <div>
              <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Статус</p>
              <p className="text-white font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px" }}>Резидент ПОСЛЕ</p>
              {subscription.nextBillingAt && (
                <p className="text-white/40 text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Следующее списание: {new Date(subscription.nextBillingAt).toLocaleDateString("ru-RU")}
                </p>
              )}
            </div>
            <div className="w-2 h-2 rounded-full bg-[#A8C5B5]" />
          </div>
        ) : (
          <div className="bg-[#F7FAF9] border border-[#E8F0EC] p-6 mb-6 flex items-center justify-between">
            <div>
              <p className="text-[#0E0E0E]/40 text-[10px] tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Подписка</p>
              <p className="text-[#0E0E0E] font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px" }}>Вы не резидент</p>
            </div>
            <Link href="/subscription" className="text-xs tracking-[0.2em] uppercase text-[#A8C5B5] hover:text-[#0E0E0E] border-b border-[#A8C5B5] pb-0.5 transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
              Стать резидентом
            </Link>
          </div>
        )}

        {/* Pets preview */}
        {pets && pets.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#0E0E0E]/40 text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>Питомцы</p>
              <Link href="/account/pets" className="text-xs text-[#A8C5B5] hover:text-[#0E0E0E] transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                Все питомцы
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {pets.slice(0, 3).map((pet) => (
                <Link key={pet.id} href={`/account/pets/${pet.id}`} className="bg-white border border-[#E8F0EC] p-4 hover:border-[#A8C5B5] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#F7FAF9] flex items-center justify-center mb-3">
                    <PawPrint size={14} className="text-[#A8C5B5]" />
                  </div>
                  <p className="text-[#0E0E0E] text-sm font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>{pet.name}</p>
                  <p className="text-[#0E0E0E]/40 text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {pet.species === "dog" ? "Собака" : pet.species === "cat" ? "Кошка" : "Другое"}
                    {pet.breed ? ` · ${pet.breed}` : ""}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-dashed border-[#E8F0EC] p-8 text-center">
            <PawPrint size={24} className="text-[#A8C5B5] mx-auto mb-4" />
            <p className="text-[#0E0E0E]/60 text-sm mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              Добавьте питомца, чтобы вести дневник визитов
            </p>
            <Link href="/account/pets/new" className="text-xs tracking-[0.2em] uppercase text-[#A8C5B5] hover:text-[#0E0E0E] border-b border-[#A8C5B5] pb-0.5 transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
              Добавить питомца
            </Link>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}

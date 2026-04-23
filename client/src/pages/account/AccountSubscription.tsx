import { useState } from "react";
import AccountLayout from "@/components/AccountLayout";
import { trpc } from "@/lib/trpc";
import { useClientAuth } from "@/hooks/useClientAuth";
import { Link } from "wouter";
import { Check, CreditCard, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function AccountSubscription() {
  useClientAuth(true);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const utils = trpc.useUtils();
  const { data: subscription } = trpc.subscriptions.mySubscription.useQuery();
  const { data: plans } = trpc.subscriptions.plans.useQuery();
  const { data: payments } = trpc.subscriptions.paymentHistory.useQuery();

  const subscribe = trpc.subscriptions.subscribe.useMutation({
    onSuccess: () => {
      utils.subscriptions.mySubscription.invalidate();
      toast.success("Подписка оформлена. Добро пожаловать в клуб резидентов!");
    },
    onError: (e) => toast.error(e.message),
  });

  const cancel = trpc.subscriptions.cancel.useMutation({
    onSuccess: () => {
      utils.subscriptions.mySubscription.invalidate();
      setConfirmCancel(false);
      toast.success("Подписка отменена");
    },
    onError: (e) => toast.error(e.message),
  });

  const isActive = subscription?.status === "active";

  return (
    <AccountLayout>
      <div className="max-w-2xl">
        <div className="mb-10">
          <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Кабинет</p>
          <h1 className="font-light text-[#0E0E0E]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 40px)" }}>
            Подписка
          </h1>
        </div>

        {/* Current status */}
        {isActive ? (
          <div className="bg-[#0E0E0E] p-6 mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Активная подписка</p>
                <p className="text-white font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px" }}>
                  Резидент ПОСЛЕ
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#A8C5B5]" />
                <span className="text-[#A8C5B5] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>Активна</span>
              </div>
            </div>
            {subscription?.nextBillingAt && (
              <p className="text-white/40 text-xs mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                Следующее списание: {new Date(subscription.nextBillingAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            )}
            {!confirmCancel ? (
              <button
                onClick={() => setConfirmCancel(true)}
                className="text-white/30 text-xs tracking-[0.2em] uppercase hover:text-white/60 transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Отменить подписку
              </button>
            ) : (
              <div className="border border-white/20 p-4">
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle size={14} className="text-white/50 mt-0.5 flex-shrink-0" />
                  <p className="text-white/60 text-xs leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Подписка будет отменена. Деньги за текущий период не возвращаются. Вы уверены?
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => cancel.mutate({ subscriptionId: subscription!.id })}
                    disabled={cancel.isPending}
                    className="text-white/60 text-xs tracking-[0.2em] uppercase border border-white/20 px-4 py-2 hover:border-white/50 transition-colors disabled:opacity-50"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {cancel.isPending ? "Отменяем..." : "Да, отменить"}
                  </button>
                  <button
                    onClick={() => setConfirmCancel(false)}
                    className="text-white/40 text-xs tracking-[0.2em] uppercase px-4 py-2 hover:text-white/70 transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Назад
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-[#F7FAF9] border border-[#E8F0EC] p-6 mb-8">
            <p className="text-[#0E0E0E]/40 text-[10px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Статус</p>
            <p className="text-[#0E0E0E] font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px" }}>
              Подписка не активна
            </p>
            <p className="text-[#0E0E0E]/50 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              Оформите подписку, чтобы получить приоритетную запись и особые условия
            </p>
          </div>
        )}

        {/* Plans */}
        {!isActive && plans && plans.length > 0 && (
          <div className="mb-10">
            <p className="text-[#0E0E0E]/40 text-[10px] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>Тарифы</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {plans.map((plan, i) => (
                <div key={plan.id} className={`border p-6 flex flex-col ${i === 1 ? "border-[#0E0E0E]" : "border-[#E8F0EC]"}`}>
                  <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>{plan.name}</p>
                  <p className="font-light text-[#0E0E0E] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px" }}>
                    {(plan.priceKopecks / 100).toLocaleString("ru-RU")} ₽
                  </p>
                  <p className="text-[#0E0E0E]/40 text-xs mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {plan.intervalMonths === 1 ? "в месяц" : `за ${plan.intervalMonths} месяца`}
                  </p>
                  <div className="flex flex-col gap-2 mb-6 flex-1">
                    {(JSON.parse(plan.features || "[]") as string[]).map((f: string) => (
                      <div key={f} className="flex items-center gap-2">
                        <Check size={12} className="text-[#A8C5B5] flex-shrink-0" />
                        <span className="text-[#0E0E0E]/60 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => subscribe.mutate({ planId: plan.id })}
                    disabled={subscribe.isPending}
                    className={`text-xs tracking-[0.2em] uppercase py-3 transition-colors disabled:opacity-50 ${
                      i === 1 ? "bg-[#0E0E0E] text-white hover:bg-[#1a1a1a]" : "bg-[#A8C5B5] text-[#0E0E0E] hover:bg-[#C8DDD4]"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {subscribe.isPending ? "Оформляем..." : "Оформить"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment history */}
        {payments && payments.length > 0 && (
          <div>
            <p className="text-[#0E0E0E]/40 text-[10px] tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>История платежей</p>
            <div className="flex flex-col gap-2">
              {payments.map((payment) => (
                <div key={payment.id} className="bg-white border border-[#E8F0EC] px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-[#0E0E0E] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {new Date(payment.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                    <p className="text-[#0E0E0E]/40 text-xs capitalize" style={{ fontFamily: "'Inter', sans-serif" }}>{payment.status}</p>
                  </div>
                  <p className="text-[#0E0E0E] font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>
                    {(payment.amountKopecks / 100).toLocaleString("ru-RU")} ₽
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}

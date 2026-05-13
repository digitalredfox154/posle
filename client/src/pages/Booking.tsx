import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PublicLayout from "@/components/PublicLayout";
import { trpc } from "@/lib/trpc";
import { useClientAuth } from "@/hooks/useClientAuth";
import { toast } from "sonner";
import { Check, ChevronRight } from "lucide-react";

type Step = "service" | "datetime" | "confirm" | "done";

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  let d = digits;
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  let result = "+7";
  if (d.length > 1) result += " " + d.slice(1, 4);
  if (d.length > 4) result += " " + d.slice(4, 7);
  if (d.length > 7) result += "-" + d.slice(7, 9);
  if (d.length > 9) result += "-" + d.slice(9, 11);
  return result;
}

export default function Booking() {
  const { client } = useClientAuth(false);
  const [step, setStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clientName, setClientName] = useState(client?.name || "");
  const [clientPhone, setClientPhone] = useState(client?.phone || "");
  const [rawPhone, setRawPhone] = useState(client?.phone || "");
  const [comment, setComment] = useState("");
  const [bookingId, setBookingId] = useState<number | null>(null);

  const { data: services, isLoading: servicesLoading } = trpc.booking.services.useQuery();
  const { data: staff } = trpc.booking.staff.useQuery();
  const staffId = staff?.[0]?.id;

  // Get next 14 days
  const today = new Date();
  const dateFrom = today.toISOString().split("T")[0];
  const dateTo = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const { data: availableDates } = trpc.booking.availableDates.useQuery(
    { serviceId: selectedService?.id, staffId, dateFrom, dateTo },
    { enabled: !!selectedService?.id }
  );

  const { data: slots } = trpc.booking.availableSlots.useQuery(
    { serviceId: selectedService?.id, staffId, date: selectedDate },
    { enabled: !!selectedService?.id && !!selectedDate }
  );

  const createBooking = trpc.booking.createBooking.useMutation({
    onSuccess: (data) => {
      setBookingId(data.bookingId || null);
      setStep("done");
    },
    onError: (e) => toast.error(e.message),
  });

  const handleConfirm = () => {
    if (!selectedService || !selectedDate || !selectedTime) return;
    if (!clientName.trim() || !rawPhone) {
      toast.error("Заполните имя и телефон");
      return;
    }
    createBooking.mutate({
      serviceId: selectedService.id,
      staffId: staffId || 0,
      date: selectedDate,
      time: selectedTime,
      clientName: clientName.trim(),
      clientPhone: rawPhone,
      comment,
    });
  };

  const steps = [
    { id: "service", label: "Услуга" },
    { id: "datetime", label: "Дата и время" },
    { id: "confirm", label: "Подтверждение" },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-[#0E0E0E] py-16 md:py-24">
        <div className="container">
          <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>Запись</p>
          <h1 className="text-white font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 6vw, 72px)" }}>
            Онлайн-запись
          </h1>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="container max-w-xl">
          {step === "done" ? (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#A8C5B5]/20 flex items-center justify-center mx-auto mb-6">
                <Check size={24} className="text-[#A8C5B5]" />
              </div>
              <h2 className="font-light text-[#0E0E0E] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px" }}>
                Запись создана
              </h2>
              <p className="text-[#0E0E0E]/50 text-sm mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                {selectedService?.title} · {selectedDate} · {selectedTime}
              </p>
              <p className="text-[#0E0E0E]/40 text-xs mb-10" style={{ fontFamily: "'Inter', sans-serif" }}>
                Ожидайте SMS-подтверждения на номер {formatPhone(rawPhone)}
              </p>
              <button
                onClick={() => { setStep("service"); setSelectedService(null); setSelectedDate(""); setSelectedTime(""); }}
                className="text-xs tracking-[0.2em] uppercase text-[#A8C5B5] hover:text-[#0E0E0E] border-b border-[#A8C5B5] pb-0.5 transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Записаться ещё раз
              </button>
            </motion.div>
          ) : (
            <>
              {/* Steps indicator */}
              <div className="flex items-center gap-0 mb-10">
                {steps.map((s, i) => (
                  <div key={s.id} className="flex items-center flex-1">
                    <div className={`flex items-center gap-2 ${step === s.id ? "opacity-100" : "opacity-40"}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        steps.findIndex(x => x.id === step) > i
                          ? "bg-[#A8C5B5] text-[#0E0E0E]"
                          : step === s.id
                          ? "bg-[#0E0E0E] text-white"
                          : "bg-[#E8F0EC] text-[#0E0E0E]/40"
                      }`} style={{ fontFamily: "'Inter', sans-serif" }}>
                        {steps.findIndex(x => x.id === step) > i ? <Check size={10} /> : i + 1}
                      </div>
                      <span className="text-[10px] tracking-widest uppercase text-[#0E0E0E]/60 hidden sm:block" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {s.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && <div className="flex-1 h-px bg-[#E8F0EC] mx-3" />}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* Step 1: Service */}
                {step === "service" && (
                  <motion.div key="service" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <h2 className="font-light text-[#0E0E0E] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px" }}>
                      Выберите услугу
                    </h2>
                    {servicesLoading ? (
                      <div className="flex flex-col gap-3">
                        {[1, 2, 3].map(i => <div key={i} className="h-16 bg-[#F7FAF9] animate-pulse" />)}
                      </div>
                    ) : services && services.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        {services.map((svc) => (
                          <button
                            key={svc.id}
                            onClick={() => { setSelectedService(svc); setStep("datetime"); }}
                            className="w-full text-left border border-[#E8F0EC] p-5 flex items-center justify-between hover:border-[#A8C5B5] transition-colors group"
                          >
                            <div>
                              <p className="text-[#0E0E0E] font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px" }}>{svc.title}</p>
                              <p className="text-[#0E0E0E]/40 text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                                {svc.price_min ? `от ${svc.price_min.toLocaleString("ru-RU")} ₽` : ""}
                                {svc.duration ? ` · ${svc.duration} мин` : ""}
                              </p>
                            </div>
                            <ChevronRight size={16} className="text-[#0E0E0E]/20 group-hover:text-[#A8C5B5] transition-colors" />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-[#F7FAF9] border border-[#E8F0EC] p-8 text-center">
                        <p className="text-[#0E0E0E]/50 text-sm mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Онлайн-запись временно недоступна
                        </p>
                        <p className="text-[#0E0E0E]/30 text-xs mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Запишитесь по телефону или в Telegram
                        </p>
                        <a href="tel:+79130187219" className="text-xs tracking-[0.2em] uppercase text-[#A8C5B5] hover:text-[#0E0E0E] border-b border-[#A8C5B5] pb-0.5 transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                          +7 913 018-72-19
                        </a>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 2: Date & Time */}
                {step === "datetime" && (
                  <motion.div key="datetime" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <button onClick={() => setStep("service")} className="text-[#0E0E0E]/40 text-xs tracking-widest uppercase mb-6 hover:text-[#0E0E0E] transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                      ← Назад
                    </button>
                    <h2 className="font-light text-[#0E0E0E] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px" }}>
                      Дата и время
                    </h2>
                    <p className="text-[#0E0E0E]/40 text-xs mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Услуга: {selectedService?.title}
                    </p>

                    {/* Dates */}
                    <div className="mb-6">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/40 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Дата</p>
                      {availableDates && availableDates.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {availableDates.map((date) => (
                            <button
                              key={date}
                              onClick={() => { setSelectedDate(date); setSelectedTime(""); }}
                              className={`px-4 py-2 text-xs transition-all duration-200 ${
                                selectedDate === date
                                  ? "bg-[#0E0E0E] text-white"
                                  : "border border-[#E8F0EC] text-[#0E0E0E]/60 hover:border-[#A8C5B5]"
                              }`}
                              style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                              {new Date(date).toLocaleDateString("ru-RU", { day: "numeric", month: "short" })}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[#0E0E0E]/40 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Нет доступных дат</p>
                      )}
                    </div>

                    {/* Times */}
                    {selectedDate && (
                      <div className="mb-8">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/40 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Время</p>
                        {slots && slots.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {slots.map((slot) => (
                              <button
                                key={slot.time}
                                onClick={() => setSelectedTime(slot.time)}
                                className={`px-4 py-2 text-xs transition-all duration-200 ${
                                  selectedTime === slot.time
                                    ? "bg-[#0E0E0E] text-white"
                                    : "border border-[#E8F0EC] text-[#0E0E0E]/60 hover:border-[#A8C5B5]"
                                }`}
                                style={{ fontFamily: "'Inter', sans-serif" }}
                              >
                                {slot.time}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[#0E0E0E]/40 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Нет свободных слотов</p>
                        )}
                      </div>
                    )}

                    <button
                      onClick={() => setStep("confirm")}
                      disabled={!selectedDate || !selectedTime}
                      className="w-full bg-[#0E0E0E] text-white text-xs tracking-[0.2em] uppercase py-4 hover:bg-[#1a1a1a] transition-colors disabled:opacity-40"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Продолжить
                    </button>
                  </motion.div>
                )}

                {/* Step 3: Confirm */}
                {step === "confirm" && (
                  <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <button onClick={() => setStep("datetime")} className="text-[#0E0E0E]/40 text-xs tracking-widest uppercase mb-6 hover:text-[#0E0E0E] transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                      ← Назад
                    </button>
                    <h2 className="font-light text-[#0E0E0E] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px" }}>
                      Подтверждение
                    </h2>

                    {/* Summary */}
                    <div className="bg-[#F7FAF9] border border-[#E8F0EC] p-5 mb-6">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                          <span className="text-[#0E0E0E]/40 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>Услуга</span>
                          <span className="text-[#0E0E0E] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>{selectedService?.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#0E0E0E]/40 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>Дата</span>
                          <span className="text-[#0E0E0E] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {new Date(selectedDate).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#0E0E0E]/40 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>Время</span>
                          <span className="text-[#0E0E0E] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>{selectedTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact form */}
                    <div className="flex flex-col gap-4 mb-6">
                      <div>
                        <label className="block text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/40 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Ваше имя *</label>
                        <input
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full border border-[#E8F0EC] bg-[#F7FAF9] px-4 py-3 text-[#0E0E0E] text-sm focus:outline-none focus:border-[#A8C5B5] transition-colors"
                          placeholder="Имя"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/40 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Телефон *</label>
                        <input
                          type="tel"
                          value={formatPhone(rawPhone)}
                          onChange={(e) => setRawPhone(e.target.value.replace(/\D/g, ""))}
                          className="w-full border border-[#E8F0EC] bg-[#F7FAF9] px-4 py-3 text-[#0E0E0E] text-sm focus:outline-none focus:border-[#A8C5B5] transition-colors"
                          placeholder="+7 999 000-00-00"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/40 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Комментарий</label>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full border border-[#E8F0EC] bg-[#F7FAF9] px-4 py-3 text-[#0E0E0E] text-sm focus:outline-none focus:border-[#A8C5B5] transition-colors resize-none"
                          placeholder="Порода, пожелания..."
                          rows={3}
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleConfirm}
                      disabled={createBooking.isPending}
                      className="w-full bg-[#0E0E0E] text-white text-xs tracking-[0.2em] uppercase py-4 hover:bg-[#1a1a1a] transition-colors disabled:opacity-50"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {createBooking.isPending ? "Создаём запись..." : "Записаться"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}

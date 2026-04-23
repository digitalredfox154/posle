import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Link } from "wouter";

type Step = "phone" | "code";

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 0) return "";
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

export default function Login() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [rawPhone, setRawPhone] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [testCode, setTestCode] = useState<string | null>(null);

  const sendCode = trpc.posleClient.sendCode.useMutation({
    onSuccess: (data) => {
      setStep("code");
      if (data.testCode) {
        setTestCode(data.testCode);
        toast.info(`Тестовый режим: код ${data.testCode}`, { duration: 30000 });
      } else {
        toast.success("Код отправлен");
      }
      setTimeout(() => codeRefs.current[0]?.focus(), 100);
    },
    onError: (e) => toast.error(e.message),
  });

  const verifyCode = trpc.posleClient.verifyCode.useMutation({
    onSuccess: () => {
      toast.success("Добро пожаловать!");
      setLocation("/account");
    },
    onError: (e) => toast.error(e.message),
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setRawPhone(raw);
    setPhone(formatPhone(raw));
  };

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = rawPhone.replace(/\D/g, "");
    if (digits.length < 10) {
      toast.error("Введите корректный номер телефона");
      return;
    }
    sendCode.mutate({ phone: digits });
  };

  const handleCodeInput = (index: number, value: string) => {
    const char = value.replace(/\D/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = char;
    setCode(newCode);
    if (char && index < 5) {
      codeRefs.current[index + 1]?.focus();
    }
    if (newCode.every((c) => c !== "") && newCode.join("").length === 6) {
      const digits = rawPhone.replace(/\D/g, "");
      verifyCode.mutate({ phone: digits, code: newCode.join("") });
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      const newCode = pasted.split("");
      setCode(newCode);
      const digits = rawPhone.replace(/\D/g, "");
      verifyCode.mutate({ phone: digits, code: pasted });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full bg-[#0E0E0E]">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-white font-light tracking-[0.15em]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px" }}>
            ПОСЛЕ
          </Link>
        </div>
      </header>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            {step === "phone" ? (
              <motion.div key="phone" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}>
                <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>Вход</p>
                <h1 className="font-light text-[#0E0E0E] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "40px" }}>
                  Личный кабинет
                </h1>
                <p className="text-[#0E0E0E]/50 text-sm mb-10" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Введите номер телефона — мы отправим код подтверждения
                </p>
                <form onSubmit={handleSendCode} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/40 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Телефон
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="+7 999 000-00-00"
                      className="w-full border border-[#E8F0EC] bg-[#F7FAF9] px-4 py-3 text-[#0E0E0E] text-sm focus:outline-none focus:border-[#A8C5B5] transition-colors"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sendCode.isPending}
                    className="w-full bg-[#0E0E0E] text-white text-xs tracking-[0.2em] uppercase py-4 hover:bg-[#1a1a1a] transition-all duration-300 disabled:opacity-50"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {sendCode.isPending ? "Отправляем..." : "Получить код"}
                  </button>
                </form>
                <p className="text-[#0E0E0E]/30 text-xs mt-6 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Нажимая «Получить код», вы соглашаетесь с{" "}
                  <Link href="/privacy" className="underline hover:text-[#0E0E0E]/60 transition-colors">политикой конфиденциальности</Link>
                </p>
              </motion.div>
            ) : (
              <motion.div key="code" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}>
                <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>Подтверждение</p>
                <h1 className="font-light text-[#0E0E0E] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "40px" }}>
                  Введите код
                </h1>
                <p className="text-[#0E0E0E]/50 text-sm mb-10" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Отправили SMS на {phone}
                </p>
                {testCode && (
                  <div className="mb-6 p-4 bg-[#F7FAF9] border border-[#A8C5B5] text-center">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#A8C5B5] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Тестовый режим</p>
                    <p className="text-[#0E0E0E] text-3xl font-light tracking-[0.3em]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{testCode}</p>
                  </div>
                )}
                <div className="flex gap-3 mb-8" onPaste={handleCodePaste}>
                  {code.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { codeRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeInput(i, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(i, e)}
                      className="w-full aspect-square border border-[#E8F0EC] bg-[#F7FAF9] text-center text-[#0E0E0E] text-xl font-light focus:outline-none focus:border-[#A8C5B5] transition-colors"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    />
                  ))}
                </div>
                {verifyCode.isPending && (
                  <p className="text-[#A8C5B5] text-xs text-center mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>Проверяем...</p>
                )}
                <button
                  onClick={() => {
                    setStep("phone");
                    setCode(["", "", "", "", "", ""]);
                  }}
                  className="w-full text-[#0E0E0E]/40 text-xs tracking-[0.2em] uppercase py-3 hover:text-[#0E0E0E]/70 transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Изменить номер
                </button>
                <button
                  onClick={() => sendCode.mutate({ phone: rawPhone })}
                  disabled={sendCode.isPending}
                  className="w-full text-[#A8C5B5] text-xs tracking-[0.2em] uppercase py-2 hover:text-[#0E0E0E] transition-colors disabled:opacity-50"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Отправить повторно
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

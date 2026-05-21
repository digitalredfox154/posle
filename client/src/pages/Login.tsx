import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Link } from "wouter";

type Step = "email" | "code";

export default function Login() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [testCode, setTestCode] = useState<string | null>(null);

  const sendCode = trpc.posleClient.sendEmailCode.useMutation({
    onSuccess: (data: { success: boolean; message: string; testCode?: string }) => {
      setStep("code");
      if (data.testCode) {
        setTestCode(data.testCode);
        toast.info(`Тестовый режим: код ${data.testCode}`, { duration: 30000 });
      } else {
        toast.success("Код отправлен на почту");
      }
      setTimeout(() => codeRefs.current[0]?.focus(), 100);
    },
    onError: (e: { message: string }) => toast.error(e.message),
  });

  const utils = trpc.useUtils();

  const verifyCode = trpc.posleClient.verifyEmailCode.useMutation({
    onSuccess: async () => {
      toast.success("Добро пожаловать!");
      // Refresh me query to check isAdmin
      await utils.posleClient.me.invalidate();
      const me = await utils.posleClient.me.fetch();
      if ((me as any)?.isAdmin) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/account";
      }
    },
    onError: (e: { message: string }) => toast.error(e.message),
  });

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Введите корректный email");
      return;
    }
    sendCode.mutate({ email });
  };

  const handleCodeInput = (index: number, value: string) => {
    const char = value.replace(/\D/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = char;
    setCode(newCode);
    if (char && index < 5) codeRefs.current[index + 1]?.focus();
    if (newCode.every((c) => c !== "") && newCode.join("").length === 6) {
      verifyCode.mutate({ email, code: newCode.join("") });
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
      verifyCode.mutate({ email, code: pasted });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(135deg, #0E0E0E 0%, #141414 50%, #0a0a0a 100%)",
      }}
    >
      {/* Header */}
      <header className="w-full border-b border-white/5">
        <div className="container flex items-center justify-between h-16">
          <Link
            href="/"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "22px",
              fontWeight: 300,
              letterSpacing: "0.2em",
              color: "#F5F0E8",
            }}
          >
            ПОСЛЕ
          </Link>
          <Link
            href="/"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "rgba(245,240,232,0.4)",
              textTransform: "uppercase",
            }}
          >
            ← На сайт
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Decorative top line */}
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "#A8C5B5",
              marginBottom: "32px",
            }}
          />

          <AnimatePresence mode="wait">
            {step === "email" ? (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "#A8C5B5",
                    marginBottom: "16px",
                  }}
                >
                  Личный кабинет
                </p>
                <h1
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(36px, 8vw, 52px)",
                    fontWeight: 300,
                    color: "#F5F0E8",
                    lineHeight: 1.1,
                    marginBottom: "12px",
                  }}
                >
                  Войти
                </h1>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    color: "rgba(245,240,232,0.45)",
                    marginBottom: "40px",
                    lineHeight: 1.6,
                  }}
                >
                  Введите email — мы отправим код подтверждения
                </p>

                <form onSubmit={handleSendCode} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(245,240,232,0.35)",
                        marginBottom: "8px",
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      autoComplete="email"
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(168,197,181,0.2)",
                        padding: "14px 16px",
                        color: "#F5F0E8",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        outline: "none",
                        transition: "border-color 0.3s",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#A8C5B5")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(168,197,181,0.2)")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sendCode.isPending}
                    className="btn-mint"
                    style={{
                      width: "100%",
                      padding: "16px",
                      fontSize: "11px",
                      letterSpacing: "0.25em",
                      cursor: sendCode.isPending ? "not-allowed" : "pointer",
                      opacity: sendCode.isPending ? 0.6 : 1,
                    }}
                  >
                    {sendCode.isPending ? "Отправляем..." : "Получить код"}
                  </button>
                </form>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    color: "rgba(245,240,232,0.25)",
                    marginTop: "24px",
                    lineHeight: 1.6,
                  }}
                >
                  Нажимая «Получить код», вы соглашаетесь с{" "}
                  <Link href="/privacy" style={{ color: "rgba(168,197,181,0.6)", textDecoration: "underline" }}>
                    политикой конфиденциальности
                  </Link>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "#A8C5B5",
                    marginBottom: "16px",
                  }}
                >
                  Подтверждение
                </p>
                <h1
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(36px, 8vw, 52px)",
                    fontWeight: 300,
                    color: "#F5F0E8",
                    lineHeight: 1.1,
                    marginBottom: "12px",
                  }}
                >
                  Введите код
                </h1>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    color: "rgba(245,240,232,0.45)",
                    marginBottom: "32px",
                    lineHeight: 1.6,
                  }}
                >
                  Отправили на <span style={{ color: "#A8C5B5" }}>{email}</span>
                </p>

                {testCode && (
                  <div
                    style={{
                      marginBottom: "24px",
                      padding: "16px",
                      background: "rgba(168,197,181,0.08)",
                      border: "1px solid rgba(168,197,181,0.3)",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#A8C5B5",
                        marginBottom: "8px",
                      }}
                    >
                      Тестовый режим
                    </p>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "36px",
                        fontWeight: 300,
                        letterSpacing: "0.4em",
                        color: "#F5F0E8",
                      }}
                    >
                      {testCode}
                    </p>
                  </div>
                )}

                <div
                  style={{ display: "flex", gap: "10px", marginBottom: "32px" }}
                  onPaste={handleCodePaste}
                >
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
                      style={{
                        flex: 1,
                        aspectRatio: "1",
                        background: "rgba(255,255,255,0.04)",
                        border: digit ? "1px solid #A8C5B5" : "1px solid rgba(168,197,181,0.2)",
                        color: "#F5F0E8",
                        textAlign: "center",
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "24px",
                        fontWeight: 300,
                        outline: "none",
                        transition: "border-color 0.2s",
                      }}
                    />
                  ))}
                </div>

                {verifyCode.isPending && (
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                      color: "#A8C5B5",
                      textAlign: "center",
                      marginBottom: "16px",
                    }}
                  >
                    Проверяем...
                  </p>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <button
                    onClick={() => { setStep("email"); setCode(["", "", "", "", "", ""]); }}
                    style={{
                      background: "none",
                      border: "none",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "11px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(245,240,232,0.35)",
                      cursor: "pointer",
                      padding: "12px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.7)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.35)")}
                  >
                    Изменить email
                  </button>
                  <button
                    onClick={() => sendCode.mutate({ email })}
                    disabled={sendCode.isPending}
                    style={{
                      background: "none",
                      border: "none",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "11px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: sendCode.isPending ? "rgba(168,197,181,0.3)" : "rgba(168,197,181,0.6)",
                      cursor: sendCode.isPending ? "not-allowed" : "pointer",
                      padding: "8px",
                      transition: "color 0.2s",
                    }}
                  >
                    Отправить повторно
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom decoration */}
      <div
        style={{
          padding: "24px",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(245,240,232,0.15)",
          }}
        >
          ПОСЛЕ — Селективный груминг
        </p>
      </div>
    </div>
  );
}

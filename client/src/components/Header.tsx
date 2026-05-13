import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { trpc } from "@/lib/trpc";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О сервисе" },
  { href: "/results", label: "Результаты" },
  { href: "/subscription", label: "Подписка" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { data: clientData } = trpc.posleClient.me.useQuery();

  return (
    <header className="w-full bg-[#0E0E0E] text-white sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className="font-display text-2xl md:text-3xl font-light tracking-[0.15em] text-white transition-colors duration-400"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              transition: "color 0.4s ease, letter-spacing 0.4s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#A8C5B5";
              (e.currentTarget as HTMLElement).style.letterSpacing = "0.2em";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#ffffff";
              (e.currentTarget as HTMLElement).style.letterSpacing = "0.15em";
            }}
          >
            ПОСЛЕ
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 300,
                color: location === link.href ? "#A8C5B5" : "rgba(255,255,255,0.7)",
                transition: "color 0.3s ease",
                paddingBottom: "2px",
              }}
              onMouseEnter={(e) => {
                if (location !== link.href)
                  (e.currentTarget as HTMLElement).style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                if (location !== link.href)
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          {clientData ? (
            <Link
              href="/account"
              className="btn-outline-light text-xs tracking-widest uppercase px-4 py-2"
              style={{ fontFamily: "'Inter', sans-serif", borderColor: "rgba(168,197,181,0.6)", color: "#A8C5B5" }}
            >
              Кабинет
            </Link>
          ) : (
            <Link
              href="/login"
              className="btn-outline-light text-xs tracking-widest uppercase px-4 py-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Войти
            </Link>
          )}
          <Link
            href="/booking"
            className="btn-mint text-xs tracking-widest uppercase px-5 py-2 font-medium"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Записаться
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white p-1 transition-colors duration-200 hover:text-[#A8C5B5]"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden bg-[#0E0E0E] border-t border-white/10 px-4 pb-6 pt-4 flex flex-col gap-4"
          style={{ animation: "fadeInDown 0.2s ease" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-sm tracking-widest uppercase py-2 border-b border-white/10 transition-colors duration-200 ${
                location === link.href ? "text-[#A8C5B5]" : "text-white/70 hover:text-white"
              }`}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-2">
            {clientData ? (
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="text-center text-xs tracking-widest uppercase border border-[#A8C5B5] text-[#A8C5B5] py-3 transition-all duration-200 hover:bg-[#A8C5B5]/10"
              >
                Личный кабинет
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-center text-xs tracking-widest uppercase border border-white/30 text-white/70 py-3 transition-all duration-200 hover:border-white/60 hover:text-white"
              >
                Войти
              </Link>
            )}
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="btn-mint text-center text-xs tracking-widest uppercase py-3 font-medium"
            >
              Записаться
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

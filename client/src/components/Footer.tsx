import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="w-full bg-[#080808] text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span
              className="font-display text-2xl font-light tracking-[0.15em]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              ПОСЛЕ
            </span>
            <p className="text-white/50 text-xs leading-relaxed tracking-wide max-w-[220px]"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              Камерный груминг-сервис для тех, кто ценит результат, вкус и атмосферу.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-1"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              Навигация
            </p>
            {[
              { href: "/", label: "Главная" },
              { href: "/about", label: "О сервисе" },
              { href: "/results", label: "Результаты" },
              { href: "/subscription", label: "Подписка" },
              { href: "/contacts", label: "Контакты" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/60 hover:text-white text-xs tracking-wider uppercase transition-colors"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contacts */}
          <div className="flex flex-col gap-3">
            <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-1"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              Контакты
            </p>
            <a
              href="tel:+79130187219"
              className="text-white/60 hover:text-white text-xs tracking-wide transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              +7 913 018-72-19
            </a>
            <p className="text-white/60 text-xs tracking-wide"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              Вокзальная магистраль, 16<br />Новосибирск
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#A8C5B5] transition-colors text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Telegram
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#A8C5B5] transition-colors text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="text-white/25 text-[10px] tracking-wider"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            © {new Date().getFullYear()} ПОСЛЕ. Все права защищены.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-white/25 hover:text-white/50 text-[10px] tracking-wider transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              Политика конфиденциальности
            </Link>
            <Link href="/offer" className="text-white/25 hover:text-white/50 text-[10px] tracking-wider transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              Оферта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

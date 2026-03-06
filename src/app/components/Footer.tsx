import { PawPrint, Heart } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-10 px-4 border-t transition-colors duration-300"
      style={{
        background: "var(--fur-footer-bg)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 text-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
            style={{ background: "var(--fur-grad)" }}
          >
            <PawPrint size={18} />
          </span>
          <span
            className="font-black text-xl"
            style={{ color: "var(--fur-green-light)" }}
          >
            Sidney Furdog
          </span>
        </div>

        {/* Tagline */}
        <p className="text-sm" style={{ color: "var(--fur-footer-text)" }}>
          🐾 Berliner Furry · Dabei seit Sommer 2025 · Lieblingsfarbe: Grün 💚
        </p>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 text-xs" style={{ color: "var(--fur-footer-text)" }}>
          {[
            { href: "#about", label: "Über mich" },
            { href: "#events", label: "Events" },
            { href: "#social", label: "Social Media" },
          ].map((l, i, arr) => (
            <>
              <button
                key={l.href}
                onClick={() => document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" })}
                className="hover:text-white transition-colors"
              >
                {l.label}
              </button>
              {i < arr.length - 1 && <span key={`sep-${i}`}>·</span>}
            </>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }} />

        {/* Copyright */}
        <p className="text-xs flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.25)" }}>
          © {year} Sidney Furdog · Gemacht mit{" "}
          <Heart size={12} className="inline" style={{ color: "var(--fur-green-light)" }} />{" "}
          und vielen 🐾
        </p>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
          Eventdaten werden aus einer XML-Datei geladen · Dark/Light Mode verfügbar
        </p>
      </div>
    </footer>
  );
}

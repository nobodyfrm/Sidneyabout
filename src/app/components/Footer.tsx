import { PawPrint, Heart } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-10 px-4 border-t"
      style={{
        background: "linear-gradient(135deg, #1A1225 0%, #2D1B45 100%)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 text-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
            style={{
              background: "linear-gradient(135deg, var(--fur-orange), var(--fur-purple))",
            }}
          >
            <PawPrint size={18} />
          </span>
          <span
            className="font-black text-xl"
            style={{ color: "var(--fur-orange)" }}
          >
            Sidney Furdog
          </span>
        </div>

        {/* Tagline */}
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          🐾 Berliner Furry · Dabei seit Sommer 2025
        </p>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          <button
            onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            className="hover:text-white transition-colors"
          >
            Über mich
          </button>
          <span>·</span>
          <button
            onClick={() => document.querySelector("#events")?.scrollIntoView({ behavior: "smooth" })}
            className="hover:text-white transition-colors"
          >
            Events
          </button>
          <span>·</span>
          <button
            onClick={() => document.querySelector("#social")?.scrollIntoView({ behavior: "smooth" })}
            className="hover:text-white transition-colors"
          >
            Social Media
          </button>
        </div>

        {/* Divider */}
        <div className="w-full border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }} />

        {/* Copyright */}
        <p className="text-xs flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>
          © {year} Sidney Furdog · Gemacht mit{" "}
          <Heart size={12} className="inline" style={{ color: "var(--fur-orange)" }} />{" "}
          und vielen 🐾
        </p>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          Eventdaten werden aus einer XML-Datei geladen.
        </p>
      </div>
    </footer>
  );
}

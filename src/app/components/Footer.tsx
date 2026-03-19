import { PawPrint, Heart } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-10 px-4 border-t"
      style={{
        background: "var(--color-bg-neutral)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto flex flex-col items-center gap-4 text-center" style={{ maxWidth: "var(--max-content-width)" }}>
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
            style={{
              background: "var(--color-primary)",
            }}
          >
            <PawPrint size={18} />
          </span>
          <span
            className="font-black text-xl"
            style={{ color: "var(--color-primary)" }}
          >
            Sidney Furdog
          </span>
        </div>

        {/* Tagline */}
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          🐾 Berliner Furry · Dabei seit Sommer 2025
        </p>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 text-xs" style={{ color: "var(--color-text-muted)" }}>
          <button
            onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            className="transition-colors"
            style={{ color: "var(--color-text-muted)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-primary)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}
          >
            Über mich
          </button>
          <span>·</span>
          <button
            onClick={() => document.querySelector("#social")?.scrollIntoView({ behavior: "smooth" })}
            className="transition-colors"
            style={{ color: "var(--color-text-muted)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-primary)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}
          >
            Social Media
          </button>
          <span>·</span>
          <button
            onClick={() => document.querySelector("#events")?.scrollIntoView({ behavior: "smooth" })}
            className="transition-colors"
            style={{ color: "var(--color-text-muted)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-primary)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}
          >
            Events
          </button>
          <span>·</span>
          <button
            onClick={() => document.querySelector("#fursuit")?.scrollIntoView({ behavior: "smooth" })}
            className="transition-colors"
            style={{ color: "var(--color-text-muted)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-primary)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}
          >
            Fursuit
          </button>
          <span>·</span>
          <a
            href="https://forum.queerpoint.net/about"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: "var(--color-text-muted)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-primary)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}
          >
            Impressum
          </a>
        </div>

        {/* Divider */}
        <div className="w-full border-t" style={{ borderColor: "var(--color-border)" }} />

        {/* Copyright */}
        <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--color-text-muted)" }}>
          © {year} Sidney Furdog · Gemacht mit{" "}
          <Heart size={12} className="inline" style={{ color: "var(--color-primary)" }} />{" "}
          und vielen 🐾
        </p>
      </div>
    </footer>
  );
}
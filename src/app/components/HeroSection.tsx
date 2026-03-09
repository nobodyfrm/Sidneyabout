import { useEffect, useState, useMemo } from "react";
import { MapPin, Calendar, Star, PawPrint } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Event } from "./EventsSection";
import fursonaImg from "../../assets/sidney_head_gemalt.png";

interface HeroProps {
  eventCount: number;
  events?: Event[];
}

const PAWS = [
  { top: "10%", left: "5%", size: 28, rotate: -20, opacity: 0.12 },
  { top: "20%", right: "8%", size: 20, rotate: 40, opacity: 0.1 },
  { top: "55%", left: "3%", size: 24, rotate: 15, opacity: 0.08 },
  { top: "70%", right: "5%", size: 32, rotate: -35, opacity: 0.1 },
  { top: "85%", left: "12%", size: 18, rotate: 5, opacity: 0.07 },
  { top: "40%", right: "15%", size: 22, rotate: 60, opacity: 0.08 },
];

export function HeroSection({ eventCount, events }: HeroProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const { firstEvent, countries, conventions } = useMemo(() => {
    if (!events || events.length === 0) {
      return {
        firstEvent: "Berliner Furry-Sommerfest",
        countries: 0,
        conventions: 0,
      };
    }

    // Get first event by filtering events with firstType="event"
    const firstEventItem = events.find(e => e.firstType === "event");
    const firstEventName = firstEventItem ? firstEventItem.name : events[0]?.name || "Berliner Furry-Sommerfest";

    // Count unique countries
    const uniqueCities = new Set(events.map(e => e.city));
    const countryNames = new Set<string>();
    uniqueCities.forEach(city => {
      if (city.includes("Malmö") || city.includes("Schweden")) {
        countryNames.add("Schweden");
      } else {
        countryNames.add("Deutschland");
      }
    });

    // Count conventions
    const conventionCount = events.filter(e => e.type === "Convention").length;

    return {
      firstEvent: firstEventName,
      countries: countryNames.size,
      conventions: conventionCount,
    };
  }, [events]);

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14 transition-colors duration-300"
      style={{ background: "var(--fur-grad-hero)" }}
    >
      {/* Decorative paw prints */}
      {PAWS.map((p, i) => (
        <div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            top: p.top,
            left: (p as any).left,
            right: (p as any).right,
            opacity: p.opacity,
            transform: `rotate(${p.rotate}deg)`,
            fontSize: p.size,
          }}
        >
          🐾
        </div>
      ))}

      {/* Glow blobs */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-300"
        style={{ background: "var(--fur-green)" }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none transition-all duration-300"
        style={{ background: "var(--fur-green-2)" }}
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "var(--fur-lime)" }}
      />

      <div className="relative z-10 max-w-2xl w-full px-4 py-12 flex flex-col items-center text-center">

        {/* ── Avatar ── */}
        <div
          className={`mb-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative inline-block">
            {/* Outer glow ring */}
            <div
              className="absolute -inset-1.5 rounded-3xl blur-md opacity-50"
              style={{ background: "var(--fur-grad)" }}
            />
            {/* Image frame */}
            <div
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden shadow-2xl"
              style={{
                border: "3px solid var(--fur-green)",
                boxShadow: "0 0 0 6px var(--fur-border-strong), 0 20px 40px var(--fur-shadow)",
              }}
            >
              <img
                src={fursonaImg}
                alt="Sidney Furdog – mein Fursona"
                className="w-full h-full object-cover object-center"
                style={{ imageRendering: "crisp-edges" }}
              />
            </div>
            {/* Badge */}
            <span
              className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg"
              style={{ background: "var(--fur-grad)" }}
            >
              <PawPrint size={16} />
            </span>
          </div>
        </div>

        {/* ── Name + intro ── */}
        <div
          className={`transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4 border"
            style={{
              background: "var(--fur-border)",
              borderColor: "var(--fur-border-strong)",
              color: "var(--fur-green)",
            }}
          >
            <span>🐾</span>
            <span>Furry seit Sommer 2025</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl mb-2"
            style={{
              fontWeight: 900,
              background: "var(--fur-grad)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Sidney Furdog
          </h1>
          <p
            className="text-lg sm:text-xl mb-1"
            style={{ color: "var(--fur-text-sub)", fontWeight: 700 }}
          >
            Hallo, ich bin Sidney! 👋
          </p>
          <p
            className="text-sm sm:text-base max-w-md mx-auto mb-8"
            style={{ color: "var(--fur-muted)" }}
          >
            Berliner Furry, begeisterter Teilnehmer an Walks, Conventions und
            Community-Events. Seit dem Berliner Furry-Sommerfest 2025 bin ich
            ein fester Teil der Furry-Familie! 🐾✨
          </p>
        </div>

        {/* ── Info chips ── */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <InfoChip icon={<MapPin size={13} />} label="Berlin, Deutschland" />
          <InfoChip icon={<Calendar size={13} />} label="Dabei seit: Sommer 2025" />
          <InfoChip icon={<Star size={13} />} label={`Erstes Event: ${firstEvent}`} />
        </div>

        {/* ── Stats ── */}
        <div
          className={`grid grid-cols-3 gap-3 w-full max-w-md transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <StatCard emoji="🐾" value={eventCount.toString()} label="Events" />
          <StatCard emoji="🌍" value={countries.toString()} label="Länder" />
          <StatCard emoji="⭐" value={conventions.toString()} label="Convention" />
        </div>

        {/* ── CTA buttons ── */}
        <div
          className={`mt-10 flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-400 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            onClick={() => document.querySelector("#events")?.scrollIntoView({ behavior: "smooth" })}
            className="px-7 py-3 rounded-2xl text-white shadow-lg hover:opacity-90 transition-all text-sm"
            style={{ background: "var(--fur-grad)", boxShadow: "0 4px 16px var(--fur-shadow)" }}
          >
            🐾 Alle Events ansehen
          </button>
          <button
            onClick={() => document.querySelector("#social")?.scrollIntoView({ behavior: "smooth" })}
            className="px-7 py-3 rounded-2xl text-sm border transition-all"
            style={{
              borderColor: "var(--fur-border-strong)",
              color: "var(--fur-green)",
              background: "var(--fur-card)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--fur-border)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--fur-card)")}
          >
            Social Media
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-xs" style={{ color: "var(--fur-muted)" }}>Scroll</span>
        <div
          className="w-5 h-8 rounded-full border-2 flex items-start justify-center p-1"
          style={{ borderColor: "var(--fur-muted)" }}
        >
          <div
            className="w-1 h-2 rounded-full animate-bounce"
            style={{ background: "var(--fur-muted)" }}
          />
        </div>
      </div>
    </section>
  );
}

function InfoChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border shadow-sm transition-colors duration-300"
      style={{
        background: "var(--fur-card)",
        borderColor: "var(--fur-border)",
        color: "var(--fur-muted)",
      }}
    >
      <span style={{ color: "var(--fur-green)" }}>{icon}</span>
      {label}
    </div>
  );
}

function StatCard({ emoji, value, label }: { emoji: string; value: string; label: string }) {
  return (
    <div
      className="rounded-2xl p-4 text-center shadow-sm border transition-colors duration-300"
      style={{
        background: "var(--fur-card)",
        borderColor: "var(--fur-border)",
        boxShadow: "0 2px 8px var(--fur-shadow)",
      }}
    >
      <div className="text-2xl mb-1">{emoji}</div>
      <div style={{ fontWeight: 800, color: "var(--fur-green)", fontSize: "1.25rem" }}>
        {value}
      </div>
      <div className="text-xs" style={{ color: "var(--fur-muted)" }}>
        {label}
      </div>
    </div>
  );
}

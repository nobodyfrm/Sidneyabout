import { useEffect, useState, useMemo } from "react";
import { MapPin, Calendar, Star, PawPrint } from "lucide-react";
import { Event } from "./EventsSection";
import sidneyImage from "figma:asset/3b19625cfe54fb82cd432838d05ad1f95c64041d.png";

interface HeroProps {
  eventCount: number;
  events?: Event[];
}

const PAWS = [
  {
    top: "10%",
    left: "5%",
    size: 28,
    rotate: -20,
    opacity: 0.12,
  },
  {
    top: "20%",
    right: "8%",
    size: 20,
    rotate: 40,
    opacity: 0.1,
  },
  {
    top: "55%",
    left: "3%",
    size: 24,
    rotate: 15,
    opacity: 0.08,
  },
  {
    top: "70%",
    right: "5%",
    size: 32,
    rotate: -35,
    opacity: 0.1,
  },
  {
    top: "85%",
    left: "12%",
    size: 18,
    rotate: 5,
    opacity: 0.07,
  },
  {
    top: "40%",
    right: "15%",
    size: 22,
    rotate: 60,
    opacity: 0.08,
  },
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

    const firstEventItem = events.find(
      (e) => e.firstType === "event",
    );
    const firstEventName = firstEventItem
      ? firstEventItem.name
      : events[0]?.name || "Berliner Furry-Sommerfest";

    const uniqueCities = new Set(events.map((e) => e.city));
    const countryNames = new Set<string>();
    uniqueCities.forEach((city) => {
      if (city.includes("Malmö") || city.includes("Schweden")) {
        countryNames.add("Schweden");
      } else {
        countryNames.add("Deutschland");
      }
    });

    const pastConventions = events.filter(
      (e) => e.type === "Convention" && !e.isFuture,
    );
    const conventionCount = pastConventions.length;

    return {
      firstEvent: firstEventName,
      countries: countryNames.size,
      conventions: conventionCount,
    };
  }, [events]);

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14"
      style={{
        background: "var(--color-bg)",
      }}
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
            opacity: p.opacity * 0.5,
            transform: `rotate(${p.rotate}deg)`,
            fontSize: p.size,
            color: "var(--color-primary)",
          }}
        >
          🐾
        </div>
      ))}

      {/* Gradient blob */}
      <div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "var(--color-primary)" }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "var(--color-accent-purple)" }}
      />

      <div
        className="relative z-10 w-full px-4 py-12 flex flex-col items-center text-center"
        style={{ maxWidth: "var(--max-content-width)" }}
      >
        {/* Avatar */}
        <div
          className={`mb-6 transition-all duration-700 ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative inline-block">
            <div
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl shadow-xl flex items-center justify-center text-6xl sm:text-7xl"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary-light), var(--color-primary), var(--color-accent-purple))",
              }}
            >
              <img
                src={sidneyImage}
                alt="Sidney Furdog"
                className="w-full h-full rounded-3xl"
              />
            </div>
            <span
              className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md text-sm"
              style={{
                background: "var(--color-primary)",
              }}
            >
              <PawPrint size={16} />
            </span>
          </div>
        </div>

        {/* Name + intro */}
        <div
          className={`transition-all duration-700 delay-100 ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4 border"
            style={{
              background: "rgba(46, 125, 50, 0.1)",
              borderColor: "rgba(46, 125, 50, 0.3)",
              color: "var(--color-primary)",
              fontWeight: 600,
            }}
          >
            <span>🐾</span>
            <span>Furry seit Sommer 2025</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl mb-2"
            style={{
              fontWeight: 900,
              color: "var(--color-primary)",
            }}
          >
            Sidney Furdog
          </h1>
          <p
            className="text-lg sm:text-xl mb-1"
            style={{
              color: "var(--color-text-muted)",
              fontWeight: 600,
            }}
          >
            Hallo, ich bin Sidney!
          </p>
          <p
            className="text-sm sm:text-base max-w-md mx-auto mb-8"
            style={{ color: "var(--color-text-muted)" }}
          >
            Berliner Furry, begeisterter Teilnehmer an Walks,
            Conventions und Community-Events. Seit dem Berliner
            Furry-Sommerfest 2025 bin ich ein fester Teil der
            Furry-Familie! 🐾✨
          </p>
        </div>

        {/* Info chips */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-700 delay-200 ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <InfoChip
            icon={<MapPin size={14} />}
            label="Berlin, Deutschland"
          />
          <InfoChip
            icon={<Calendar size={14} />}
            label="Dabei seit: Sommer 2025"
          />
          <InfoChip
            icon={<Star size={14} />}
            label={`Erstes Event: ${firstEvent}`}
          />
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-3 gap-4 w-full max-w-md transition-all duration-700 delay-300 ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <StatCard
            emoji="🐾"
            value={eventCount.toString()}
            label="Events"
          />
          <StatCard
            emoji="🌍"
            value={countries.toString()}
            label="Länder"
          />
          <StatCard
            emoji="⭐"
            value={conventions.toString()}
            label="Convention"
          />
        </div>

        {/* CTA */}
        <div
          className={`mt-10 flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-400 ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <button
            onClick={() => {
              document
                .querySelector("#events")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 rounded-2xl text-white shadow-lg hover:opacity-90 transition-all text-sm"
            style={{
              background: "var(--color-primary)",
              fontWeight: 600,
            }}
          >
            🐾 Alle Events ansehen
          </button>
          <button
            onClick={() => {
              document
                .querySelector("#social")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 rounded-2xl text-sm border transition-all"
            style={{
              borderColor: "var(--color-primary)",
              color: "var(--color-primary)",
              fontWeight: 600,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(46, 125, 50, 0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "transparent";
            }}
          >
            Social Media
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span
          className="text-xs"
          style={{ color: "var(--color-text-muted)" }}
        >
          Scroll
        </span>
        <div
          className="w-5 h-8 rounded-full border-2 flex items-start justify-center p-1"
          style={{ borderColor: "var(--color-text-muted)" }}
        >
          <div
            className="w-1 h-2 rounded-full animate-bounce"
            style={{ background: "var(--color-text-muted)" }}
          />
        </div>
      </div>
    </section>
  );
}

function InfoChip({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border shadow-sm"
      style={{
        backgroundColor: "var(--color-card-bg)",
        borderColor: "var(--color-border)",
        color: "var(--color-text-muted)",
      }}
    >
      <span style={{ color: "var(--color-primary)" }}>
        {icon}
      </span>
      {label}
    </div>
  );
}

function StatCard({
  emoji,
  value,
  label,
}: {
  emoji: string;
  value: string;
  label: string;
}) {
  return (
    <div
      className="rounded-2xl p-4 shadow-sm border text-center"
      style={{
        backgroundColor: "var(--color-card-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="text-2xl mb-1">{emoji}</div>
      <div
        className="text-xl"
        style={{
          fontWeight: 800,
          color: "var(--color-primary)",
        }}
      >
        {value}
      </div>
      <div
        className="text-xs"
        style={{ color: "var(--color-text-muted)" }}
      >
        {label}
      </div>
    </div>
  );
}
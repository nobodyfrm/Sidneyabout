import { ExternalLink } from "lucide-react";

export interface SocialProfile {
  platform: string;
  handle: string;
  url: string;
  icon: string;
  color: string;
  description: string;
}

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ),
  furaffinity: (
    <svg viewBox="0 0 50 50" fill="currentColor" className="w-6 h-6">
      <path d="M25 2C12.3 2 2 12.3 2 25s10.3 23 23 23 23-10.3 23-23S37.7 2 25 2zm0 4c10.5 0 19 8.5 19 19S35.5 44 25 44 6 35.5 6 25 14.5 6 25 6zm-8 8v4h3v14h-3v4h16v-4h-3V24h3v-4h-9v4h3v10h-4V14h4v-4H17z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
  bluesky: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.299-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z" />
    </svg>
  ),
};

interface Props { profiles: SocialProfile[]; }

export function SocialSection({ profiles }: Props) {
  return (
    <section
      id="social"
      className="py-16 px-4 transition-colors duration-300"
      style={{ background: "var(--fur-bg-alt)" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2
            className="text-3xl mb-2"
            style={{
              fontWeight: 800,
              background: "var(--fur-grad)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            🌐 Social Media
          </h2>
          <p className="text-sm" style={{ color: "var(--fur-muted)" }}>
            Vernetz dich mit mir auf diesen Plattformen
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profiles.map((p) => (
            <a
              key={p.platform}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl border p-5 flex items-center gap-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              style={{
                background: "var(--fur-card)",
                borderColor: "var(--fur-border)",
                boxShadow: "0 2px 8px var(--fur-shadow)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--fur-border-strong)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px var(--fur-shadow)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--fur-border)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px var(--fur-shadow)";
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-sm"
                style={{ backgroundColor: p.color }}
              >
                {PLATFORM_ICONS[p.icon] ?? <span className="text-xl">🌐</span>}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div
                  className="text-sm mb-0.5"
                  style={{ fontWeight: 700, color: "var(--fur-text)" }}
                >
                  {p.platform}
                </div>
                <div className="text-xs mb-1 truncate" style={{ color: p.color, fontWeight: 600 }}>
                  {p.handle}
                </div>
                <div className="text-xs" style={{ color: "var(--fur-muted)" }}>
                  {p.description}
                </div>
              </div>

              <ExternalLink
                size={14}
                className="flex-shrink-0 opacity-30 group-hover:opacity-70 transition-opacity"
                style={{ color: "var(--fur-muted)" }}
              />

              {/* Hover color wash */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"
                style={{ backgroundColor: p.color }}
              />
            </a>
          ))}
        </div>

        <p className="text-center text-xs mt-8" style={{ color: "var(--fur-muted)" }}>
          💡 Die Links führen zu meinen offiziellen Profilen
        </p>
      </div>
    </section>
  );
}

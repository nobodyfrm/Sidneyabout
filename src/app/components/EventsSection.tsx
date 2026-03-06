import { useState, useMemo } from "react";
import { Search, X, ChevronDown, LayoutGrid, List } from "lucide-react";

export interface Event {
  id: string;
  date: string;
  dateDisplay: string;
  name: string;
  type: string;
  location: string;
  city: string;
  remark: string;
  isFirst: boolean;
}

/* Light-mode colors for type badges – they look fine on both light/dark
   because we use semi-transparent backgrounds */
const TYPE_STYLE: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Festival:   { bg: "rgba(251,191,36,0.15)",  text: "#B45309", border: "rgba(251,191,36,0.4)",  dot: "#F59E0B" },
  Walk:       { bg: "rgba(34,197,94,0.15)",   text: "#15803D", border: "rgba(34,197,94,0.4)",   dot: "#22C55E" },
  Party:      { bg: "rgba(168,85,247,0.15)",  text: "#7C3AED", border: "rgba(168,85,247,0.4)",  dot: "#A855F7" },
  Social:     { bg: "rgba(59,130,246,0.15)",  text: "#1D4ED8", border: "rgba(59,130,246,0.4)",  dot: "#3B82F6" },
  Convention: { bg: "rgba(239,68,68,0.15)",   text: "#B91C1C", border: "rgba(239,68,68,0.4)",   dot: "#EF4444" },
};

const TYPE_EMOJI: Record<string, string> = {
  Festival:   "🎪",
  Walk:       "🐾",
  Party:      "🎉",
  Social:     "🎳",
  Convention: "⭐",
};

function TypeBadge({ type }: { type: string }) {
  const s = TYPE_STYLE[type] ?? { bg: "rgba(107,114,128,0.15)", text: "#374151", border: "rgba(107,114,128,0.3)", dot: "#6B7280" };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border whitespace-nowrap"
      style={{ background: s.bg, color: s.text, borderColor: s.border, fontWeight: 600 }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
      {TYPE_EMOJI[type] ?? "📅"} {type}
    </span>
  );
}

type SortField = "date" | "name" | "type" | "city";
type SortDir = "asc" | "desc";

const SORT_LABELS: Record<SortField, string> = { date: "Datum", name: "Name", type: "Typ", city: "Ort" };

interface Props { events: Event[]; }

export function EventsSection({ events }: Props) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("Alle");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const types = useMemo(() => ["Alle", ...Array.from(new Set(events.map((e) => e.type))).sort()], [events]);

  const filtered = useMemo(() => {
    return events
      .filter((e) => filterType === "Alle" || e.type === filterType)
      .filter((e) => {
        const q = search.toLowerCase();
        return [e.name, e.location, e.city, e.remark, e.type].some((v) => v.toLowerCase().includes(q));
      })
      .sort((a, b) => {
        const av = sortField === "date" ? a.date : a[sortField];
        const bv = sortField === "date" ? b.date : b[sortField];
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      });
  }, [events, filterType, search, sortField, sortDir]);

  function handleSort(field: SortField) {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  }

  function SortInd({ field }: { field: SortField }) {
    if (sortField !== field) return <span className="opacity-25 text-xs">↕</span>;
    return <span className="text-xs" style={{ color: "var(--fur-green)" }}>{sortDir === "asc" ? "↑" : "↓"}</span>;
  }

  return (
    <section
      id="events"
      className="py-16 px-4 transition-colors duration-300"
      style={{ background: "var(--fur-bg)" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
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
            🐾 Meine Events
          </h2>
          <p className="text-sm" style={{ color: "var(--fur-muted)" }}>
            Alle Veranstaltungen seit Sommer 2025 —{" "}
            <strong style={{ color: "var(--fur-green)" }}>{events.length}</strong> Ereignisse!
          </p>
        </div>

        {/* ── Controls ── */}
        <div
          className="rounded-2xl border p-4 mb-5 space-y-4 transition-colors duration-300"
          style={{ background: "var(--fur-card)", borderColor: "var(--fur-border)" }}
        >
          {/* Search */}
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--fur-muted)" }} />
            <input
              type="text"
              placeholder="Suche nach Name, Ort, Typ…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5 rounded-xl border text-sm focus:outline-none transition-all"
              style={{
                background: "var(--fur-bg)",
                borderColor: search ? "var(--fur-green)" : "var(--fur-border)",
                color: "var(--fur-text)",
                boxShadow: search ? "0 0 0 3px var(--fur-border)" : "none",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full"
                style={{ color: "var(--fur-muted)" }}
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Filter chips + view toggle */}
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {types.map((t) => {
                const active = filterType === t;
                const dot = t !== "Alle" ? (TYPE_STYLE[t]?.dot ?? "var(--fur-green)") : "var(--fur-green)";
                return (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    className="px-3 py-1 rounded-full text-xs border transition-all"
                    style={
                      active
                        ? { background: dot, color: "#fff", borderColor: dot, fontWeight: 700 }
                        : { background: "var(--fur-bg)", color: "var(--fur-muted)", borderColor: "var(--fur-border)" }
                    }
                  >
                    {t !== "Alle" && TYPE_EMOJI[t] ? `${TYPE_EMOJI[t]} ` : ""}
                    {t}
                  </button>
                );
              })}
            </div>

            {/* View toggle */}
            <div
              className="flex gap-0.5 rounded-lg p-0.5"
              style={{ background: "var(--fur-border)" }}
            >
              {(["cards", "table"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs transition-all"
                  style={
                    viewMode === mode
                      ? { background: "var(--fur-card)", color: "var(--fur-text)", boxShadow: "0 1px 4px var(--fur-shadow)" }
                      : { color: "var(--fur-muted)" }
                  }
                >
                  {mode === "cards" ? <LayoutGrid size={13} /> : <List size={13} />}
                  <span className="hidden sm:inline capitalize">
                    {mode === "cards" ? "Karten" : "Tabelle"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sort buttons */}
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-xs" style={{ color: "var(--fur-muted)" }}>Sortieren:</span>
            {(Object.keys(SORT_LABELS) as SortField[]).map((f) => (
              <button
                key={f}
                onClick={() => handleSort(f)}
                className="px-2.5 py-1 rounded-lg text-xs border transition-all flex items-center gap-1"
                style={
                  sortField === f
                    ? { background: "var(--fur-border)", borderColor: "var(--fur-green)", color: "var(--fur-green)", fontWeight: 600 }
                    : { background: "var(--fur-bg)", borderColor: "var(--fur-border)", color: "var(--fur-muted)" }
                }
              >
                {SORT_LABELS[f]} <SortInd field={f} />
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <div className="text-xs mb-4 px-1" style={{ color: "var(--fur-muted)" }}>
          {filtered.length === events.length
            ? `${events.length} Events`
            : `${filtered.length} von ${events.length} Events`}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: "var(--fur-muted)" }}>
            <div className="text-5xl mb-4">🐾</div>
            <p>Keine Events gefunden.</p>
            <button
              onClick={() => { setSearch(""); setFilterType("Alle"); }}
              className="mt-3 text-sm underline"
              style={{ color: "var(--fur-green)" }}
            >
              Filter zurücksetzen
            </button>
          </div>
        )}

        {/* ── CARDS VIEW ── */}
        {viewMode === "cards" && (
          <div className="space-y-3">
            {filtered.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                expanded={expandedId === event.id}
                onToggle={() => setExpandedId(expandedId === event.id ? null : event.id)}
              />
            ))}
          </div>
        )}

        {/* ── TABLE VIEW ── */}
        {viewMode === "table" && (
          <div
            className="overflow-x-auto rounded-2xl border shadow-sm transition-colors duration-300"
            style={{ borderColor: "var(--fur-border)", boxShadow: "0 2px 12px var(--fur-shadow)" }}
          >
            <table className="w-full text-sm" style={{ background: "var(--fur-card)" }}>
              <thead>
                <tr className="border-b" style={{ background: "var(--fur-bg)", borderColor: "var(--fur-border)" }}>
                  {([
                    { field: "date", label: "Datum" },
                    { field: "name", label: "Veranstaltung" },
                    { field: "type", label: "Art" },
                    { field: "city", label: "Ort" },
                  ] as { field: SortField; label: string }[]).map((col) => (
                    <th
                      key={col.field}
                      onClick={() => handleSort(col.field)}
                      className="text-left px-4 py-3 cursor-pointer select-none whitespace-nowrap"
                      style={{
                        color: sortField === col.field ? "var(--fur-green)" : "var(--fur-muted)",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    >
                      {col.label} <SortInd field={col.field} />
                    </th>
                  ))}
                  <th
                    className="text-left px-4 py-3 hidden lg:table-cell"
                    style={{ color: "var(--fur-muted)", fontWeight: 600, fontSize: "0.75rem" }}
                  >
                    Bemerkung
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((event, i) => (
                  <>
                    <tr
                      key={event.id}
                      className="border-b cursor-pointer transition-colors"
                      style={{
                        borderColor: "var(--fur-border)",
                        background: event.isFirst
                          ? "var(--fur-border)"
                          : i % 2 === 0 ? "var(--fur-card)" : "var(--fur-bg)",
                      }}
                      onClick={() => setExpandedId(expandedId === event.id ? null : event.id)}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--fur-bg-alt)")}
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                          event.isFirst ? "var(--fur-border)" : i % 2 === 0 ? "var(--fur-card)" : "var(--fur-bg)")
                      }
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-xs" style={{ color: "var(--fur-muted)" }}>
                        {event.dateDisplay}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2" style={{ color: "var(--fur-text)", fontWeight: 500 }}>
                          {event.name}
                          {event.isFirst && (
                            <span
                              className="text-xs px-1.5 py-0.5 rounded-full border"
                              style={{ background: "var(--fur-border)", color: "var(--fur-green)", borderColor: "var(--fur-border-strong)" }}
                            >
                              ⭐ Erstes Event
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3"><TypeBadge type={event.type} /></td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--fur-muted)" }}>{event.city}</td>
                      <td className="px-4 py-3 text-xs hidden lg:table-cell max-w-xs" style={{ color: "var(--fur-muted)" }}>
                        <span className="line-clamp-1">{event.remark}</span>
                      </td>
                    </tr>
                    {expandedId === event.id && (
                      <tr key={`${event.id}-detail`} style={{ background: "var(--fur-border)" }}>
                        <td colSpan={5} className="px-4 pb-4 pt-2">
                          <div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl border text-xs"
                            style={{ background: "var(--fur-card)", borderColor: "var(--fur-border-strong)" }}
                          >
                            <div>
                              <span style={{ color: "var(--fur-muted)" }}>Datum</span>
                              <p style={{ color: "var(--fur-text)", fontWeight: 500 }}>{event.dateDisplay}</p>
                            </div>
                            <div>
                              <span style={{ color: "var(--fur-muted)" }}>Art</span>
                              <p className="mt-0.5"><TypeBadge type={event.type} /></p>
                            </div>
                            <div className="sm:col-span-2">
                              <span style={{ color: "var(--fur-muted)" }}>Vollständige Adresse</span>
                              <p style={{ color: "var(--fur-text)", fontWeight: 500 }}>📍 {event.location}</p>
                            </div>
                            <div className="sm:col-span-2">
                              <span style={{ color: "var(--fur-muted)" }}>Bemerkung</span>
                              <p style={{ color: "var(--fur-text)" }} className="italic">💬 {event.remark}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Event Card ─────────────────────────────────────────────── */
function EventCard({ event, expanded, onToggle }: { event: Event; expanded: boolean; onToggle: () => void }) {
  const parts = event.dateDisplay.split(".");
  const day = parts[0] ?? "";
  const month = parseInt(parts[1] ?? "0");
  const year = event.date.slice(0, 4);
  const MONTHS = ["", "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-all cursor-pointer ${event.isFirst ? "ring-2" : ""}`}
      style={{
        background: "var(--fur-card)",
        borderColor: event.isFirst ? "var(--fur-green)" : "var(--fur-border)",
        boxShadow: expanded
          ? "0 4px 20px var(--fur-shadow)"
          : "0 1px 4px var(--fur-shadow)",
        ringColor: "var(--fur-border-strong)",
      }}
      onClick={onToggle}
    >
      <div className="p-4 flex items-start gap-3">
        {/* Date bubble */}
        <div
          className="flex-shrink-0 w-12 text-center rounded-xl py-1.5 text-white shadow-sm"
          style={{ background: "var(--fur-grad)" }}
        >
          <div className="text-sm leading-none" style={{ fontWeight: 800 }}>{day}</div>
          <div className="text-[10px] opacity-80 mt-0.5">{MONTHS[month]} '{year.slice(2)}</div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start gap-2 mb-1">
            <span style={{ color: "var(--fur-text)", fontWeight: 600, lineHeight: 1.4 }}>
              {event.name}
            </span>
            {event.isFirst && (
              <span
                className="text-xs px-2 py-0.5 rounded-full border whitespace-nowrap"
                style={{ background: "var(--fur-border)", color: "var(--fur-green)", borderColor: "var(--fur-border-strong)", fontWeight: 600 }}
              >
                ⭐ Erstes Event
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <TypeBadge type={event.type} />
            <span className="text-xs flex items-center gap-1" style={{ color: "var(--fur-muted)" }}>
              📍 {event.city}
            </span>
          </div>
        </div>

        {/* Expand arrow */}
        <ChevronDown
          size={16}
          className={`flex-shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          style={{ color: "var(--fur-muted)" }}
        />
      </div>

      {/* Expanded details */}
      {expanded && (
        <div
          className="border-t px-4 pb-4 pt-3 transition-colors duration-300"
          style={{ borderColor: "var(--fur-border)", background: "var(--fur-bg)" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-xs" style={{ color: "var(--fur-muted)" }}>Datum</span>
              <p style={{ color: "var(--fur-text)", fontWeight: 500 }}>{event.dateDisplay}</p>
            </div>
            <div>
              <span className="text-xs" style={{ color: "var(--fur-muted)" }}>Art der Veranstaltung</span>
              <p className="mt-0.5"><TypeBadge type={event.type} /></p>
            </div>
            <div className="sm:col-span-2">
              <span className="text-xs" style={{ color: "var(--fur-muted)" }}>Vollständige Adresse</span>
              <p className="text-xs mt-0.5" style={{ color: "var(--fur-text)" }}>📍 {event.location}</p>
            </div>
            <div className="sm:col-span-2">
              <span className="text-xs" style={{ color: "var(--fur-muted)" }}>Bemerkung</span>
              <p className="text-xs mt-0.5 italic" style={{ color: "var(--fur-text)" }}>💬 {event.remark}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

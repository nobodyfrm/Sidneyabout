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
  firstType?: string;
  isFuture?: boolean;
}

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Festival:   { bg: "#FFF7E6", text: "#B45309", border: "#FCD34D", dot: "#F59E0B" },
  Walk:       { bg: "#ECFDF5", text: "#065F46", border: "#6EE7B7", dot: "#10B981" },
  Party:      { bg: "#F5F3FF", text: "#4C1D95", border: "#C4B5FD", dot: "#8B5CF6" },
  Social:     { bg: "#EFF6FF", text: "#1E40AF", border: "#93C5FD", dot: "#3B82F6" },
  Convention: { bg: "#FFF1F2", text: "#9F1239", border: "#FCA5A5", dot: "#EF4444" },
};

const TYPE_EMOJI: Record<string, string> = {
  Festival:   "🎪",
  Walk:       "🐾",
  Party:      "🎉",
  Social:     "🎳",
  Convention: "⭐",
};

function TypeBadge({ type }: { type: string }) {
  const c = TYPE_COLORS[type] ?? { bg: "#F3F4F6", text: "#374151", border: "#D1D5DB", dot: "#6B7280" };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border whitespace-nowrap"
      style={{ background: c.bg, color: c.text, borderColor: c.border, fontWeight: 600 }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full inline-block"
        style={{ background: c.dot }}
      />
      {TYPE_EMOJI[type] ?? "📅"} {type}
    </span>
  );
}

type SortField = "date" | "name" | "type" | "city";
type SortDir = "asc" | "desc";

interface Props {
  events: Event[];
}

export function EventsSection({ events }: Props) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("Alle");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const types = useMemo(() => {
    const all = Array.from(new Set(events.map((e) => e.type)));
    return ["Alle", ...all.sort()];
  }, [events]);

  const filtered = useMemo(() => {
    return events
      .filter((e) => filterType === "Alle" || e.type === filterType)
      .filter((e) => {
        const q = search.toLowerCase();
        return (
          e.name.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.remark.toLowerCase().includes(q) ||
          e.type.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const av = sortField === "date" ? a.date : a[sortField];
        const bv = sortField === "date" ? b.date : b[sortField];
        const cmp = av.localeCompare(bv);
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [events, filterType, search, sortField, sortDir]);

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  function SortIndicator({ field }: { field: SortField }) {
    if (sortField !== field)
      return <span className="opacity-25 text-xs">↕</span>;
    return (
      <span className="text-xs" style={{ color: "var(--fur-orange)" }}>
        {sortDir === "asc" ? "↑" : "↓"}
      </span>
    );
  }

  const sortLabels: Record<SortField, string> = {
    date: "Datum",
    name: "Name",
    type: "Typ",
    city: "Ort",
  };

  return (
    <section id="events" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            className="text-3xl mb-2"
            style={{
              fontWeight: 800,
              background: "linear-gradient(135deg, var(--fur-orange), var(--fur-teal))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            🐾 Meine Events
          </h2>
          <p className="text-sm" style={{ color: "var(--fur-muted)" }}>
            Alle Veranstaltungen seit dem Sommer 2025 &mdash;{" "}
            <strong style={{ color: "var(--fur-orange)" }}>{events.length}</strong>{" "}
            Ereignisse und zählend!
          </p>
        </div>

        {/* Controls panel */}
        <div
          className="rounded-2xl border p-4 mb-5 space-y-4"
          style={{
            background: "var(--fur-warm-bg)",
            borderColor: "rgba(0,0,0,0.07)",
          }}
        >
          {/* Search */}
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--fur-muted)" }}
            />
            <input
              type="text"
              placeholder="Suche nach Name, Ort, Typ…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5 rounded-xl border bg-white text-sm focus:outline-none transition-all"
              style={{
                borderColor: search ? "var(--fur-orange)" : "rgba(0,0,0,0.12)",
                boxShadow: search ? "0 0 0 2px rgba(232,123,45,0.1)" : "none",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-100 transition-colors"
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
                const c = t !== "Alle" ? TYPE_COLORS[t] : null;
                return (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    className="px-3 py-1 rounded-full text-xs border transition-all"
                    style={
                      active
                        ? c
                          ? { background: c.dot, color: "#fff", borderColor: c.dot, fontWeight: 700 }
                          : { background: "var(--fur-orange)", color: "#fff", borderColor: "var(--fur-orange)", fontWeight: 700 }
                        : { background: "#fff", color: "var(--fur-muted)", borderColor: "rgba(0,0,0,0.1)" }
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
              style={{ background: "rgba(0,0,0,0.06)" }}
            >
              <button
                onClick={() => setViewMode("cards")}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs transition-all"
                style={
                  viewMode === "cards"
                    ? { background: "#fff", color: "var(--fur-text)", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }
                    : { color: "var(--fur-muted)" }
                }
              >
                <LayoutGrid size={13} />
                <span className="hidden sm:inline">Karten</span>
              </button>
              <button
                onClick={() => setViewMode("table")}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs transition-all"
                style={
                  viewMode === "table"
                    ? { background: "#fff", color: "var(--fur-text)", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }
                    : { color: "var(--fur-muted)" }
                }
              >
                <List size={13} />
                <span className="hidden sm:inline">Tabelle</span>
              </button>
            </div>
          </div>

          {/* Sort buttons */}
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-xs" style={{ color: "var(--fur-muted)" }}>
              Sortieren:
            </span>
            {(["date", "name", "type", "city"] as SortField[]).map((f) => (
              <button
                key={f}
                onClick={() => handleSort(f)}
                className="px-2.5 py-1 rounded-lg text-xs border transition-all flex items-center gap-1"
                style={
                  sortField === f
                    ? {
                        background: "rgba(232,123,45,0.08)",
                        borderColor: "var(--fur-orange)",
                        color: "var(--fur-orange)",
                        fontWeight: 600,
                      }
                    : {
                        background: "#fff",
                        borderColor: "rgba(0,0,0,0.1)",
                        color: "var(--fur-muted)",
                      }
                }
              >
                {sortLabels[f]} <SortIndicator field={f} />
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
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
              onClick={() => {
                setSearch("");
                setFilterType("Alle");
              }}
              className="mt-3 text-sm underline"
              style={{ color: "var(--fur-orange)" }}
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
                onToggle={() =>
                  setExpandedId(expandedId === event.id ? null : event.id)
                }
              />
            ))}
          </div>
        )}

        {/* ── TABLE VIEW ── */}
        {viewMode === "table" && (
          <div
            className="overflow-x-auto rounded-2xl border shadow-sm"
            style={{ borderColor: "rgba(0,0,0,0.07)" }}
          >
            <table className="w-full text-sm bg-white">
              <thead>
                <tr
                  className="border-b"
                  style={{
                    background: "var(--fur-warm-bg)",
                    borderColor: "rgba(0,0,0,0.07)",
                  }}
                >
                  {(
                    [
                      { field: "date", label: "Datum" },
                      { field: "name", label: "Veranstaltung" },
                      { field: "type", label: "Art" },
                      { field: "city", label: "Ort" },
                    ] as { field: SortField; label: string }[]
                  ).map((col) => (
                    <th
                      key={col.field}
                      onClick={() => handleSort(col.field)}
                      className="text-left px-4 py-3 cursor-pointer select-none whitespace-nowrap"
                      style={{
                        color: sortField === col.field ? "var(--fur-orange)" : "var(--fur-muted)",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    >
                      {col.label} <SortIndicator field={col.field} />
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
                        borderColor: "rgba(0,0,0,0.05)",
                        background: event.isFirst
                          ? "rgba(232,123,45,0.04)"
                          : i % 2 === 0
                          ? "#fff"
                          : "var(--fur-warm-bg)",
                      }}
                      onClick={() =>
                        setExpandedId(expandedId === event.id ? null : event.id)
                      }
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLTableRowElement).style.background =
                          "rgba(232,123,45,0.06)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLTableRowElement).style.background =
                          event.isFirst
                            ? "rgba(232,123,45,0.04)"
                            : i % 2 === 0
                            ? "#fff"
                            : "var(--fur-warm-bg)")
                      }
                    >
                      <td
                        className="px-4 py-3 whitespace-nowrap text-xs"
                        style={{ color: "var(--fur-muted)" }}
                      >
                        {event.dateDisplay}
                      </td>
                      <td className="px-4 py-3">
                        <div
                          className="flex items-center gap-2"
                          style={{ color: "var(--fur-text)", fontWeight: 500 }}
                        >
                          {event.name}
                          {event.isFirst && (
                            <span
                              className="text-xs px-1.5 py-0.5 rounded-full border"
                              style={{
                                background: "rgba(232,123,45,0.1)",
                                color: "var(--fur-orange)",
                                borderColor: "rgba(232,123,45,0.3)",
                              }}
                            >
                              ⭐ {event.firstType === "convention" ? "Erste Convention" : "Erstes Event"}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <TypeBadge type={event.type} />
                      </td>
                      <td
                        className="px-4 py-3 text-xs"
                        style={{ color: "var(--fur-muted)" }}
                      >
                        {event.city}
                      </td>
                      <td
                        className="px-4 py-3 text-xs hidden lg:table-cell max-w-xs"
                        style={{ color: "var(--fur-muted)" }}
                      >
                        <span className="line-clamp-1">{event.remark}</span>
                      </td>
                    </tr>
                    {expandedId === event.id && (
                      <tr
                        key={`${event.id}-detail`}
                        style={{ background: "rgba(232,123,45,0.03)" }}
                      >
                        <td colSpan={5} className="px-4 pb-4 pt-2">
                          <div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl border text-xs"
                            style={{
                              background: "rgba(232,123,45,0.05)",
                              borderColor: "rgba(232,123,45,0.15)",
                            }}
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
                              <p style={{ color: "var(--fur-text)" }} className="italic">
                                💬 {event.remark}
                              </p>
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

function EventCard({
  event,
  expanded,
  onToggle,
}: {
  event: Event;
  expanded: boolean;
  onToggle: () => void;
}) {
  // Parse day/month from dateDisplay
  const parts = event.dateDisplay.split(".");
  const day = parts[0] ?? "";
  const month = parts[1] ?? "";
  const year = event.date.slice(0, 4);

  const monthNames = [
    "", "Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
    "Jul", "Aug", "Sep", "Okt", "Nov", "Dez",
  ];
  const monthName = monthNames[parseInt(month)] ?? month;

  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-all cursor-pointer ${
        event.isFirst ? "ring-2" : ""
      }`}
      style={{
        background: "#fff",
        borderColor: event.isFirst ? "var(--fur-orange)" : "rgba(0,0,0,0.07)",
        boxShadow: expanded ? "0 4px 20px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.04)",
        ringColor: event.isFirst ? "rgba(232,123,45,0.3)" : "transparent",
      }}
      onClick={onToggle}
    >
      <div className="p-4 flex items-start gap-3">
        {/* Date bubble */}
        <div
          className="flex-shrink-0 w-12 text-center rounded-xl py-1.5 text-white shadow-sm"
          style={{
            background: "linear-gradient(135deg, var(--fur-purple), var(--fur-orange))",
          }}
        >
          <div className="text-sm leading-none" style={{ fontWeight: 800 }}>
            {day}
          </div>
          <div className="text-[10px] opacity-80 mt-0.5">{monthName} '{year.slice(2)}</div>
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start gap-2 mb-1">
            <span
              className="leading-snug"
              style={{ color: "var(--fur-text)", fontWeight: 600 }}
            >
              {event.name}
            </span>
            {event.isFirst && (
              <span
                className="text-xs px-2 py-0.5 rounded-full border whitespace-nowrap"
                style={{
                  background: "rgba(232,123,45,0.1)",
                  color: "var(--fur-orange)",
                  borderColor: "rgba(232,123,45,0.3)",
                  fontWeight: 600,
                }}
              >
                ⭐ {event.firstType === "convention" ? "Erste Convention" : "Erstes Event"}
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

        {/* Expand icon */}
        <ChevronDown
          size={16}
          className={`flex-shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          style={{ color: "var(--fur-muted)" }}
        />
      </div>

      {/* Expanded details */}
      {expanded && (
        <div
          className="border-t px-4 pb-4 pt-3"
          style={{
            borderColor: "rgba(0,0,0,0.06)",
            background: "var(--fur-warm-bg)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-xs" style={{ color: "var(--fur-muted)" }}>
                Datum
              </span>
              <p style={{ color: "var(--fur-text)", fontWeight: 500 }}>
                {event.dateDisplay}
              </p>
            </div>
            <div>
              <span className="text-xs" style={{ color: "var(--fur-muted)" }}>
                Art der Veranstaltung
              </span>
              <p className="mt-0.5">
                <TypeBadge type={event.type} />
              </p>
            </div>
            <div className="sm:col-span-2">
              <span className="text-xs" style={{ color: "var(--fur-muted)" }}>
                Vollständige Adresse
              </span>
              <p className="text-xs mt-0.5" style={{ color: "var(--fur-text)" }}>
                📍 {event.location}
              </p>
            </div>
            <div className="sm:col-span-2">
              <span className="text-xs" style={{ color: "var(--fur-muted)" }}>
                Bemerkung
              </span>
              <p
                className="text-xs mt-0.5 italic"
                style={{ color: "var(--fur-text)" }}
              >
                💬 {event.remark}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
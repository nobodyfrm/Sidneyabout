import { useState, useMemo, useEffect } from "react";
import { Search, X, ChevronDown, LayoutGrid, List } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Pagination } from "./Pagination";

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
  attendance?: "confirmed" | "maybe" | "cancelled";
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
  
  // Collapsible state for sections
  const [futureExpanded, setFutureExpanded] = useState(true);
  const [pastExpanded, setPastExpanded] = useState(true);
  
  // Pagination state - separate for future and past events
  const [futureCurrentPage, setFutureCurrentPage] = useState(1);
  const [pastCurrentPage, setPastCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

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

  // Separate into future and past events
  const futureEvents = useMemo(() => filtered.filter((e) => e.isFuture), [filtered]);
  const pastEvents = useMemo(() => filtered.filter((e) => !e.isFuture), [filtered]);

  // Reset pagination when filters change
  useEffect(() => {
    setFutureCurrentPage(1);
    setPastCurrentPage(1);
  }, [search, filterType, sortField, sortDir]);

  // Paginated events
  const paginatedFutureEvents = useMemo(() => {
    const startIndex = (futureCurrentPage - 1) * ITEMS_PER_PAGE;
    return futureEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [futureEvents, futureCurrentPage]);

  const paginatedPastEvents = useMemo(() => {
    const startIndex = (pastCurrentPage - 1) * ITEMS_PER_PAGE;
    return pastEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [pastEvents, pastCurrentPage]);

  const futureTotalPages = Math.ceil(futureEvents.length / ITEMS_PER_PAGE);
  const pastTotalPages = Math.ceil(pastEvents.length / ITEMS_PER_PAGE);

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
      <span className="text-xs" style={{ color: "var(--color-primary)" }}>
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
    <section id="events" className="py-16 px-4" style={{ backgroundColor: "var(--color-bg-neutral)" }}>
      <div className="mx-auto" style={{ maxWidth: "var(--max-content-width)" }}>
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            className="text-3xl mb-2"
            style={{
              fontWeight: 800,
              color: "var(--color-primary)",
            }}
          >
            🐾 Meine Events
          </h2>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Alle Veranstaltungen seit dem Sommer 2025 &mdash;{" "}
            <strong style={{ color: "var(--color-primary)" }}>{events.length}</strong>{" "}
            Ereignisse und zählend!
          </p>
        </div>

        {/* Controls panel */}
        <div
          className="rounded-2xl border p-4 mb-5 space-y-4"
          style={{
            background: "var(--color-card-bg)",
            borderColor: "var(--color-border)",
          }}
        >
          {/* Search */}
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-text-muted)" }}
            />
            <input
              type="text"
              placeholder="Suche nach Name, Ort, Typ…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5 rounded-xl border text-sm focus:outline-none transition-all"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text)",
                borderColor: search ? "var(--color-primary)" : "var(--color-border)",
                boxShadow: search ? "0 0 0 2px rgba(46,125,50,0.1)" : "none",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full transition-colors"
                style={{ color: "var(--color-text-muted)" }}
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
                          : { background: "var(--color-primary)", color: "#fff", borderColor: "var(--color-primary)", fontWeight: 700 }
                        : { background: "var(--color-bg)", color: "var(--color-text-muted)", borderColor: "var(--color-border)" }
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
                    ? { background: "var(--color-bg)", color: "var(--color-text)", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }
                    : { color: "var(--color-text-muted)" }
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
                    ? { background: "var(--color-bg)", color: "var(--color-text)", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }
                    : { color: "var(--color-text-muted)" }
                }
              >
                <List size={13} />
                <span className="hidden sm:inline">Tabelle</span>
              </button>
            </div>
          </div>

          {/* Sort buttons */}
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
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
                        background: "rgba(46,125,50,0.08)",
                        borderColor: "var(--color-primary)",
                        color: "var(--color-primary)",
                        fontWeight: 600,
                      }
                    : {
                        background: "var(--color-bg)",
                        borderColor: "var(--color-border)",
                        color: "var(--color-text-muted)",
                      }
                }
              >
                {sortLabels[f]} <SortIndicator field={f} />
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="text-xs mb-4 px-1" style={{ color: "var(--color-text-muted)" }}>
          {filtered.length === events.length
            ? `${events.length} Events`
            : `${filtered.length} von ${events.length} Events`}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: "var(--color-text-muted)" }}>
            <div className="text-5xl mb-4">🐾</div>
            <p>Keine Events gefunden.</p>
            <button
              onClick={() => {
                setSearch("");
                setFilterType("Alle");
              }}
              className="mt-3 text-sm underline"
              style={{ color: "var(--color-primary)" }}
            >
              Filter zurücksetzen
            </button>
          </div>
        )}

        {/* ── FUTURE EVENTS SECTION ── */}
        {futureEvents.length > 0 && (
          <div className="mb-12">
            <Collapsible open={futureExpanded} onOpenChange={setFutureExpanded}>
              <CollapsibleTrigger asChild>
                <button
                  className="flex items-center gap-2 w-full text-left mb-4 px-1 group"
                  style={{
                    fontWeight: 700,
                    color: "var(--color-text)",
                  }}
                >
                  <h3 className="text-xl">
                    🔮 Anstehende Events ({futureEvents.length})
                  </h3>
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-200 ${futureExpanded ? "" : "-rotate-90"} `}
                    style={{ color: "var(--color-text-muted)" }}
                  />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {viewMode === "cards" ? (
                  <EventsCardsList
                    events={paginatedFutureEvents}
                    expandedId={expandedId}
                    onToggle={setExpandedId}
                  />
                ) : (
                  <EventsTable
                    events={paginatedFutureEvents}
                    expandedId={expandedId}
                    onToggle={setExpandedId}
                    handleSort={handleSort}
                    sortField={sortField}
                    SortIndicator={SortIndicator}
                  />
                )}
                {/* Pagination controls */}
                {futureTotalPages > 1 && (
                  <Pagination
                    currentPage={futureCurrentPage}
                    totalPages={futureTotalPages}
                    onPageChange={setFutureCurrentPage}
                  />
                )}
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}

        {/* ── PAST EVENTS SECTION ── */}
        {pastEvents.length > 0 && (
          <div>
            <Collapsible open={pastExpanded} onOpenChange={setPastExpanded}>
              <CollapsibleTrigger asChild>
                <button
                  className="flex items-center gap-2 w-full text-left mb-4 px-1 group"
                  style={{
                    fontWeight: 700,
                    color: "var(--color-text)",
                  }}
                >
                  <h3 className="text-xl">
                    📜 Vergangene Events ({pastEvents.length})
                  </h3>
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-200 ${pastExpanded ? "" : "-rotate-90"} `}
                    style={{ color: "var(--color-text-muted)" }}
                  />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {viewMode === "cards" ? (
                  <EventsCardsList
                    events={paginatedPastEvents}
                    expandedId={expandedId}
                    onToggle={setExpandedId}
                  />
                ) : (
                  <EventsTable
                    events={paginatedPastEvents}
                    expandedId={expandedId}
                    onToggle={setExpandedId}
                    handleSort={handleSort}
                    sortField={sortField}
                    SortIndicator={SortIndicator}
                  />
                )}
                {/* Pagination controls */}
                {pastTotalPages > 1 && (
                  <Pagination
                    currentPage={pastCurrentPage}
                    totalPages={pastTotalPages}
                    onPageChange={setPastCurrentPage}
                  />
                )}
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Helper Components ──
function EventsCardsList({
  events,
  expandedId,
  onToggle,
}: {
  events: Event[];
  expandedId: string | null;
  onToggle: (id: string | null) => void;
}) {
  return (
    <div className="space-y-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          expanded={expandedId === event.id}
          onToggle={() => onToggle(expandedId === event.id ? null : event.id)}
        />
      ))}
    </div>
  );
}

function EventsTable({
  events,
  expandedId,
  onToggle,
  handleSort,
  sortField,
  SortIndicator,
}: {
  events: Event[];
  expandedId: string | null;
  onToggle: (id: string | null) => void;
  handleSort: (field: SortField) => void;
  sortField: SortField;
  SortIndicator: ({ field }: { field: SortField }) => JSX.Element;
}) {
  return (
    <div
      className="overflow-x-auto rounded-2xl border shadow-sm"
      style={{ borderColor: "var(--color-border)" }}
    >
      <table className="w-full text-sm" style={{ backgroundColor: "var(--color-card-bg)" }}>
        <thead>
          <tr
            className="border-b"
            style={{
              background: "var(--color-bg-neutral)",
              borderColor: "var(--color-border)",
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
                  color: sortField === col.field ? "var(--color-primary)" : "var(--color-text-muted)",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                }}
              >
                {col.label} <SortIndicator field={col.field} />
              </th>
            ))}
            <th
              className="text-left px-4 py-3 hidden lg:table-cell"
              style={{ color: "var(--color-text-muted)", fontWeight: 600, fontSize: "0.75rem" }}
            >
              Bemerkung
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, i) => (
            <>
              <tr
                key={event.id}
                className="border-b cursor-pointer transition-colors"
                style={{
                  borderColor: "var(--color-border)",
                  background: event.isFirst
                    ? "rgba(46,125,50,0.04)"
                    : i % 2 === 0
                    ? "var(--color-card-bg)"
                    : "var(--color-bg-neutral)",
                }}
                onClick={() => onToggle(expandedId === event.id ? null : event.id)}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLTableRowElement).style.background =
                    "rgba(46,125,50,0.06)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLTableRowElement).style.background =
                    event.isFirst
                      ? "rgba(46,125,50,0.04)"
                      : i % 2 === 0
                      ? "var(--color-card-bg)"
                      : "var(--color-bg-neutral)")
                }
              >
                <td
                  className="px-4 py-3 whitespace-nowrap text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {event.dateDisplay}
                </td>
                <td className="px-4 py-3">
                  <div
                    className="flex items-center gap-2"
                    style={{ color: "var(--color-text)", fontWeight: 500 }}
                  >
                    {event.name}
                    {event.isFirst && (
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full border"
                        style={{
                          background: "rgba(46,125,50,0.1)",
                          color: "var(--color-primary)",
                          borderColor: "rgba(46,125,50,0.3)",
                        }}
                      >
                        ⭐ {event.firstType === "convention" ? "Erste Convention" : event.firstType === "furdance" ? "Erster Furdance" : "Erstes Event"}
                      </span>
                    )}
                    {event.attendance === "maybe" && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full border whitespace-nowrap"
                        style={{
                          background: "rgba(251, 191, 36, 0.1)",
                          color: "#d97706",
                          borderColor: "rgba(251, 191, 36, 0.3)",
                          fontWeight: 600,
                        }}
                      >
                        🤔 Vielleicht
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <TypeBadge type={event.type} />
                </td>
                <td
                  className="px-4 py-3 text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {event.city}
                </td>
                <td
                  className="px-4 py-3 text-xs hidden lg:table-cell max-w-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <span className="line-clamp-1">{event.remark}</span>
                </td>
              </tr>
              {expandedId === event.id && (
                <tr
                  key={`${event.id}-detail`}
                  style={{ background: "rgba(46,125,50,0.03)" }}
                >
                  <td colSpan={5} className="px-4 pb-4 pt-2">
                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl border text-xs"
                      style={{
                        background: "rgba(46,125,50,0.05)",
                        borderColor: "rgba(46,125,50,0.15)",
                      }}
                    >
                      <div>
                        <span style={{ color: "var(--color-text-muted)" }}>Datum</span>
                        <p style={{ color: "var(--color-text)", fontWeight: 500 }}>{event.dateDisplay}</p>
                      </div>
                      <div>
                        <span style={{ color: "var(--color-text-muted)" }}>Art</span>
                        <p className="mt-0.5"><TypeBadge type={event.type} /></p>
                      </div>
                      <div className="sm:col-span-2">
                        <span style={{ color: "var(--color-text-muted)" }}>Vollständige Adresse</span>
                        <p style={{ color: "var(--color-text)", fontWeight: 500 }}>📍 {event.location}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <span style={{ color: "var(--color-text-muted)" }}>Bemerkung</span>
                        <p style={{ color: "var(--color-text)" }} className="italic">
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
      id={`event-${event.id}`}
      style={{
        background: "var(--color-card-bg)",
        borderColor: event.isFirst ? "var(--color-primary)" : "var(--color-border)",
        boxShadow: expanded ? "0 4px 20px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.04)",
        ringColor: event.isFirst ? "rgba(46,125,50,0.3)" : "transparent",
        scrollMarginTop: "80px", // Offset for fixed header
      }}
      onClick={onToggle}
    >
      <div className="p-4 flex items-start gap-3">
        {/* Date bubble */}
        <div
          className="flex-shrink-0 w-12 text-center rounded-xl py-1.5 text-white shadow-sm"
          style={{
            background: "var(--color-primary)",
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
              style={{ color: "var(--color-text)", fontWeight: 600 }}
            >
              {event.name}
            </span>
            {event.isFirst && (
              <span
                className="text-xs px-2 py-0.5 rounded-full border whitespace-nowrap"
                style={{
                  background: "rgba(46,125,50,0.1)",
                  color: "var(--color-primary)",
                  borderColor: "rgba(46,125,50,0.3)",
                  fontWeight: 600,
                }}
              >
                ⭐ {event.firstType === "convention" ? "Erste Convention" : event.firstType === "furdance" ? "Erster Furdance" : "Erstes Event"}
              </span>
            )}
            {event.attendance === "maybe" && (
              <span
                className="text-xs px-2 py-0.5 rounded-full border whitespace-nowrap"
                style={{
                  background: "rgba(251, 191, 36, 0.1)",
                  color: "#d97706",
                  borderColor: "rgba(251, 191, 36, 0.3)",
                  fontWeight: 600,
                }}
              >
                🤔 Vielleicht
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <TypeBadge type={event.type} />
            <span className="text-xs flex items-center gap-1" style={{ color: "var(--color-text-muted)" }}>
              📍 {event.city}
            </span>
          </div>
        </div>

        {/* Expand icon */}
        <ChevronDown
          size={16}
          className={`flex-shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          style={{ color: "var(--color-text-muted)" }}
        />
      </div>

      {/* Expanded details */}
      {expanded && (
        <div
          className="border-t px-4 pb-4 pt-3"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-bg-neutral)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                Datum
              </span>
              <p style={{ color: "var(--color-text)", fontWeight: 500 }}>
                {event.dateDisplay}
              </p>
            </div>
            <div>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                Art der Veranstaltung
              </span>
              <p className="mt-0.5">
                <TypeBadge type={event.type} />
              </p>
            </div>
            <div className="sm:col-span-2">
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                Vollständige Adresse
              </span>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-text)" }}>
                📍 {event.location}
              </p>
            </div>
            <div className="sm:col-span-2">
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                Bemerkung
              </span>
              <p
                className="text-xs mt-0.5 italic"
                style={{ color: "var(--color-text)" }}
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
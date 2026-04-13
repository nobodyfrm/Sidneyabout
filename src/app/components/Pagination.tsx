import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      {/* Page selector dropdown */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="page-select"
          className="text-xs"
          style={{ color: "var(--color-text-muted)" }}
        >
          Gehe zu Seite:
        </label>
        <select
          id="page-select"
          value={currentPage}
          onChange={(e) => onPageChange(Number(e.target.value))}
          className="px-3 py-2 rounded-lg text-xs transition-all border"
          style={{
            background: "var(--color-bg)",
            color: "var(--color-text)",
            borderColor: "var(--color-border)",
            fontWeight: 600,
          }}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              Seite {page} von {totalPages}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-center gap-1">
        {/* First page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: "var(--color-bg)",
            borderColor: "var(--color-border)",
            color: "var(--color-text-muted)",
          }}
          title="Erste Seite"
        >
          <ChevronsLeft size={14} />
        </button>

      {/* Previous page */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          background: "var(--color-bg)",
          borderColor: "var(--color-border)",
          color: "var(--color-text-muted)",
        }}
        title="Vorherige Seite"
      >
        <ChevronLeft size={14} />
      </button>

      {/* Page numbers */}
      {pageNumbers.map((page, idx) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="px-3 py-2 text-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className="px-3 py-2 rounded-lg text-xs transition-all min-w-[2rem]"
            style={
              isActive
                ? {
                    background: "var(--color-primary)",
                    color: "#fff",
                    fontWeight: 700,
                  }
                : {
                    background: "var(--color-bg)",
                    color: "var(--color-text-muted)",
                  }
            }
          >
            {page}
          </button>
        );
      })}

      {/* Next page */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          background: "var(--color-bg)",
          borderColor: "var(--color-border)",
          color: "var(--color-text-muted)",
        }}
        title="Nächste Seite"
      >
        <ChevronRight size={14} />
      </button>

      {/* Last page */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          background: "var(--color-bg)",
          borderColor: "var(--color-border)",
          color: "var(--color-text-muted)",
        }}
        title="Letzte Seite"
      >
        <ChevronsRight size={14} />
      </button>
      </div>
    </div>
  );
}

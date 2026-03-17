import { useState, useEffect } from "react";
import { Menu, X, PawPrint, Sun, Moon } from "lucide-react";

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    // Then check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Show title when hero section (with main h1) is scrolled out of view
      // Approximate: Hero section is ~100vh, so show title when scrolled past 70vh
      const heroThreshold = window.innerHeight * 0.7;
      setShowTitle(window.scrollY > heroThreshold);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    // Save to localStorage
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const links = [
    { href: "#about", label: "Über mich" },
    { href: "#events", label: "Events" },
    { href: "#social", label: "Social Media" },
  ];

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md shadow-sm" : ""
      }`}
      style={{
        backgroundColor: scrolled
          ? isDark
            ? "rgba(26, 26, 26, 0.95)"
            : "rgba(255, 255, 255, 0.95)"
          : "transparent",
      }}
    >
      <nav
        className="mx-auto px-4 flex items-center justify-between h-14"
        style={{ maxWidth: "var(--max-content-width)" }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
        >
          <span
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform"
            style={{ background: "var(--color-primary)" }}
          >
            <PawPrint size={16} />
          </span>
          <span
            className={`font-black text-lg transition-all duration-300 overflow-hidden whitespace-nowrap ${
              showTitle ? "max-w-[200px] opacity-100" : "max-w-0 sm:max-w-[200px] opacity-0 sm:opacity-70"
            }`}
            style={{ 
              color: "var(--color-primary)",
            }}
          >
            Sidney Furdog
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="px-4 py-2 rounded-full text-sm transition-all"
              style={{
                color: "var(--color-text)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark
                  ? "rgba(96, 173, 94, 0.1)"
                  : "rgba(46, 125, 50, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {l.label}
            </button>
          ))}
          
          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2.5 rounded-full transition-all"
            style={{
              backgroundColor: isDark
                ? "rgba(96, 173, 94, 0.15)"
                : "rgba(46, 125, 50, 0.1)",
              color: "var(--color-primary)",
            }}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile hamburger + theme toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg"
            style={{ color: "var(--color-text)" }}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="p-2 rounded-lg"
            onClick={() => setOpen(!open)}
            aria-label="Menü"
            style={{ color: "var(--color-text)" }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t px-4 pb-4 pt-2 shadow-md"
          style={{
            backgroundColor: "var(--color-bg)",
            borderColor: "var(--color-border)",
          }}
        >
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="block w-full text-left px-4 py-3 rounded-xl transition-colors text-sm"
              style={{ color: "var(--color-text)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark
                  ? "rgba(96, 173, 94, 0.1)"
                  : "rgba(46, 125, 50, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
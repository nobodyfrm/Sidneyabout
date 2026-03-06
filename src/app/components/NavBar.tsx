import { useState, useEffect } from "react";
import { Menu, X, PawPrint, Sun, Moon } from "lucide-react";
import { useTheme } from "../App";

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: "Über mich" },
    { href: "#events", label: "Events" },
    { href: "#social", label: "Social Media" },
  ];

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? {
              background: "var(--fur-nav-bg)",
              borderBottom: "1px solid var(--fur-nav-border)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 1px 12px var(--fur-shadow)",
            }
          : { background: "transparent" }
      }
    >
      <nav className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
        >
          <span
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform"
            style={{ background: "var(--fur-grad)" }}
          >
            <PawPrint size={16} />
          </span>
          <span
            className="font-black text-lg hidden sm:block"
            style={{ color: "var(--fur-green)" }}
          >
            Sidney Furdog
          </span>
        </button>

        {/* Desktop links + theme toggle */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="px-4 py-2 rounded-full text-sm transition-all"
              style={{ color: "var(--fur-text)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--fur-border)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {l.label}
            </button>
          ))}

          {/* Theme Toggle */}
          <ThemeToggle dark={dark} toggle={toggle} />

          <button
            onClick={() => handleNav("#events")}
            className="ml-2 px-4 py-2 rounded-full text-sm text-white transition-all hover:opacity-90 shadow-sm"
            style={{ background: "var(--fur-grad)" }}
          >
            🐾 Events ansehen
          </button>
        </div>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle dark={dark} toggle={toggle} />
          <button
            className="p-2 rounded-lg"
            style={{ color: "var(--fur-text)" }}
            onClick={() => setOpen(!open)}
            aria-label="Menü"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-4 pb-4 pt-2 shadow-md border-t"
          style={{
            background: "var(--fur-nav-bg)",
            borderColor: "var(--fur-border)",
            backdropFilter: "blur(12px)",
          }}
        >
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="block w-full text-left px-4 py-3 rounded-xl transition-colors text-sm"
              style={{ color: "var(--fur-text)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--fur-border)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function ThemeToggle({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="relative w-14 h-7 rounded-full transition-all duration-300 flex items-center px-1"
      style={{
        background: dark
          ? "linear-gradient(135deg, #1a3a22, #2d5a38)"
          : "linear-gradient(135deg, #d1fae5, #a7f3d0)",
        border: "1.5px solid var(--fur-border-strong)",
      }}
      aria-label="Dark/Light Mode umschalten"
      title={dark ? "Light Mode aktivieren" : "Dark Mode aktivieren"}
    >
      {/* Track icons */}
      <Sun size={11} className="absolute left-1.5" style={{ color: dark ? "rgba(255,255,255,0.2)" : "#16A34A" }} />
      <Moon size={11} className="absolute right-1.5" style={{ color: dark ? "#4ADE80" : "rgba(0,0,0,0.15)" }} />
      {/* Thumb */}
      <span
        className="w-5 h-5 rounded-full shadow-md flex items-center justify-center transition-all duration-300 z-10"
        style={{
          background: "var(--fur-grad)",
          transform: dark ? "translateX(28px)" : "translateX(0px)",
        }}
      >
        {dark
          ? <Moon size={11} className="text-white" />
          : <Sun size={11} className="text-white" />
        }
      </span>
    </button>
  );
}

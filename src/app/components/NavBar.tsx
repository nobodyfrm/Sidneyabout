import { useState, useEffect } from "react";
import { Menu, X, PawPrint } from "lucide-react";

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
        >
          <span
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform"
            style={{ background: "linear-gradient(135deg, var(--fur-orange), var(--fur-purple))" }}
          >
            <PawPrint size={16} />
          </span>
          <span
            className="font-black text-lg hidden sm:block"
            style={{ color: "var(--fur-orange)" }}
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
              className="px-4 py-2 rounded-full text-sm transition-all hover:bg-orange-50"
              style={{ color: "var(--fur-text)" }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("#events")}
            className="ml-2 px-4 py-2 rounded-full text-sm text-white transition-all hover:opacity-90 shadow-sm"
            style={{ background: "linear-gradient(135deg, var(--fur-orange), var(--fur-purple))" }}
          >
            🐾 Events ansehen
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 pt-2 shadow-md">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="block w-full text-left px-4 py-3 rounded-xl hover:bg-orange-50 transition-colors text-sm"
              style={{ color: "var(--fur-text)" }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

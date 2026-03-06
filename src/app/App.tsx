import { useState, useEffect, createContext, useContext } from "react";
import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import { EventsSection, Event } from "./components/EventsSection";
import { SocialSection, SocialProfile } from "./components/SocialSection";
import { Footer } from "./components/Footer";

/* ─── Theme Context ──────────────────────────────────── */
interface ThemeCtx {
  dark: boolean;
  toggle: () => void;
}
export const ThemeContext = createContext<ThemeCtx>({ dark: false, toggle: () => {} });
export function useTheme() { return useContext(ThemeContext); }

/* ─── XML Parser helpers ─────────────────────────────── */
function getText(el: Element, tag: string): string {
  return el.querySelector(tag)?.textContent?.trim() ?? "";
}

function parseEvents(doc: Document): Event[] {
  return Array.from(doc.querySelectorAll("event")).map((el) => ({
    id: el.getAttribute("id") ?? Math.random().toString(),
    date: getText(el, "date"),
    dateDisplay: getText(el, "dateDisplay"),
    name: getText(el, "name"),
    type: getText(el, "type"),
    location: getText(el, "location"),
    city: getText(el, "city"),
    remark: getText(el, "remark"),
    isFirst: getText(el, "isFirst") === "true",
  }));
}

function parseSocial(doc: Document): SocialProfile[] {
  return Array.from(doc.querySelectorAll("profile")).map((el) => ({
    platform: getText(el, "platform"),
    handle: getText(el, "handle"),
    url: getText(el, "url"),
    icon: getText(el, "icon"),
    color: getText(el, "color"),
    description: getText(el, "description"),
  }));
}

/* ─── App ────────────────────────────────────────────── */
export default function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [social, setSocial] = useState<SocialProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("sid-theme") === "dark" ||
      (!localStorage.getItem("sid-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  // Apply dark class to document root for CSS variable switching
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("sid-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const parser = new DOMParser();
    let loaded = 0;
    const done = () => { loaded++; if (loaded === 2) setLoading(false); };

    fetch("/data/events.xml")
      .then((r) => r.text())
      .then((text) => { setEvents(parseEvents(parser.parseFromString(text, "application/xml"))); done(); })
      .catch(done);

    fetch("/data/social.xml")
      .then((r) => r.text())
      .then((text) => { setSocial(parseSocial(parser.parseFromString(text, "application/xml"))); done(); })
      .catch(done);
  }, []);

  const toggle = () => setDark((d) => !d);

  if (loading) {
    return (
      <ThemeContext.Provider value={{ dark, toggle }}>
        <div
          className="min-h-screen flex flex-col items-center justify-center gap-4"
          style={{ background: "var(--fur-bg)" }}
        >
          <div className="text-5xl animate-bounce">🐾</div>
          <p style={{ color: "var(--fur-muted)" }} className="text-sm">
            Lade Eventdaten aus XML…
          </p>
        </div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <div className="min-h-screen transition-colors duration-300" style={{ background: "var(--fur-bg)" }}>
        <NavBar />
        <HeroSection eventCount={events.length} />
        <EventsSection events={events} />
        <SocialSection profiles={social} />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

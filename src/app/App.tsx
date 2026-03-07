import { useState, useEffect } from "react";
import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import { EventsSection, Event } from "./components/EventsSection";
import { SocialSection, SocialProfile } from "./components/SocialSection";
import { Footer } from "./components/Footer";

/* ─── XML Parser helpers ─────────────────────────────────────────── */
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
    firstType: getText(el, "firstType") || undefined,
    isFuture: getText(el, "isFuture") === "true",
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

/* ─── App ────────────────────────────────────────────────────────── */
export default function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [social, setSocial] = useState<SocialProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const parser = new DOMParser();
    let loaded = 0;
    const done = () => {
      loaded++;
      if (loaded === 2) setLoading(false);
    };

    fetch("/data/events.xml")
      .then((r) => r.text())
      .then((text) => {
        const doc = parser.parseFromString(text, "application/xml");
        setEvents(parseEvents(doc));
        done();
      })
      .catch(() => done());

    fetch("/data/social.xml")
      .then((r) => r.text())
      .then((text) => {
        const doc = parser.parseFromString(text, "application/xml");
        setSocial(parseSocial(doc));
        done();
      })
      .catch(() => done());
  }, []);

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "var(--fur-warm-bg)" }}
      >
        <div className="text-5xl animate-bounce">🐾</div>
        <p style={{ color: "var(--fur-muted)" }} className="text-sm">
          Lade Eventdaten aus XML…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--fur-warm-bg)" }}>
      <NavBar />
      <HeroSection eventCount={events.length} events={events} />
      <EventsSection events={events} />
      <SocialSection profiles={social} />
      <Footer />
    </div>
  );
}
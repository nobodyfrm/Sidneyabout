import { useState, useEffect } from "react";
import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import { FursuitSection } from "./components/FursuitSection";
import { EventsSection, Event } from "./components/EventsSection";
import { SocialSection, SocialProfile } from "./components/SocialSection";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";

/* ─── XML Parser helpers ─────────────────────────────────────────── */
function getText(el: Element, tag: string): string {
  return el.querySelector(tag)?.textContent?.trim() ?? "";
}

function parseEvents(doc: Document): Event[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison

  return Array.from(doc.querySelectorAll("event")).map((el) => {
    const dateStr = getText(el, "date");
    const eventDate = new Date(dateStr);
    eventDate.setHours(0, 0, 0, 0);
    
    // Event is in the future if its date is after today
    const isFuture = eventDate > today;

    return {
      id: el.getAttribute("id") ?? Math.random().toString(),
      date: dateStr,
      dateDisplay: getText(el, "dateDisplay"),
      name: getText(el, "name"),
      type: getText(el, "type"),
      location: getText(el, "location"),
      city: getText(el, "city"),
      remark: getText(el, "remark"),
      isFirst: getText(el, "isFirst") === "true",
      firstType: getText(el, "firstType") || undefined,
      isFuture: isFuture,
      attendance: (getText(el, "attendance") as "confirmed" | "maybe" | "cancelled" | undefined) || undefined,
    };
  });
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

    fetch("./data/events.xml")
      .then((r) => r.text())
      .then((text) => {
        const doc = parser.parseFromString(text, "application/xml");
        setEvents(parseEvents(doc));
        done();
      })
      .catch(() => done());

    fetch("./data/social.xml")
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
        style={{ background: "var(--color-bg)" }}
      >
        <div className="text-5xl animate-bounce">🐾</div>
        <p style={{ color: "var(--color-text-muted)" }} className="text-sm">
          Lade Eventdaten aus XML…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <NavBar />
      <HeroSection eventCount={events.length} events={events} />
      <SocialSection profiles={social} />
      <EventsSection events={events} />
      <FursuitSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import img1 from "figma:asset/0f605921e0eb8666633a71da8fc8b6b510f44af6.png";
import img2 from "figma:asset/33989908c365674362159e717b4e232a0a8f5335.png";
import img3 from "figma:asset/c6530cbf108d97c7e43634c110fb5f305fd0f983.png";
import img4 from "figma:asset/254e24e8d2702e8a55937ac8501292608b34754d.png";
import img5 from "figma:asset/5a9a198a352e6530dd98b56c11c593da4d956603.png";
import img6 from "figma:asset/c91fadabe285f30139faff58c22c99d2e0d8a117.png";
import img7 from "figma:asset/69678d416f641391f1e116051407ed64cf6b82cb.png";
import img8 from "figma:asset/c2f328dbc243b1638e974a5354afaae1c7794786.png";
import img9 from "figma:asset/51099819b22fa039841c4c31317ccc2e97679514.png";
import img10 from "figma:asset/8bff0456fa863d3c46364eeb5a7346f807098679.png";
import img11 from "figma:asset/db214d6eede4ef98555599af183d49886c7597d1.png";
import img12 from "figma:asset/38063b935abb0bbab97207e663235eb4720b400a.png";
import img13 from "figma:asset/cb4e1247d9307a00abafa9defc320683bff7b6a5.png";
import img14 from "figma:asset/bacf7564a109ccdd6565d3a27dfd3a93e3b4cfe5.png";
import img15 from "figma:asset/a36ecdf065cbb738a3848a90926ab2120f857a18.png";
import img16 from "figma:asset/c614da7f3d62021f4c91e6c979263f40d24b0b93.png";
import img17 from "figma:asset/7514c97377bb52cb8e65f48273e9f1dadae53ae3.png";
import img18 from "figma:asset/6c56b29823058b0f0a41699245fdfed22e1bd0b0.png";
import img19 from "figma:asset/b6a5e856dd907615053287b95d96243f5bf90ce7.png";
import img20 from "figma:asset/1e05cd70f87a37babd0a6f73bb6f69e0a69961e0.png";
import img21 from "figma:asset/8ffae0965743124b82939d227e024d5af59417f7.png";
import img22 from "figma:asset/142c275aea9db026e8e7c0e18bc75955eabb2a2c.png";
import img23 from "figma:asset/d5ab7daa3eeb1f7e85ba2dd38bc659b924253af8.png";
import img24 from "figma:asset/0a8f14ab95afb399f08c6f9bcdea690a7afa0278.png";
import img25 from "figma:asset/8434fb9e829584e900e6b7a4fc736a31105a0ab0.png";
import img26 from "figma:asset/5a48f96566aa9bdf7aba57260a3906af5cc848de.png";
import img27 from "figma:asset/15b3da0a301f8cd2a73656af03c5bb9e907f636a.png";
import img28 from "figma:asset/85800bafa99c3de948fecedb3cca7ce58c3f1162.png";
import img29 from "figma:asset/8efa18890d270e1de61f7e7f90222a6605a5ba3c.png";
import img30 from "figma:asset/b2f68f0c31663cab9bfa8e4766c707342305b16a.png";
import img31 from "figma:asset/7ad66b832f22a14ff20a76b6fd08b96d85637c61.png";
import img32 from "figma:asset/0b1f91ef64fb2d23315087b342fbd7ef49fc1ca5.png";
import img33 from "figma:asset/a88500d2fb637a030f2dd50eb5085b8c55c4bb69.png";
import img34 from "figma:asset/2913347a40e5f6cdf7712fa4f0f909595d9f575a.png";
import img35 from "figma:asset/6a93b9509dd11feb306dcb340f2f6fa549009a93.png";
import img36 from "figma:asset/6561fd302673bb16a80523750dbc9dcd9e03766b.png";
import img37 from "figma:asset/7c1332c80bd673b5f79da1cb228a25cabc8466a7.png";
import img38 from "figma:asset/17d5547bcacd1e9a901ff372350d684f7398334f.png";
import img39 from "figma:asset/7323ed1cee5cd2dad91a2a2616393af911e201dd.png";
import img40 from "figma:asset/a531ea7ea6bdad5514e2b0eb5a92da9f409c3200.png";
import img41 from "figma:asset/0b1f91ef64fb2d23315087b342fbd7ef49fc1ca5.png";
import img42 from "figma:asset/b0bdf2a9aae78f5b307979b6019639b5882b101c.png";
import img43 from "figma:asset/23e061551bf5079f96301bfc354f92aaf5758d9a.png";
import img44 from "figma:asset/0be5127842048044353aa4020357390e4fe0bba9.png";
import img45 from "figma:asset/3fb7fda4f60fc2071583f0f4878021fa1bfd3f79.png";
import img46 from "figma:asset/59b3ad4137176db5d16bcbea4af4e3c97db342f9.png";
import img47 from "figma:asset/d599928bbba19a6ed9a852a344f62cdce8699100.png";
import img48 from "figma:asset/c549b8a0288f13f8c385b479f2935c35dc904012.png";
import img49 from "figma:asset/fdfc2343d0b688ddf04e72d9e618864f23946469.png";
import img50 from "figma:asset/0149aa334ab70171dc36cabe20679cf369537521.png";
import img51 from "figma:asset/1964f322dd67816b1c52c1a82e1a74006b43b943.png";
import img52 from "figma:asset/46dd4f3421e68a5b2d1c8979c8baf4c14cf48f28.png";
import img53 from "figma:asset/58f6baa5224f90d555dc96f44740a05887871892.png";
import img54 from "figma:asset/3776520981b7dfbe7fbf194ac0778fe94841ee3a.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function FursuitSection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Dummy data for timeline - user will replace images later
  const timeline = [
    {
      id: 1,
      title: "Inspiration & Vorbild",
      date: "Herbst 2025",
      description: "Sidney, mein Australian Shepherd/Labrador Mix — die Inspiration für meinen Fursuit-Charakter.",
      image: img1,
    },
    {
      id: 2,
      title: "Character Design",
      date: "Winter 2025",
      description: "Ausarbeitung des Charakterdesigns mit grünem Halstuch und allen wichtigen Details.",
      image: img2,
    },
    {
      id: 3,
      title: "Fullsuit Konzept",
      date: "Januar 2026",
      description: "Detaillierte Referenzblätter für den Fullsuit mit Front-, Seiten- und Rückansicht.",
      image: img3,
    },
    {
      id: 4,
      title: "Kopf - Grundstruktur",
      date: "Februar 2026",
      description: "Der Fursuit-Kopf nimmt Form an — erste Schaumstoffstruktur mit Augen- und Schnauzenöffnungen.",
      image: img4,
    },
    {
      id: 5,
      title: "Kopf - Innenausbau",
      date: "März 2026",
      description: "Innenansicht des Kopfes mit Polsterung und Struktur für optimalen Tragekomfort.",
      image: img5,
    },
    {
      id: 6,
      title: "Kopf - Detailarbeit",
      date: "April 2026",
      description: "Feine Detailarbeit am Kopf, um ihn realistischer zu gestalten.",
      image: img6,
    },
    {
      id: 7,
      title: "Körper - Grundstruktur",
      date: "Mai 2026",
      description: "Erste Grundstruktur für den Körper des Fursuits.",
      image: img7,
    },
    {
      id: 8,
      title: "Körper - Detailarbeit",
      date: "Juni 2026",
      description: "Feine Detailarbeit am Körper, um ihn realistischer zu gestalten.",
      image: img8,
    },
    {
      id: 9,
      title: "Körper - Polsterung",
      date: "Juli 2026",
      description: "Hinzufügen von Polsterung für optimalen Tragekomfort.",
      image: img9,
    },
    {
      id: 10,
      title: "Fertigstellung",
      date: "August 2026",
      description: "Fertigstellung des Fursuits — der letzte Schritt der Reise.",
      image: img10,
    },
    {
      id: 11,
      title: "Augen - Mesh & Iris",
      date: "September 2026",
      description: "Gestaltung der Augen mit grün-gelben Iriden auf Mesh-Material für lebendigen Blick.",
      image: img11,
    },
    {
      id: 12,
      title: "Kopf - Mit Schnauze",
      date: "September 2026",
      description: "Der Kopf bekommt die charakteristische gelbe Schnauze und nimmt Gestalt an.",
      image: img12,
    },
    {
      id: 13,
      title: "Kopf - Seitenansicht",
      date: "Oktober 2026",
      description: "Seitenansicht mit Augenöffnungen und gelber Schnauzenpartie — die Form wird deutlich.",
      image: img13,
    },
    {
      id: 14,
      title: "Kopf - Felldetails",
      date: "Oktober 2026",
      description: "Weitere Detailarbeit mit gelbem Fell an der Schnauze für mehr Realismus.",
      image: img14,
    },
    {
      id: 15,
      title: "Kopf - Farbakzente",
      date: "November 2026",
      description: "Hinzufügen von weißem und grauem Fell mit schwarzen Markierungen für charakteristische Details.",
      image: img15,
    },
    {
      id: 16,
      title: "Kopf mit Ohren - Front",
      date: "Dezember 2026",
      description: "Frontansicht des Kopfes mit großen, charakteristischen Ohren und ausgeprägten Augenöffnungen.",
      image: img16,
    },
    {
      id: 17,
      title: "Kopf mit Ohren - Seite",
      date: "Dezember 2026",
      description: "Seitenansicht des Kopfes mit detaillierten Ohren und klarer Kopfform.",
      image: img17,
    },
    {
      id: 18,
      title: "Kopf mit Ohren - Detail",
      date: "Dezember 2026",
      description: "Detailansicht der Ohrstruktur und Kopfproportionen — die Form wird immer präziser.",
      image: img18,
    },
    {
      id: 19,
      title: "Kopf mit Fell - Augen & Schnauze",
      date: "Januar 2027",
      description: "Der Kopf bekommt grüne Mesh-Augen und gelbes Fell auf der Schnauze — Sidney nimmt Gestalt an!",
      image: img19,
    },
    {
      id: 20,
      title: "Kopf mit Fell - Seitenansicht",
      date: "Januar 2027",
      description: "Seitenansicht mit grauem und gelbem Fell — die charakteristischen Farbmarkierungen werden sichtbar.",
      image: img20,
    },
    {
      id: 21,
      title: "Kopf - Innenansicht mit Nase",
      date: "Februar 2027",
      description: "Innenansicht des Kopfes mit schwarzer Schnauzenpolsterung und weißem Fell-Innenfutter.",
      image: img21,
    },
    {
      id: 22,
      title: "Kopf vollständig befellt - Seitenansicht",
      date: "Februar 2027",
      description: "Der Kopf ist jetzt vollständig mit Fell bedeckt — graues Gesicht, gelbe Schnauze und weiße Akzente!",
      image: img22,
    },
    {
      id: 23,
      title: "Kopf vollständig befellt - Weitere Ansicht",
      date: "Februar 2027",
      description: "Seitenansicht des vollständig befelten Kopfes mit schwarzer Nase und weißer Schnauze.",
      image: img23,
    },
    {
      id: 24,
      title: "Kopf mit farbigen Ohren - Front",
      date: "März 2027",
      description: "Frontansicht mit mehrfarbigen Ohren — beige innen, schwarz umrandet — Sidney wird immer lebendiger!",
      image: img24,
    },
    {
      id: 25,
      title: "Kopf - Nahaufnahme Front",
      date: "März 2027",
      description: "Nahaufnahme der Frontansicht — die Details der Schnauze und das Fell werden immer realistischer.",
      image: img25,
    },
    {
      id: 26,
      title: "Kopf fertig - Mit Zunge!",
      date: "März 2027",
      description: "Der fertige Kopf mit sichtbarer Zunge und fröhlichem Ausdruck — Sidney ist zum Leben erwacht! 😄",
      image: img26,
    },
    {
      id: 27,
      title: "🎉 Erste Trageprobe!",
      date: "März 2027",
      description: "Der große Moment — die erste Trageprobe des Fursuit-Kopfes! Sidney lebt! 🐾",
      image: img27,
    },
    {
      id: 28,
      title: "Werkstatt-Ansicht auf Tisch",
      date: "März 2027",
      description: "Blick auf den fertigen Kopf in der Werkstatt — alle Details sind perfekt verarbeitet.",
      image: img28,
    },
    {
      id: 29,
      title: "Seitenansicht auf Tisch",
      date: "März 2027",
      description: "Seitenansicht des fertigen Kopfes — die Proportionen und das Fell sitzen perfekt!",
      image: img29,
    },
    {
      id: 30,
      title: "📦 Versandfertig im Karton",
      date: "März 2027",
      description: "Der fertige Kopf sicher verpackt im Karton — bereit für den Versand oder Transport!",
      image: img30,
    },
    {
      id: 31,
      title: "Kopf von oben - Felldetails",
      date: "März 2027",
      description: "Draufsicht auf den Kopf zeigt die verschiedenen Fellfarben — grau, beige und schwarz perfekt kombiniert!",
      image: img31,
    },
    {
      id: 32,
      title: "Kopf fertig - Mit Zähnen & grünen Augen",
      date: "März 2027",
      description: "Frontansicht mit allen Details — leuchtend grüne Augen, weiße Zähne und perfekte Proportionen! 😍",
      image: img32,
    },
    {
      id: 33,
      title: "🎉 Zweite Trageprobe!",
      date: "März 2027",
      description: "Noch eine Trageprobe — Sidney sitzt perfekt und sieht fantastisch aus! Der Charakter lebt! 🐾✨",
      image: img33,
    },
    {
      id: 34,
      title: "🎊 Sidney im Freien - Con Badge!",
      date: "März 2027",
      description: "Sidney beim ersten Outdoor-Shooting mit Con-Badge! Der Fursuit sitzt perfekt und sieht fantastisch aus! 🐾",
      image: img34,
    },
    {
      id: 35,
      title: "🌲 Sidney Outdoor - Fröhliche Pose",
      date: "März 2027",
      description: "Sidney in voller Pracht draußen — der Fursuit lebt und der Charakter strahlt Lebensfreude aus! 😊",
      image: img35,
    },
    {
      id: 36,
      title: "😛 Sidney macht Blep!",
      date: "März 2027",
      description: "Sidney zeigt seine verspielte Seite mit herausgestreckter Zunge — einfach zu süß! 🐕💚",
      image: img36,
    },
    {
      id: 37,
      title: "Kopf in der Werkstatt",
      date: "März 2027",
      description: "Der fertige Kopf in heller Werkstatt-Umgebung — bereit für weitere Arbeiten und Details!",
      image: img37,
    },
    {
      id: 38,
      title: "🐾 Handpaws fertiggestellt!",
      date: "März 2027",
      description: "Die Handpaws sind fertig — schwarzes Fell mit weißen Ballen und Zehen! Perfekt für Sidney! 🐾",
      image: img38,
    },
    {
      id: 39,
      title: "🌲 Sidney Outdoor - Seitenansicht",
      date: "März 2027",
      description: "Seitlicher Blick auf Sidney im Freien — die Ohren und Details kommen perfekt zur Geltung! 😊",
      image: img39,
    },
    {
      id: 40,
      title: "🏷️ Sidney mit Namensschild!",
      date: "März 2027",
      description: "Sidney zeigt stolz sein Namensschild draußen im Grünen — der Charakter ist komplett! 🐕💚",
      image: img40,
    },
    {
      id: 41,
      title: "Kopf in der Hand - Grüne Augen",
      date: "April 2027",
      description: "Nahaufnahme des fertigen Kopfes in der Hand — die leuchtend grünen Augen und weißen Zähne erstrahlen! 😍",
      image: img41,
    },
    {
      id: 42,
      title: "Kopf von oben - Blick ins Auge",
      date: "April 2027",
      description: "Perspektive von oben in den Kopf — ein grünes Auge und die weiße Schnauze mit schwarzer Nase! 🐾",
      image: img42,
    },
    {
      id: 43,
      title: "🎉 Kompletter Fullsuit-Body!",
      date: "April 2027",
      description: "Der komplette Fursuit-Body ausgebreitet — Kopf, Körper und alle Teile vereint! Sidney ist komplett! 🐕✨",
      image: img43,
    },
    {
      id: 44,
      title: "🐾 Sidney-Trageprobe - Pfoten hoch!",
      date: "April 2027",
      description: "Sidney wird getragen — Pfoten an den Ohren und fröhlicher Ausdruck! Der Charakter erwacht zum Leben! 🎊",
      image: img44,
    },
    {
      id: 45,
      title: "🐾 Sidney-Trageprobe - Variation",
      date: "April 2027",
      description: "Noch eine Trageprobe mit Pfoten an den Ohren — Sidney strahlt pure Lebensfreude aus! 💚🐕",
      image: img45,
    },
    {
      id: 46,
      title: "🏠 Sidney Indoor - Klassische Pose",
      date: "April 2027",
      description: "Sidney zuhause mit klassischer Pose — der Charakter sitzt perfekt und strahlt Persönlichkeit aus! 🐾",
      image: img46,
    },
    {
      id: 47,
      title: "🏠 Sidney Indoor - Seitenansicht",
      date: "April 2027",
      description: "Seitlicher Blick auf Sidney zuhause — die Ohren und das Fell kommen wunderschön zur Geltung! 😊",
      image: img47,
    },
    {
      id: 48,
      title: "🏠 Sidney Indoor - Schüchterne Pose",
      date: "April 2027",
      description: "Sidney in schüchterner Pose mit leicht gesenktem Kopf — so süß und charakterstark! 💚",
      image: img48,
    },
    {
      id: 49,
      title: "🏠 Sidney Indoor - Aufwärts blickend",
      date: "April 2027",
      description: "Sidney schaut nach oben — die grünen Augen und die lebendige Mimik sind einfach fantastisch! ✨",
      image: img49,
    },
    {
      id: 50,
      title: "🏠 Sidney Indoor - Seitenprofil",
      date: "April 2027",
      description: "Perfektes Seitenprofil von Sidney — alle Details des Kopfes kommen großartig zur Geltung! 🐕💚",
      image: img50,
    },
    {
      id: 51,
      title: "🏠 Sidney am Tisch - Pfoten halten Kopf",
      date: "April 2027",
      description: "Sidney sitzt am Tisch und hält die Pfoten am Kopf — so eine süße und verspielte Pose! 😊🐾",
      image: img51,
    },
    {
      id: 52,
      title: "🏠 Sidney am Tisch - Entspannte Haltung",
      date: "April 2027",
      description: "Sidney sitzt entspannt am Tisch — der Charakter wirkt so lebendig und natürlich! 💚",
      image: img52,
    },
    {
      id: 53,
      title: "🏠 Sidney am Tisch - Frontansicht",
      date: "April 2027",
      description: "Frontale Ansicht von Sidney am Tisch — die grünen Augen und der fröhliche Ausdruck sind perfekt! ✨",
      image: img53,
    },
    {
      id: 54,
      title: "📐 Tail Pattern - Schnittmuster für den Schwanz",
      date: "April 2027",
      description: "Das Schnittmuster für Sidneys Schwanz — detaillierte Planung für das perfekte Tail-Design! 🐾✂️",
      image: img54,
    },
  ];

  const totalPages = Math.ceil(timeline.length / itemsPerPage);
  const currentItems = timeline.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImage === null) return;
    const currentIndex = timeline.findIndex((t) => t.id === selectedImage);
    if (currentIndex > 0) {
      setSelectedImage(timeline[currentIndex - 1].id);
    }
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImage === null) return;
    const currentIndex = timeline.findIndex((t) => t.id === selectedImage);
    if (currentIndex < timeline.length - 1) {
      setSelectedImage(timeline[currentIndex + 1].id);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, timeline]);

  return (
    <section
      id="fursuit"
      className="py-16 px-4"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--max-content-width)" }}>
        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4 border"
            style={{
              background: "rgba(139, 92, 246, 0.1)",
              borderColor: "rgba(139, 92, 246, 0.3)",
              color: "var(--color-accent-purple)",
              fontWeight: 600,
            }}
          >
            <Sparkles size={14} />
            <span>Work in Progress</span>
          </div>
          <h2
            className="text-3xl mb-2"
            style={{
              fontWeight: 800,
              color: "var(--color-primary)",
            }}
          >
            ✨ Mein Fursuit entsteht
          </h2>
          <p className="text-sm max-w-2xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
            Folge der Entstehung meines Fursuits — von den ersten Skizzen bis zum fertigen Anzug.
            Hier dokumentiere ich jeden Schritt dieser aufregenden Reise!
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {currentItems.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-4 items-start"
            >
              {/* Timeline connector */}
              <div className="hidden md:flex flex-col items-center flex-shrink-0 w-24">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md"
                  style={{
                    background: "var(--color-primary)",
                    fontWeight: 700,
                  }}
                >
                  {item.id}
                </div>
                {index < currentItems.length - 1 && (
                  <div
                    className="w-0.5 h-full mt-2"
                    style={{ background: "var(--color-border)" }}
                  />
                )}
              </div>

              {/* Content Card */}
              <div
                className="flex-1 rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-all"
                style={{
                  background: "var(--color-card-bg)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div
                    className="relative aspect-video md:aspect-square overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedImage(item.id)}
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
                    <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs text-black bg-white/90 backdrop-blur-sm">
                      🔍 Vergrößern
                    </div>
                  </div>

                  {/* Text */}
                  <div className="p-6">
                    <div
                      className="text-xs mb-2"
                      style={{ color: "var(--color-primary)", fontWeight: 600 }}
                    >
                      {item.date}
                    </div>
                    <h3
                      className="text-xl mb-3"
                      style={{ color: "var(--color-text)", fontWeight: 700 }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {item.description}
                    </p>

                    {/* Mobile step indicator */}
                    <div className="md:hidden mt-4">
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border"
                        style={{
                          background: "rgba(46, 125, 50, 0.1)",
                          borderColor: "rgba(46, 125, 50, 0.3)",
                          color: "var(--color-primary)",
                          fontWeight: 600,
                        }}
                      >
                        Schritt {index + 1} von {timeline.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center gap-4 mt-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-6 py-3 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: currentPage === 1 ? "var(--color-border)" : "var(--color-primary)",
                color: "white",
                fontWeight: 600,
              }}
            >
              ← Vorherige
            </button>
            <div
              className="px-4 py-2 rounded-lg"
              style={{
                background: "var(--color-card-bg)",
                color: "var(--color-text)",
                fontWeight: 600,
                border: "1px solid var(--color-border)",
              }}
            >
              Seite {currentPage} von {totalPages}
            </div>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-6 py-3 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: currentPage === totalPages ? "var(--color-border)" : "var(--color-primary)",
                color: "white",
                fontWeight: 600,
              }}
            >
              Nächste →
            </button>
          </div>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            Zeige {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, timeline.length)} von {timeline.length} Bildern
          </p>
        </div>

        {/* Info Box */}
        <div
          className="mt-10 p-6 rounded-2xl border text-center"
          style={{
            background: "rgba(46, 125, 50, 0.05)",
            borderColor: "rgba(46, 125, 50, 0.2)",
          }}
        >
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            <strong style={{ color: "var(--color-primary)" }}>📸 Galerie:</strong>{" "}
            Hier zeige ich 54 von insgesamt 55 Bildern der Entstehung meines Fursuits.
            Klicke auf ein Bild, um es zu vergrößern! Nutze die Pfeiltasten ← → zum Blättern und Esc zum Schließen.
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (() => {
        const currentItem = timeline.find((t) => t.id === selectedImage);
        const currentIndex = timeline.findIndex((t) => t.id === selectedImage);
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedImage(null)}
            style={{ padding: "2rem" }}
          >
            <div className="relative max-w-4xl w-full my-auto" onClick={(e) => e.stopPropagation()}>
              <ImageWithFallback
                src={currentItem?.image || ""}
                alt={currentItem?.title || ""}
                className="w-full h-auto rounded-2xl shadow-2xl"
                style={{ maxHeight: "calc(100vh - 200px)", objectFit: "contain" }}
              />
              
              {/* Image Info */}
              <div
                className="mt-4 p-4 rounded-2xl"
                style={{
                  background: "rgba(0, 0, 0, 0.8)",
                }}
              >
                <h3 className="text-white text-lg mb-1" style={{ fontWeight: 700 }}>
                  {currentItem?.title}
                </h3>
                <p className="text-white/80 text-sm mb-2">{currentItem?.description}</p>
                <p className="text-white/60 text-xs">
                  Bild {currentIndex + 1} von {timeline.length} • {currentItem?.date}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-white bg-black/70 hover:bg-black/90 transition-all"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
              >
                ✕
              </button>

              {/* Previous Button */}
              {currentIndex > 0 && (
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/3 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all shadow-lg"
                  style={{
                    background: "var(--color-primary)",
                    opacity: 0.9,
                  }}
                  title="Vorheriges Bild (Pfeil links)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Next Button */}
              {currentIndex < timeline.length - 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/3 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all shadow-lg"
                  style={{
                    background: "var(--color-primary)",
                    opacity: 0.9,
                  }}
                  title="Nächstes Bild (Pfeil rechts)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        );
      })()}
    </section>
  );
}
import { useState } from "react";
import { Sparkles } from "lucide-react";
import img1 from "figma:asset/0f605921e0eb8666633a71da8fc8b6b510f44af6.png";
import img2 from "figma:asset/33989908c365674362159e717b4e232a0a8f5335.png";
import img3 from "figma:asset/c6530cbf108d97c7e43634c110fb5f305fd0f983.png";
import img4 from "figma:asset/254e24e8d2702e8a55937ac8501292608b34754d.png";
import img5 from "figma:asset/5a9a198a352e6530dd98b56c11c593da4d956603.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function FursuitSection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
  ];

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
          {timeline.map((item, index) => (
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
                  {index + 1}
                </div>
                {index < timeline.length - 1 && (
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
                    <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs bg-white/90 backdrop-blur-sm">
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
            Hier zeige ich 5 von insgesamt 55 Bildern der Entstehung meines Fursuits.
            Klicke auf ein Bild, um es zu vergrößern!
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <ImageWithFallback
              src={timeline.find((t) => t.id === selectedImage)?.image || ""}
              alt={timeline.find((t) => t.id === selectedImage)?.title || ""}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white bg-black/50 hover:bg-black/70 transition-all"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
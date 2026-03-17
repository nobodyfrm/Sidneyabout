import { useState } from "react";
import { Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function FursuitSection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Dummy data for timeline - user will replace images later
  const timeline = [
    {
      id: 1,
      title: "Konzeptphase",
      date: "Januar 2026",
      description: "Die ersten Skizzen und Ideen für meinen Fursuit entstehen.",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      title: "Planung & Design",
      date: "Februar 2026",
      description: "Farbauswahl, Materialien und detaillierte Planungen mit dem Maker.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      title: "Kopf in Arbeit",
      date: "März 2026",
      description: "Der Fursuit-Kopf nimmt Form an — erste Grundstruktur steht!",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      title: "Details & Finishing",
      date: "April 2026",
      description: "Feinarbeiten, Augen, Zunge und weitere Details werden hinzugefügt.",
      image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&h=600&fit=crop",
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
            <strong style={{ color: "var(--color-primary)" }}>📸 Hinweis:</strong>{" "}
            Die Bilder sind Platzhalter und werden bald durch echte Fotos meiner
            Fursuit-Entstehung ersetzt!
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

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show button when scrolled down 500px
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all z-40 hover:scale-110"
      style={{
        background: "var(--color-primary)",
      }}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}

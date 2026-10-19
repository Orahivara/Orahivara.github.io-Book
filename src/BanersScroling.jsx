import { useRef } from "react";
import { useEffect } from "react";
export default function BanersScrolling({ children }) {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    const userScroll = () => {
      const left = container.scrollLeft;
      const clientWidth = container.clientWidth;
      const scrollWidth = container.scrollWidth;
      if (clientWidth + left >= scrollWidth - 1) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    };
    container.addEventListener("scroll", userScroll);
    return () => {
      container.removeEventListener("scroll", userScroll);
    };
  }, []);
  return (
    <div ref={containerRef} className="bannerscroll">
      {children}
    </div>
  );
}

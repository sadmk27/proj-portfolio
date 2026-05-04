import { getBackgroundUrl } from "@portfolio/assets";
import React from "react";

const BackgroundParallax: React.FC = () => {
  const backgroundRef = React.useRef<HTMLDivElement>(null);
  const deepSpaceUrl = getBackgroundUrl("background.jpg");

  React.useEffect(() => {
    const handleScroll = () => {
      if (!backgroundRef.current) return;

      const scrollY = window.scrollY;
      const parallaxOffset = -scrollY * 0.3; // Adjust multiplier for parallax intensity

      backgroundRef.current.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        ref={backgroundRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${deepSpaceUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
        }}
      />
    </div>
  );
};

export default BackgroundParallax;

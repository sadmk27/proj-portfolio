import { getBackgroundUrl } from "@portfolio/assets";
import React from "react";

const PARALLAX_MULTIPLIER = 0.05;
const PARALLAX_OVERFLOW = "30%";

const BackgroundParallax: React.FC = () => {
  const backgroundRef = React.useRef<HTMLDivElement>(null);
  const [backgroundUrl, setBackgroundUrl] = React.useState<string | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const deepSpaceUrl = getBackgroundUrl("background.jpg");
    setBackgroundUrl(deepSpaceUrl);
  }, []);

  React.useEffect(() => {
    if (!backgroundUrl) {
      return;
    }

    const handleScroll = () => {
      if (!backgroundRef.current) {
        return;
      }

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const maxOffset = maxScroll * PARALLAX_MULTIPLIER;

      backgroundRef.current.parentElement!.style.setProperty(
        "--parallax-offset",
        `${maxOffset}px`,
      );

      const scrollY = window.scrollY;

      backgroundRef.current.style.transform = `translate3d(0, ${-scrollY * PARALLAX_MULTIPLIER}px, 0)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [backgroundUrl]);

  if (!backgroundUrl) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        ref={backgroundRef}
        className="absolute inset-0"
        style={{
          position: "absolute",
          top: `-${PARALLAX_OVERFLOW}`,
          left: 0,
          right: 0,
          bottom: `-${PARALLAX_OVERFLOW}`,
          backgroundImage: `url(${backgroundUrl})`,
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

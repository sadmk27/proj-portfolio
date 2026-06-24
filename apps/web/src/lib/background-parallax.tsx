import { getBackgroundUrl } from "@portfolio/assets";
import { useTheme } from "next-themes";
import React from "react";
import type { Theme } from "../theme-provider";

const PARALLAX_MULTIPLIER = 0.05;

function getBackgroundUrlForTheme(theme: Theme) {
  return getBackgroundUrl(
    theme === "light" ? "background-light.png" : "background.jpg",
  );
}

const BackgroundParallax: React.FC = () => {
  const backgroundRef = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  const backgroundUrl = React.useMemo(
    () => getBackgroundUrlForTheme(theme),
    [theme],
  );

  const getOverflow = React.useCallback(() => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    return Math.ceil(maxScroll * PARALLAX_MULTIPLIER);
  }, []);

  React.useEffect(() => {
    const el = backgroundRef.current;
    if (!el) {
      return;
    }

    if (backgroundUrl) {
      el.style.backgroundImage = `url(${backgroundUrl})`;
      el.style.backgroundSize = "cover";
      el.style.backgroundPosition = "center center";
      el.style.backgroundRepeat = "no-repeat";
    } else {
      el.style.backgroundImage = "";
      el.style.backgroundColor = "var(--background)";
    }

    const applyOverflow = () => {
      const overflow = getOverflow();
      el.style.top = `-${overflow}px`;
      el.style.bottom = `-${overflow}px`;
    };

    const handleScroll = () => {
      const offset = window.scrollY * PARALLAX_MULTIPLIER;
      el.style.transform = `translate3d(0, -${offset}px, 0)`;
    };

    applyOverflow();
    handleScroll();

    const resizeObserver = new ResizeObserver(applyOverflow);
    resizeObserver.observe(document.documentElement);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [backgroundUrl, getOverflow]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        ref={backgroundRef}
        style={
          backgroundUrl
            ? {
                position: "absolute",
                inset: 0,
                willChange: "transform",
                transform: "translate3d(0, 0, 0)",
              }
            : {
                position: "absolute",
                inset: 0,
                backgroundColor: "var(--background)",
              }
        }
      />
    </div>
  );
};

export default BackgroundParallax;

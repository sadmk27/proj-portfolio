import { getBackgroundUrl } from "@portfolio/assets";
import React from "react";

const BackgroundParallax: React.FC = () => {
  const backgroundRef = React.useRef<HTMLDivElement>(null);
  const deepSpaceUrl = getBackgroundUrl("background.jpg");

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div
        ref={backgroundRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${deepSpaceUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
    </div>
  );
};

export default BackgroundParallax;

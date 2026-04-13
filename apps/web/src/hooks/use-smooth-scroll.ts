import { useEffect } from "react";
import { lenisProvider } from "@/lenis-provider";

export const useSmoothScroll = (options = {}) => {
  useEffect(() => {
    lenisProvider.init(options);

    const observer = new MutationObserver(() => {
      lenisProvider.update();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => {
      observer.disconnect();
      lenisProvider.destroy();
    };
  }, []);

  return lenisProvider;
};

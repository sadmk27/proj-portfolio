import { useSyncExternalStore, useCallback } from "react";
import { lenisProvider } from "@/lenis-provider";

export const useScrollToTop = (threshold = 300) => {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const lenis = lenisProvider.getInstance();
    if (lenis) {
      lenis.on("scroll", onStoreChange);
    }
    window.addEventListener("scroll", onStoreChange);

    return () => {
      if (lenis) {
        lenis.off("scroll", onStoreChange);
      }
      window.removeEventListener("scroll", onStoreChange);
    };
  }, []);

  const isVisible = useSyncExternalStore(
    subscribe,
    useCallback(() => {
      const lenis = lenisProvider.getInstance();
      const scroll = lenis
        ? lenis.scroll
        : typeof window !== "undefined"
          ? window.scrollY
          : 0;
      return scroll > threshold;
    }, [threshold]),
    () => false,
  );

  const scrollToTop = () => {
    lenisProvider.scrollToTop();
  };

  return { isVisible, scrollToTop };
};

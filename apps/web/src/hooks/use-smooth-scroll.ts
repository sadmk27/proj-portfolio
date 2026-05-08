import { useEffect, useRef } from "react";
import { lenisProvider } from "@/lenis-provider";
import type { LenisOptions } from "lenis";

export const useSmoothScroll = (options: LenisOptions = {}) => {
  const optionsRef = useRef(options);
  useEffect(() => {
    lenisProvider.init(optionsRef.current);

    return () => {
      lenisProvider.destroy();
    };
  }, []);

  return lenisProvider;
};

import { useEffect } from "react";
import { lenisProvider } from "@/lenis-provider";
import type { LenisOptions } from "lenis";

export const useSmoothScroll = (options: LenisOptions = {}) => {
  useEffect(() => {
    lenisProvider.init(options);

    return () => {
      lenisProvider.destroy();
    };
  }, [options]);

  return lenisProvider;
};

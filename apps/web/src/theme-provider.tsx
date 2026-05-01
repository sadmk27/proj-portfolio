import { type PropsWithChildren } from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

import { themeValidator } from "./theme-schema";
export type { Theme } from "./theme-schema";
export { themeValidator };

export { getTheme, setTheme } from "./server/theme";

export function ThemeProvider({
  children,
  ...props
}: PropsWithChildren<ThemeProviderProps>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

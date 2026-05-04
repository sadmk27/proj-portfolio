import type { PropsWithChildren } from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

export { themeValidator, type Theme } from "./theme-schema";

export { getTheme, setTheme } from "./server/theme";

export function ThemeProvider({
  children,
  ...props
}: PropsWithChildren<ThemeProviderProps>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

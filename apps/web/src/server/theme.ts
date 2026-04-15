import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { themeValidator } from "../theme-schema";

const storageKey = "theme";

export const getTheme = createServerFn({ method: "GET" }).handler(() => {
  const raw = getCookie(storageKey);
  if (raw === "dark") {
    return "dark" as const;
  }

  if (raw === "light") {
    return "light" as const;
  }

  return "system" as const;
});

export const setTheme = createServerFn({ method: "POST" })
  .inputValidator(themeValidator)
  .handler(({ data }) => {
    setCookie(storageKey, data, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  });

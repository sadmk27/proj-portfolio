import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import * as z from "zod";

const storageKey = "theme";

const themeValidator = z.enum(["light", "dark", "system"]);

export type Theme = z.infer<typeof themeValidator>;

export const getTheme = createServerFn().handler(() => {
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
    setCookie(storageKey, data);
  });

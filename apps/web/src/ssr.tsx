import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { initI18nServer } from "@/lib/server-i18n";
import { getRouter } from "./router";
import { themeValidator } from "./theme-schema";

export default createStartHandler(async (renderOptions) => {
  const cookie = renderOptions.request.headers.get("cookie") || "";
  const acceptLanguage =
    renderOptions.request.headers.get("accept-language") || "";

  const themeCookie = cookie.match(/theme=([^;]+)/)?.[1];
  const theme = themeValidator.catch("system").parse(themeCookie);

  const cookieLang = cookie.match(/i18next=([^;]+)/)?.[1];
  const browserLang = acceptLanguage.split(",")[0].split("-")[0].toLowerCase();
  const detectedLang = cookieLang ?? (browserLang === "pl" ? "pl" : "en");
  const lang = ["en", "pl"].includes(detectedLang) ? detectedLang : "en";

  const i18n = await initI18nServer(lang);
  const router = getRouter({ i18n, theme });

  return defaultStreamHandler({
    ...renderOptions,
    router,
  });
});

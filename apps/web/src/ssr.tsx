import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { initI18nServer } from "./lib/i18n";
import { getRouter } from "./router";

export default createStartHandler(async (renderOptions) => {
  const cookie = renderOptions.request.headers.get("cookie") || "";
  const match = cookie.match(/i18next=([^;]+)/);
  const acceptLanguage =
    renderOptions.request.headers.get("accept-language") || "";

  let lang = "en";

  if (match) {
    lang = match[1];
  } else if (acceptLanguage) {
    // Basic detection for first visit
    const preferredLang = acceptLanguage
      .split(",")[0]
      .split("-")[0]
      .toLowerCase();
    if (preferredLang === "pl") {
      lang = "pl";
    }
  }

  if (!["en", "pl"].includes(lang)) {
    lang = "en";
  }

  const i18n = await initI18nServer(lang);
  const router = getRouter(i18n);

  return defaultStreamHandler({
    ...renderOptions,
    router,
  });
});

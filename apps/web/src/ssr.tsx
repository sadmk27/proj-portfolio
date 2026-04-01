import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { initI18nServer } from "./lib/i18n";
import { getRouter } from "./router";

export default createStartHandler(async (renderOptions) => {
  const cookie = renderOptions.request.headers.get("cookie") || "";
  const match = cookie.match(/i18next=([^;]+)/);
  const lang = match ? match[1] : "en";

  const i18n = await initI18nServer(lang);
  const router = getRouter(i18n);

  return defaultStreamHandler({
    ...renderOptions,
    router,
  });
});

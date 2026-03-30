import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { initI18nServer } from "./lib/i18n";

export default createStartHandler((renderOptions) => {
  const cookie = renderOptions.request.headers.get("cookie") || "";
  const match = cookie.match(/i18next=([^;]+)/);
  const lang = match ? match[1] : "en";

  initI18nServer(lang);

  return defaultStreamHandler(renderOptions);
});

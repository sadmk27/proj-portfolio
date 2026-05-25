import { resources, FALLBACK_LANG } from "@/lib/i18n";

export async function initI18nServer(lang: string) {
  const { createInstance } = await import("i18next");
  const { initReactI18next } = await import("react-i18next");

  const instance = createInstance();

  await instance.use(initReactI18next).init({
    resources,
    fallbackLng: FALLBACK_LANG,
    lng: lang,
    interpolation: {
      escapeValue: false,
    },
  });

  return instance;
}

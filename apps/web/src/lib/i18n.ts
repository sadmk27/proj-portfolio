import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../locales/en.json";
import pl from "../locales/pl.json";

export const defaultNS = "translation";
export const resources = {
  en: { translation: en },
  pl: { translation: pl },
} as const;

const i18nConfig = {
  resources,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ["cookie", "localStorage", "navigator"],
    caches: ["cookie"],
    cookieMinutes: 10080,
    lookupCookie: "i18next",
  },
};

i18n.use(initReactI18next);

if (!i18n.isInitialized) {
  if (typeof window !== "undefined") {
    i18n.use(LanguageDetector).init(i18nConfig);
  } else {
    i18n.init({
      ...i18nConfig,
      lng: "en",
      detection: undefined,
    });
  }
}

export async function initI18nServer(lang: string) {
  const i18nInstance = i18n.createInstance();
  await i18nInstance.use(initReactI18next).init({
    ...i18nConfig,
    lng: lang,
    detection: undefined,
  });
  return i18nInstance;
}

export default i18n;

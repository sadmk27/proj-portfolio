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
    escapeValue: false, // react already safes from xss
  },
  detection: {
    order: ["cookie", "localStorage", "navigator"],
    caches: ["cookie"],
    cookieMinutes: 10080, // 7 days
    lookupCookie: "i18next",
  },
};

// Initialize for the client
if (!i18n.isInitialized && typeof window !== "undefined") {
  i18n.use(LanguageDetector).use(initReactI18next).init(i18nConfig);
}

export function initI18nServer(lang: string) {
  const i18nInstance = i18n.createInstance();
  i18nInstance.use(initReactI18next).init({
    ...i18nConfig,
    lng: lang,
  });
  return i18nInstance;
}

export default i18n;

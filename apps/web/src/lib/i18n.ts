import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../locales/en.json";
import pl from "../locales/pl.json";

interface WindowWithInitialLang extends Window {
  __INITIAL_LANG__?: string;
}

export const defaultNS = "translation";
export const resources = {
  en: { translation: en },
  pl: { translation: pl },
} as const;

const SUPPORTED_LANGS = ["en", "pl"];
const FALLBACK_LANG = "en";

const i18nConfig = {
  resources,
  fallbackLng: FALLBACK_LANG,
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

const getInitialLang = (): string => {
  try {
    if (
      typeof window !== "undefined" &&
      (window as WindowWithInitialLang).__INITIAL_LANG__
    ) {
      return (window as WindowWithInitialLang).__INITIAL_LANG__!;
    }
    const match = document.cookie.match(/i18next=([^;]+)/);
    const lang = match?.[1] ?? "en";
    return SUPPORTED_LANGS.includes(lang) ? lang : FALLBACK_LANG;
  } catch {
    return FALLBACK_LANG;
  }
};

if (!i18n.isInitialized) {
  if (typeof window !== "undefined") {
    i18n.use(LanguageDetector).init({
      ...i18nConfig,
      lng: getInitialLang(),
    });
  } else {
    i18n.init({
      ...i18nConfig,
      lng: FALLBACK_LANG,
      detection: undefined,
    });
  }
}

export default i18n;

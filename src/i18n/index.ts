import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { es } from "./locales/es";
import { en } from "./locales/en";

const isBrowser = typeof window !== "undefined";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    lng: isBrowser ? undefined : "en",
    fallbackLng: "en",
    supportedLngs: ["es", "en"],
    interpolation: { escapeValue: false },
    detection: isBrowser
      ? {
          order: ["localStorage", "navigator", "htmlTag"],
          caches: ["localStorage"],
          lookupLocalStorage: "ihn-lang",
        }
      : undefined,
    returnObjects: true,
  });
}

export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const componentModules = import.meta.glob("./components/**/*.lang.js", {
  eager: true,
});

const pageModules = import.meta.glob("./pages/**/*.lang.js", {
  eager: true,
});

const modules = { ...componentModules, ...pageModules };

const resources = {
  en: {},
  zh: {},
};

const namespaces = [];

for (const path in modules) {
  const langData = modules[path].default;

  const match = path.match(/(components|pages)\/([^/]+)\/.+\.lang\.js$/);
  const namespace = match?.[2] || "common";

  if (!namespaces.includes(namespace)) {
    namespaces.push(namespace);
  }

  if (langData.en) resources.en[namespace] = langData.en;
  if (langData.zh) resources.zh[namespace] = langData.zh;
}

i18n;
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    load: 'languageOnly',
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

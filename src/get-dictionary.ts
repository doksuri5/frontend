import "server-only";
import type { Locale } from "./i18n";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  ko: () => import("./dictionaries/ko.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  ch: () => import("./dictionaries/ch.json").then((module) => module.default),
  jp: () => import("./dictionaries/jp.json").then((module) => module.default),
  fr: () => import("./dictionaries/fr.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.en();

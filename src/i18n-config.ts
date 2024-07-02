export const i18n = {
  defaultLocale: "ko",
  locales: ["ko", "en", "ch", "jp", "fr"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

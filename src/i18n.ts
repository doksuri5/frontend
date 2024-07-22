// next-intl
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = "ko";

  return {
    locale,
    messages: (await import(`../src/dictionaries/${locale}.json`)).default,
  };
});

// i18n-config
export const i18n = {
  defaultLocale: "ko",
  locales: ["ko", "en", "ch", "jp", "fr"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

// next-intl
import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

function getBasePath(path: string) {
  const regex = /^(\/[^\/]+)(\/.*)/;
  const match = path.match(regex);
  if (match) {
    return match[1].substring(1);;
  }
  return null;
}

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const headersList = headers();
  const headerPathname = headersList.get("x-pathname") || "";

  const locale = getBasePath(headerPathname) + "";

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

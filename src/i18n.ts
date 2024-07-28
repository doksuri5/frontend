import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const i18n = {
  defaultLocale: "ko",
  locales: ["ko", "en", "ch", "jp", "fr"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export default getRequestConfig(async ({ locale }) => {
  if (!i18n.locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../src/dictionaries/${locale}.json`)).default,
  };
});

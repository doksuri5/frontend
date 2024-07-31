import { getTranslations } from "next-intl/server";

export async function commonAuthMetadata(page: string) {
  const t = await getTranslations("auth");
  return {
    title: t(`title.${page}`),
    description: t(`metadata.${page}.description`),
    keywords: t(`metadata.${page}.description`),
    openGraph: {
      title: t(`title.${page}`),
      description: t(`metadata.${page}.description`),
    },
    twitter: {
      title: t(`title.${page}`),
      description: t(`metadata.${page}.description`),
    },
  };
}

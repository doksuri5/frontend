import { getTranslations } from "next-intl/server";

// auth 관련 메타데이터
export async function commonAuthMetadata(page: string) {
  const t = await getTranslations("auth");
  const root = await getTranslations("metadata");
  const siteName = root("root.siteName");

  const title =
    page === "register" || page === "profileSetup" ? `${t(`title.${page}`)} | ${siteName}` : t(`title.${page}`);

  return {
    title,
    description: t(`metadata.${page}.description`),
    keywords: t(`metadata.${page}.description`),
    openGraph: {
      title,
      description: t(`metadata.${page}.description`),
    },
    twitter: {
      title,
      description: t(`metadata.${page}.description`),
    },
  };
}

import { Locale } from "@/i18n";
import { ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: { lang: Locale } }, parent: ResolvingMetadata) {
  const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/${params.lang}`;

  const t = await getTranslations({ lang: params.lang, namespace: "metadata.news" });
  const parentMetadata = (await parent) || [];

  const openGraph = parentMetadata?.openGraph ?? {};
  const twitter = parentMetadata?.twitter ?? {};

  return {
    ...parentMetadata,
    title: t("title"),
    description: t("description"),
    openGraph: {
      ...openGraph,
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      url: `${BASE_URL}/news`,
    },
    twitter: {
      ...twitter,
      title: t("twitter.title"),
      description: t("twitter.description"),
    },
  };
}

export default function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

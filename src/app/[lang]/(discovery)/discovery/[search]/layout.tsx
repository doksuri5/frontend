import { Suspense } from "react";
import DiscoverySearchLoading from "./loading";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

interface generateMetadataPropsType {
  params: {
    search: string;
    lang: string;
  };
}

export const generateMetadata = async ({ params }: generateMetadataPropsType) => {
  const t = await getTranslations("discovery");

  const search = decodeURIComponent(params.search);
  return {
    title: `${search} : ${t("searchLayout.searchResult")}`,
    description: t("searchLayout.description", { search }),
    keywords: t("searchLayout.keywords"),
    openGraph: {
      title: `${search} : ${t("searchLayout.searchResult")}`,
      description: t("searchLayout.description", { search }),
    },
    twitter: {
      title: `${search} : ${t("searchLayout.searchResult")}`,
      description: t("searchLayout.description", { search }),
    },
  };
};

export default function DiscoverySearchLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { search: string; lang: string };
}) {
  unstable_setRequestLocale(params.lang);
  return <Suspense fallback={<DiscoverySearchLoading />}>{children}</Suspense>;
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { MyStockStoreProvider } from "@/providers/MyStockProvider";
import BodyLoading from "@/app/[lang]/body-loading";

interface generateMetadataPropsType {
  params: {
    lang: string;
  };
}

export const generateMetadata = async ({ params }: generateMetadataPropsType): Promise<Metadata> => {
  const t = await getTranslations("myStock");

  return {
    title: t("layout.title"),
    description: t("layout.description"),
    keywords: t("layout.keywords"),
    openGraph: {
      title: t("layout.title"),
      description: t("layout.description"),
    },
    twitter: {
      title: t("layout.title"),
      description: t("layout.description"),
    },
  };
};

export default function MyStockLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<BodyLoading />}>
      <MyStockStoreProvider>{children}</MyStockStoreProvider>
    </Suspense>
  );
}

import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DiscoveryInput } from "./_components";
import { unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("discovery");

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
}

export default async function DiscoveryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  unstable_setRequestLocale(params.lang);

  return (
    <article className="flex_col m-auto max-w-[59rem] gap-[3.2rem] py-[5.6rem]">
      <DiscoveryInput />
      {children}
    </article>
  );
}

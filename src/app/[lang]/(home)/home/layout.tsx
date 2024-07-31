import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: t("metaKeywords"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      siteName: t("siteName"),
      images: [
        {
          url: "images/intro_content.png",
          width: 800,
          height: 600,
          alt: t("ogImageAlt"),
        },
      ],
    },
  };
}

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

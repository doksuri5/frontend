import { fetchNewsDetail } from "@/actions/news";
import { Locale } from "@/i18n";
import { ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(
  { params }: { params: { newsId: string; lang: Locale } },
  parent: ResolvingMetadata,
) {
  const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/${params.lang}`;

  const t = await getTranslations({ lang: params.lang, namespace: "metadata" });

  const parentMetadata = (await parent) || [];

  const decodedNewsId = decodeURIComponent(params.newsId);

  const openGraph = parentMetadata?.openGraph ?? {};
  const twitter = parentMetadata?.twitter ?? {};

  const data = await fetchNewsDetail(decodedNewsId);

  let title, description, image, refinedDescription;

  if (data?.news) {
    ({ title, description, image } = data.news);
    refinedDescription = description.replace(/\n/g, "").slice(0, 150);
  }

  return {
    ...parentMetadata,
    title: {
      absolute: `${title} | ${t("root.siteName")}`,
    },

    description: `${refinedDescription}`,
    openGraph: {
      ...openGraph,
      title: {
        absolute: `${title} | ${t("root.siteName")}`,
      },
      description: refinedDescription,
      url: `${BASE_URL}/news/${params.newsId}`,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: "news image",
        },
      ],
    },
    twitter: {
      ...twitter,
      title: {
        absolute: `${title} | ${t("root.siteName")}`,
      },
      description: refinedDescription,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: "news image",
        },
      ],
    },
  };
}

export default function NewsDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

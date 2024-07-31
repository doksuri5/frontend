import { getStocksByReutersCode } from "@/actions/stock";
import { STOCK_NAMES, TReutersCodes } from "@/constants/stockCodes";
import { Locale } from "@/i18n";
import { ReportStoreProvider } from "@/providers/ReportProvider";
import { getLocale, getTranslations, unstable_setRequestLocale } from "next-intl/server";

export const generateMetadata = async ({ params }: { params: { stockReutersCode: TReutersCodes } }) => {
  const locale = await getLocale();
  const t = await getTranslations("report");
  const stock = await getStocksByReutersCode(undefined, { params: params.stockReutersCode });

  const stockName = locale === "ko" ? stock.data.stockName : stock.data.stockNameEng;

  return {
    title: t("metaTitle", { stockName }),
    description: t("metaDescription", { stockName }),
    keywords: t("metaKeywords", { stockName }),
    openGraph: {
      title: t("ogTitle", { stockName }),
      description: t("ogDescription", { stockName }),
      siteName: t("siteName"),
      images: [
        {
          url: `icons/stocks/${STOCK_NAMES[params.stockReutersCode]}.svg`,
          width: 800,
          height: 600,
          alt: t("ogImageAlt", { stockName }),
        },
      ],
    },
  };
};

export default function ReportLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  unstable_setRequestLocale(params.lang);
  return (
    <section>
      <ReportStoreProvider>{children}</ReportStoreProvider>
    </section>
  );
}

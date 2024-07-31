import { fetchInterestStockNews, fetchPopularNews } from "@/actions/news";
import News from "@/app/[lang]/(news)/news/_components";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function NewsPage({ params }: { params: { lang: string } }) {
  unstable_setRequestLocale(params.lang);
  const [newsData, interestStockNews] = await Promise.allSettled([fetchPopularNews(), fetchInterestStockNews()]);

  return <News popularNews={newsData} interestStockNews={interestStockNews} />;
}

import { fetchInterestStockNews, fetchPopularNews, fetchRecentNews } from "@/actions/news";
import News from "@/app/[lang]/(news)/news/_components";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function NewsPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  const [newsData, interestStockNews] = await Promise.allSettled([fetchPopularNews(), fetchInterestStockNews()]);

  return <News popularNews={newsData} interestStockNews={interestStockNews} />;
}

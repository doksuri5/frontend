import { fetchInterestStockNews, fetchPopularNews } from "@/actions/news";
import News from "@/app/[lang]/(news)/news/_components";

export default async function NewsPage() {
  const [newsData, interestStockNews] = await Promise.allSettled([fetchPopularNews(), fetchInterestStockNews()]);

  return <News popularNews={newsData} interestStockNews={interestStockNews} />;
}

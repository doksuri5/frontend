import { fetchNewsDetail } from "@/actions/news";
import NewsDetailPage from "@/app/[lang]/(news)/news/[newsId]/_components";

export default async function NewsIdPage({ params }: { params: { newsId: string } }) {
  const newsData = await fetchNewsDetail(params.newsId);

  return <NewsDetailPage data={newsData} />;
}

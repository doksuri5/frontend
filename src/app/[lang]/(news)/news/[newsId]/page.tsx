import NewsDetailPage from "@/app/[lang]/(news)/news/[newsId]/_components";

export default function NewsIdPage({ params }: { params: { newsId: string } }) {
  return <NewsDetailPage />;
}

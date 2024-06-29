import NewsDetailPage from "@/app/(news)/news/[newsId]/_components";

export default function NewsIdPage({ params }: { params: { newsId: string } }) {
  return <NewsDetailPage />;
}

import NewsDetail from "./NewsDetail";
import RelatedStocks from "./RelatedStocks";
import RelatedNews from "./RelatedNews";
import { Suspense } from "react";
import NewsDetailSkeleton from "./skeleton/NewsDetailSkeleton";

export default function NewsDetailPage({ data }: any) {
  return (
    <div className="flex gap-[2rem] py-[4.1rem]">
      <Suspense fallback={<NewsDetailSkeleton />}>
        <NewsDetail newsData={data.news} />
      </Suspense>
      <div className="flex flex-col gap-[2rem] rounded-[1.6rem]">
        <RelatedStocks relatedStocks={data.relatedStocks} />
        <RelatedNews relatedNews={data.relatedNews} />
      </div>
    </div>
  );
}

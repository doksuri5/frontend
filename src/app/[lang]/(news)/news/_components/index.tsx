"use client";

import { Card, CardSkeleton, PopularNews, PopularNewsSkeleton } from "@/components/common";
import NewsInfinityList from "@/app/[lang]/(news)/news/_components/NewsInfinityList";
import { Suspense, useState } from "react";
import useInfiniteNews from "@/hooks/useInfiniteNews";

export default function News({ popularNews, interestStockNews }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const { allNews, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteNews();

  const handleFetchNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchNextPage();
    }
  };

  return (
    <div className="flex flex-col gap-[4.8rem] pb-[8rem] pt-[5.6rem]">
      <Suspense fallback={<PopularNewsSkeleton />}>
        {popularNews.value.length > 0 && <PopularNews popularNewsData={popularNews.value} />}
      </Suspense>
      <div className="flex w-full flex-col gap-[2.4rem]">
        <h2 className="heading_4 font-bold text-navy-900">관심종목과 관련된 뉴스</h2>
        <div className="flex gap-[2rem]">
          <Suspense
            fallback={Array(3)
              .fill(0)
              .map((_, index) => (
                <CardSkeleton key={index} variant="halfMediaCard" style="w-1/3" />
              ))}
          >
            {interestStockNews.value.length > 0 &&
              interestStockNews.value.map((news: any) => (
                <Card
                  key={news._id}
                  variant="halfMediaCard"
                  style="w-1/3"
                  date={news.date}
                  title={news.title}
                  image={news.image}
                  content={news.description}
                  publisher={news.newspaperCompany}
                />
              ))}
          </Suspense>
        </div>
      </div>
      <div className="flex w-full flex-col gap-[2.4rem]">
        <h2 className="heading_4 font-bold text-navy-900">최신 뉴스</h2>
        <div className="flex gap-[2rem]">
          <NewsInfinityList
            newsItems={allNews}
            lineClamp={"lineClamp-4"}
            variant="border"
            style="max-h-[85rem]"
            fetchNextPage={handleFetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            status={status}
          />
        </div>
      </div>
    </div>
  );
}

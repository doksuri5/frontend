"use client";

import { Card } from "@/components/common";
import NewsInfinityList from "@/app/[lang]/(news)/news/_components/NewsInfinityList";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import PopularNews from "@/components/common/PopularNews";

export default function News({}) {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNews = async ({ pageParam = currentPage }) => {
    const res = await fetch(`/api/news?page=${pageParam}&limit=4`);
    const data = await res.json();
    return data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
    initialPageParam: currentPage,
    getNextPageParam: (lastPage) => {
      if (lastPage.totalPages === lastPage.page) return undefined;
      return lastPage.page + 1;
    },
  });

  const handleFetchNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchNextPage();
    }
  };

  if (status === "pending") {
    return <p>Loading...</p>;
  }
  const allNews = data?.pages.flatMap((page) => page.data);

  return (
    <div className="flex flex-col gap-[4.8rem] pb-[8rem] pt-[5.6rem]">
      <PopularNews />
      <div className="flex w-full flex-col gap-[2.4rem]">
        <h2 className="heading_4 font-bold text-navy-900">관심종목과 관련된 뉴스</h2>
        <div className="flex gap-[2rem]">{Array(3).fill(<Card variant="halfMediaCard" style="w-1/3" />)}</div>
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

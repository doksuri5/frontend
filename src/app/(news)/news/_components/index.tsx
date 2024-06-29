"use client";

import { Card } from "@/components/common";
import NewsInfinityList from "@/app/(news)/news/_components/NewsInfinityList";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

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
    <div className="flex flex-col gap-[4.8rem] pt-[5.6rem]">
      <div className="flex flex-col gap-[2.4rem]">
        <h2 className="heading_4 font-bold text-navy-900">오늘 인기있는 뉴스</h2>
        <div className="flex min-w-[120px] gap-[2rem]">
          <Card
            variant="fullMediaCard"
            title="엔비디아 또 신고가… 시총 2위 애플과 962억달러 차이"
            content="엔비디아가 기존 주식을 10주로 쪼개는 액면분할을 3일 앞둔 4일(현지시간) 주당 신고가 기록을 다시 쓰며 고가 우려를 털어냈다. 차세대 인공지능(AI) GPU 발표..."
            date="2024.06.05"
            publisher="문화일보"
            style="w-1/2"
          />
          <div className="flex w-1/2 flex-col gap-[2rem]">
            <Card
              variant="fullMediaCard"
              title="엔비디아 또 신고가… 시총 2위 애플과 962억달러 차이"
              content="엔비디아가 기존 주식을 10주로 쪼개는 액면분할을 3일 앞둔 4일(현지시간) 주당 신고가 기록을 다시 쓰며 고가 우려를 털어냈다. 차세대 인공지능(AI) GPU 발표..."
              date="2024.06.05"
              publisher="문화일보"
              size="small"
            />
            <Card
              variant="fullMediaCard"
              title="엔비디아 또 신고가… 시총 2위 애플과 962억달러 차이"
              content="엔비디아가 기존 주식을 10주로 쪼개는 액면분할을 3일 앞둔 4일(현지시간) 주당 신고가 기록을 다시 쓰며 고가 우려를 털어냈다. 차세대 인공지능(AI) GPU 발표..."
              date="2024.06.05"
              publisher="문화일보"
              size="small"
            />
          </div>
        </div>
      </div>
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

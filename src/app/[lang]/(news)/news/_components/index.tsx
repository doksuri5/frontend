"use client";

import { Card } from "@/components/common";
import NewsInfinityList from "@/app/[lang]/(news)/news/_components/NewsInfinityList";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import PopularNews from "@/components/common/PopularNews";
import NewsImage from "@/public/icons/news.jpg";
import Link from "next/link";
import { NEWS_PATH } from "@/routes/path";
import Loading from "@/app/[lang]/loading";
import { nanoid } from "nanoid";

const DUMMY_NEWS_ITEMS = Array(3).fill({
  id: nanoid(),
  image: NewsImage,
  title: "엔비디아 또 신고가… 시총 2위 애플과 962억달러 차이",
  description: `윤석열 대통령이 "포항 앞바다에 막대한 양의 석유·천연가스 매장 가능성이 있다"고 발표하면서 석유주가 이틀째 급등했다.3일 한국석유(004090)는 전일대비 5350원(29.81%) 오른 2만3300원에 거래를 마쳤다. 한국석유는 전날에도 상한가로 장을 마친 바 있다.이 외에도 한국ANKOR유전도 상한가를 찍었고, 흥구석유(024060)는 18.40% 올랐다.윤석열 대통령은 전날 용산 대통령실에서 열린 국정 브리핑에서 "포항 영일만 앞바다에 막대한 양의 석유와 가스가 매장돼 있을 가능성이 높다는 물리탐사 결과가 나왔다"고 밝혔다.매장량은 최대 140억 배럴 가능성이 예상되며 천연가스는 29년, 석유는 4년 이상 사용할 양이라고 설명했다.`,
  publishedTime: "7",
  newspaperCompany: "문화일보",
  variant: "lineClamp-4",
  date: "7시간전",
});

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
    return <Loading />;
  }
  const allNews = data?.pages.flatMap((page) => page.data);

  return (
    <div className="flex flex-col gap-[4.8rem] pb-[8rem] pt-[5.6rem]">
      <PopularNews />
      <div className="flex w-full flex-col gap-[2.4rem]">
        <h2 className="heading_4 font-bold text-navy-900">관심종목과 관련된 뉴스</h2>
        <div className="flex gap-[2rem]">
          {DUMMY_NEWS_ITEMS.map((news, index) => (
            <Card
              key={news.id}
              variant="halfMediaCard"
              id={news.id}
              style="w-1/3"
              date={news.date}
              title={news.title}
              image={news.image}
              content={news.description}
              publisher={news.newspaperCompany}
            />
          ))}
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

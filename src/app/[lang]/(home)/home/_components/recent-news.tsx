"use client";

import NewsInfinityList from "@/app/[lang]/(news)/news/_components/NewsInfinityList";
import useInfiniteNews from "@/hooks/useInfiniteNews";

const RecentNews = () => {
  const { newsData, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteNews();
  const handleFetchNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      <p className="body_1 pb-[1.6rem] pt-[4.8rem]">최신 뉴스</p>
      <div className="flex gap-[2rem]">
        <NewsInfinityList
          newsItems={newsData}
          lineClamp={"lineClamp-4"}
          variant="border"
          style="max-h-[85rem]"
          fetchNextPage={handleFetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          status={status}
        />
      </div>
    </>
  );
};

export default RecentNews;

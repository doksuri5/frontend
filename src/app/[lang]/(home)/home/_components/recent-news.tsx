"use client";

import NewsInfinityList from "@/app/[lang]/(news)/news/_components/NewsInfinityList";
import useInfiniteNews from "@/hooks/useInfiniteNews";
import { useTranslations } from "next-intl";

const RecentNews = ({ isHeading = false }: { isHeading?: boolean }) => {
  const t = useTranslations();
  const { newsData, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteNews();
  const handleFetchNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      {isHeading ? (
        <h2 className="heading_4 font-bold text-navy-900">{t("news.latestNews", { defaultMessage: "최신 뉴스" })}</h2>
      ) : (
        <p className="body_1 pb-[1.6rem] pt-[4.8rem]">{t("news.latestNews", { defaultMessage: "최신 뉴스" })}</p>
      )}
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

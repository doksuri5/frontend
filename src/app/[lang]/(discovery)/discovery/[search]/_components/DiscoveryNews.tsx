"use client";

import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { FindNews } from "@/components/common";
import { SearchStockNewsDataType } from "@/types/NewsDataType2";
import { useShowMoreItems } from "../_hooks/useShowMoreItems";

const DiscoveryNews = ({ newsList }: { newsList: SearchStockNewsDataType[] }) => {
  const { data: session } = useSession();
  const lang = session?.user.language || "ko";

  const t = useTranslations();
  const { displayedItems, showMoreItems, maxDisplayedItems, handleShowMore } = useShowMoreItems(6, newsList);

  return (
    <div className="flex_col h-vh gap-[1.6rem] rounded-[1.6rem] bg-white p-[2.4rem]">
      {displayedItems.map((news) => {
        const title = lang && news.title[lang as keyof typeof news.title];
        const publisher = lang && news.publisher[lang as keyof typeof news.publisher];
        return (
          <FindNews
            key={news.index}
            _id={news.index}
            image={news.thumbnailUrl}
            title={title}
            publishedTime={news.publishedTime}
            newspaperCompany={publisher}
            lang={lang}
          />
        );
      })}
      {newsList.length > maxDisplayedItems && !showMoreItems && (
        <>
          <hr className="mb-[1.6rem] mt-[1.8rem]" />
          <p
            className="body_4 w-full cursor-pointer px-[1rem] text-center font-medium text-grayscale-400"
            onClick={handleShowMore}
          >
            {t("discovery.moreItem")}
          </p>
        </>
      )}
    </div>
  );
};

export default DiscoveryNews;
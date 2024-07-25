"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, startTransition } from "react";
import { FindNews } from "@/components/common";
import DiscoverySection from "./DiscoverySection";
import { SearchStockNewsDataType } from "@/types/NewsDataType2";
import { getSearchNews } from "@/actions/news";

const DiscoveryNews = () => {
  const pathname = usePathname();
  const lang = pathname.match(/\/([a-z]{2})\//)?.[1];
  const [newsList, setNewsList] = useState<SearchStockNewsDataType[]>([]);
  const [showMoreItems, setShowMoreItems] = useState(false);
  const [maxDisplayedItems, setMaxDisplayedItems] = useState(6);
  const params = useSearchParams().get("search") || "";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getSearchNews(undefined, { params: params });
        if (response.ok) {
          setNewsList(response.data);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };
    startTransition(async () => {
      if (params !== "") await fetchNews();
    });
  }, [params]);

  const handleShowMore = () => {
    const nextItemLength = maxDisplayedItems + 6;
    setMaxDisplayedItems(nextItemLength);

    if (nextItemLength >= newsList.length) setShowMoreItems(false);
  };

  const displayedStockNews = useMemo(() => {
    return showMoreItems ? newsList : newsList.slice(0, maxDisplayedItems);
  }, [newsList, showMoreItems, maxDisplayedItems]);

  const subTag = <span className={`body_5 font-medium text-grayscale-600`}>{`(${newsList.length})`}</span>;

  return (
    <DiscoverySection title="뉴스" subTag={subTag}>
      <div className="flex_col h-vh gap-[1.6rem] rounded-[1.6rem] bg-white p-[2.4rem]">
        <>
          {displayedStockNews.map((news) => {
            const title =
              lang && news.title[lang as keyof typeof news.title]
                ? news.title[lang as keyof typeof news.title]
                : news.title["ko"];
            const publisher =
              lang && news.publisher[lang as keyof typeof news.publisher]
                ? news.publisher[lang as keyof typeof news.publisher]
                : news.publisher["ko"];
            return (
              <FindNews
                key={news.index}
                _id={news.index}
                image={news.thumbnailUrl}
                title={title}
                publishedTime={news.publishedTime}
                newspaperCompany={publisher}
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
                더보기
              </p>
            </>
          )}
        </>
      </div>
    </DiscoverySection>
  );
};

export default DiscoveryNews;

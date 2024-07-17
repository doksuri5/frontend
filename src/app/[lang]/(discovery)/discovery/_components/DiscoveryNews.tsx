"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FindNews, FindNewsSkeleton } from "@/components/common";
import DiscoverySection from "./DiscoverySection";
import { getSearchNews } from "@/actions/news";
import { SearchStockNewsDataType } from "@/types/NewsDataType2";

const News = ({ params }: { params: string }) => {
  const pathname = usePathname();
  const lang = pathname.match(/\/([a-z]{2})\//)?.[1];
  const [isRander, setIsRender] = useState(false);
  const [newsList, setNewsList] = useState<SearchStockNewsDataType[]>([]);
  const [showMoreItems, setShowMoreItems] = useState(false);
  const [maxDisplayedItems, setMaxDisplayedItems] = useState(6);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getSearchNews(undefined, { params: params });
        if (response.ok) {
          setNewsList(response.data);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setIsRender(true);
      }
    };

    fetchNews();
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
        {!isRander ? (
          <>
            {Array.from({ length: 6 }).map((_, idx) => (
              <FindNewsSkeleton key={idx} />
            ))}
          </>
        ) : (
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
        )}
      </div>
    </DiscoverySection>
  );
};

export default News;

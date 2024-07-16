"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FindNews, FindNewsSkeleton } from "@/components/common";
import DiscoverySection from "./DiscoverySection";
import { getSearchNews } from "@/actions/news";
import { SearchStockNewsDataType } from "@/types/NewsDataType2";

const News = ({ params }: { params: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newsList, setNewsList] = useState<SearchStockNewsDataType[]>([]);
  const pathname = usePathname();
  const lang = pathname.match(/\/([a-z]{2})\//)?.[1];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const response = await getSearchNews(undefined, { params: params });
        if (response.ok) {
          setNewsList(response.data);
        } else {
          console.log("Error: Response is not an array");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [params]);

  const subTag = <span className={`body_5 font-medium text-grayscale-600`}>{`(${newsList.length})`}</span>;

  return (
    <DiscoverySection title="뉴스" subTag={subTag}>
      <div className="flex_col h-vh gap-[1.6rem] rounded-[1.6rem] bg-white p-[2.4rem]">
        {isLoading ? (
          <>
            {Array.from({ length: 6 }).map((_, idx) => (
              <FindNewsSkeleton key={idx} />
            ))}
          </>
        ) : (
          <>
            {newsList.map((news) => {
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
            <hr className="mb-[1.6rem] mt-[1.8rem]" />
            <p className="body_4 w-full cursor-pointer px-[1rem] text-center font-medium text-grayscale-400">더보기</p>
          </>
        )}
      </div>
    </DiscoverySection>
  );
};

export default News;

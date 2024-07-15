"use client";

import { FindNews, FindNewsSkeleton } from "@/components/common";
import DiscoverySection from "./DiscoverySection";
import { getSearchNews } from "@/actions/news";
import { useEffect, useState } from "react";
import { SearchStockNewsDataType } from "@/types/NewsDataType2";

const News = ({ params }: { params: string }) => {
  const [newsList, setNewsList] = useState<SearchStockNewsDataType[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getSearchNews(params);
        if (response.ok) {
          setNewsList(response.data);
        } else {
          console.log("Error: Response is not an array");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchNews();
  }, [params]);

  // const subTag = <span className={`body_5 font-medium text-grayscale-600`}>{`(${newsList.length})`}</span>;
  const subTag = <span className={`body_5 font-medium text-grayscale-600`}>{`()`}</span>;

  return (
    <DiscoverySection title="뉴스" subTag={subTag}>
      <div className="flex_col h-vh gap-[1.6rem] rounded-[1.6rem] bg-white p-[2.4rem]">
        {/* {loading ? (
          <>
            {Array.from({ length: 6 }).map((_, idx) => (
              <FindNewsSkeleton key={idx} />
            ))}
          </>
        ) : (
          <>
            {newsList.map((news) => (
              <FindNews
                key={news.idx}
                image={news.image}
                title={news.title}
                publishedTime={news.publishedTime}
                newspaperCompany={news.newspaperCompany}
              />
            ))}
            <hr className="mb-[1.6rem] mt-[1.8rem]" />
            <p className="body_4 w-full cursor-pointer px-[1rem] text-center font-medium text-grayscale-400">더보기</p>
          </>
        )} */}
      </div>
    </DiscoverySection>
  );
};

export default News;

"use client";

import { useState, useEffect } from "react";
import { FindNews, FindNewsSkeleton } from "@/components/common";
import NewsImage from "@/public/icons/news.jpg";
import DiscoverySection from "./DiscoverySection";

const News = ({ param }: { param: string }) => {
  // 로딩 이벤트를 줄라고 useState, useEffect를 사용하기 때문에 클라이언트 컴포넌트로 선언했습니다.
  // 추후에 없앨겁니다.
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setNewsList([
        {
          idx: 1,
          image: NewsImage,
          title: "\"산유국 되나\" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨",
          publishedTime: "n",
          newspaperCompany: "문화일보",
        },
        {
          idx: 2,
          image: NewsImage,
          title: "\"산유국 되나\" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨",
          publishedTime: "n",
          newspaperCompany: "문화일보",
        },
        {
          idx: 3,
          image: NewsImage,
          title: "\"산유국 되나\" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨",
          publishedTime: "n",
          newspaperCompany: "문화일보",
        },
        {
          idx: 4,
          image: NewsImage,
          title: "\"산유국 되나\" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨",
          publishedTime: "n",
          newspaperCompany: "문화일보",
        },
        {
          idx: 5,
          image: NewsImage,
          title: "\"산유국 되나\" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨",
          publishedTime: "n",
          newspaperCompany: "문화일보",
        },
        {
          idx: 6,
          image: NewsImage,
          title: "\"산유국 되나\" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨",
          publishedTime: "n",
          newspaperCompany: "문화일보",
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const subTag = <span className={`body_5 font-medium text-grayscale-600`}>{`(${newsList.length})`}</span>;

  return (
    <DiscoverySection title="뉴스" subTag={subTag}>
      <div className="flex_col h-vh gap-[1.6rem] rounded-[1.6rem] bg-white p-[2.4rem]">
        {loading ? (
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
        )}
      </div>
    </DiscoverySection>
  );
};

export default News;

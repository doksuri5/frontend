"use client";

import { useEffect, useState } from "react";
import DiscoverySection from "./DiscoverySection";
import { PopularSearchItemSkeleton } from "../common";

const PopularSearches = () => {
  // 로딩 이벤트를 줄라고 useState, useEffect를 사용하기 때문에 클라이언트 컴포넌트로 선언했습니다.
  // 추후에 없앨겁니다.
  const [popularList, setPopularList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setPopularList([
        { idx: 1, rank: 1, stockName: "테슬라" },
        { idx: 2, rank: 2, stockName: "테슬라" },
        { idx: 3, rank: 3, stockName: "테슬라" },
        { idx: 4, rank: 4, stockName: "테슬라" },
        { idx: 5, rank: 5, stockName: "테슬라" },
        { idx: 6, rank: 6, stockName: "테슬라" },
        { idx: 7, rank: 7, stockName: "테슬라" },
        { idx: 8, rank: 8, stockName: "테슬라" },
        { idx: 9, rank: 9, stockName: "테슬라" },
        { idx: 10, rank: 10, stockName: "테슬라" },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const getCurrentHourString = (): string => {
    const now = new Date();
    const hours = now.getHours();
    const formattedHour = hours.toString().padStart(2, "0");
    return `${formattedHour}:00`;
  };

  const subTag = (
    <span className={`body_5 font-medium text-grayscale-600 underline`}>{`${getCurrentHourString()} 기준`}</span>
  );

  return (
    <DiscoverySection title="인기 검색어" subTag={subTag}>
      <div className="flex_col rounded-[1.6rem] bg-white p-[2.4rem]">
        <div className="grid w-full grid-flow-col grid-rows-5 gap-4">
          {loading ? (
            <>
              {Array.from({ length: 10 }).map((_, idx) => (
                <PopularSearchItemSkeleton key={idx} />
              ))}
            </>
          ) : (
            popularList.map((popular) => (
              <div key={popular.idx} className={`flex_row h-[4rem] w-[26.3rem] gap-[1.6rem]`}>
                <span className="body_4 w-[1.8rem] font-medium text-navy-900">{popular.rank}</span>
                <span className="body_4 w-full truncate font-medium text-grayscale-600">{popular.stockName}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </DiscoverySection>
  );
};

export default PopularSearches;

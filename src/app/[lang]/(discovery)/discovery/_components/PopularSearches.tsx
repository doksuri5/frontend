"use client";

import { useEffect, useState } from "react";
import DiscoverySection from "./DiscoverySection";
import PopularSearchItemSkeleton from "./_skeleton/PopularSearchItemSkeleton";
import { PopularSearchesNameDataType } from "@/types/SearchDataType";
import { getPopularSearchesName } from "@/actions/search";

const getCurrentHourString = (): string => {
  const now = new Date();
  const hours = now.getHours();
  const formattedHour = hours.toString().padStart(2, "0");
  return `${formattedHour}:00`;
};

const PopularSearches = () => {
  const [popularList, setPopularList] = useState<PopularSearchesNameDataType[]>([]);
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const response = await getPopularSearchesName();
        if (response.ok) setPopularList(response.data);
      } catch (error) {
        console.error("Fetch Error", error);
      } finally {
        setIsRender(true);
      }
    };
    fetchPopular();
  }, []);

  const subTag = (
    <span className={`body_5 font-medium text-grayscale-600 underline`}>{`${getCurrentHourString()} 기준`}</span>
  );

  return (
    <DiscoverySection title="인기 검색어" subTag={subTag}>
      <div className="flex_col rounded-[1.6rem] bg-white p-[2.4rem]">
        <div className="grid w-full grid-flow-col grid-rows-5 gap-4">
          {!isRender ? (
            <>
              {Array.from({ length: 10 }).map((_, idx) => (
                <PopularSearchItemSkeleton key={idx} />
              ))}
            </>
          ) : (
            popularList.map((popular, index) => (
              <div key={popular.stockName} className={`flex_row h-[4rem] w-[26.3rem] gap-[1.6rem]`}>
                <span className="body_4 w-[1.8rem] font-medium text-navy-900">{index + 1}</span>
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

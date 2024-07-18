"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import PopularSearchItemDetailSkeleton from "./_skeleton/PopularSearchItemDetailSkeleton";
import { getPopularSearches } from "@/actions/stock";
import { formatValueWithIndicator, formatValueWithSign, getTextColor } from "@/utils/stockPriceUtils";
import { StockPopularSearchDataType } from "@/types/StockDataType";
import { STOCK_NAMES } from "@/constants/stockCodes";

const MyStockPopularSearches = () => {
  const [popularList, setPopularList] = useState<StockPopularSearchDataType[]>([]);
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await getPopularSearches();
      setPopularList(res.data);
    }

    try {
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setIsRender(true);
    }
  }, []);

  return (
    <div className="flex flex-col gap-[1.6rem]">
      <h3 className="body_3 font-medium text-navy-900">인기 검색어</h3>
      <div className="grid w-full grid-flow-col grid-rows-5 gap-[2.4rem] rounded-[1.6rem] border border-navy-100 p-[2.4rem]">
        {!isRender ? (
          <>
            {Array.from({ length: 6 }).map((_, idx) => (
              <PopularSearchItemDetailSkeleton key={idx} />
            ))}
          </>
        ) : (
          <>
            {popularList.map((popular, index) => (
              <div key={popular.id} className={`flex_row h-[4rem] justify-between gap-[1.6rem]`}>
                <div className="flex_row">
                  <span className="body_4 w-[1.8rem] font-medium text-navy-900">{index + 1}</span>
                  <Image
                    src={`/icons/stocks/${STOCK_NAMES[popular.reutersCode]}.svg`}
                    alt="아이콘"
                    width={32}
                    height={32}
                    className="ml-[1.6rem] mr-[.8rem]"
                  />
                  <span className="body_4 w-full truncate font-medium text-grayscale-600">{popular.stockName}</span>
                </div>
                <div>
                  <span className={`${getTextColor(popular.compareToPreviousClosePrice)}`}>
                    {formatValueWithIndicator(popular.compareToPreviousClosePrice)}
                  </span>
                  <span className={`${getTextColor(popular.fluctuationsRatio)}`}>
                    {formatValueWithSign(popular.fluctuationsRatio) + "%"}
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MyStockPopularSearches;

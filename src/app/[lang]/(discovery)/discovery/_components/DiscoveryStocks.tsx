"use client";

import { useEffect, useState } from "react";
import { StockItem, StockItemSkeleton } from "@/components/common";
import DiscoverySection from "./DiscoverySection";
import { StockDataType } from "@/types";
import { getSearchStocks } from "@/actions/search";

const DiscoveryStocks = ({ params }: { params: string }) => {
  const [stockList, setStockList] = useState<StockDataType[]>([]);
  const [isRander, setIsRender] = useState(false);
  const [showMoreItems, setShowMoreItems] = useState(false);
  const [maxDisplayedItems, setMaxDisplayedItems] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSearchStocks(undefined, { params });
        if (response.ok) setStockList(response.data);
      } catch (error) {
        console.error("Failed to fetch stock data:", error);
      } finally {
        setIsRender(true);
      }
    };

    fetchData();
  }, [params]);

  const handleShowMore = () => {
    setShowMoreItems(true);
    setMaxDisplayedItems(stockList.length);
  };

  const displayedStockList = showMoreItems ? stockList : stockList.slice(0, maxDisplayedItems);

  const subTag = <span className={`body_5 font-medium text-grayscale-600`}>{`(${stockList.length})`}</span>;

  return (
    <DiscoverySection title="주식" subTag={subTag}>
      <div className="flex_col rounded-[1.6rem] bg-white p-[2.4rem]">
        {!isRander ? (
          <div className="grid w-full grid-cols-2 gap-x-[1.6rem] gap-y-[.8rem]">
            {Array.from({ length: 4 }).map((_, idx) => (
              <StockItemSkeleton key={idx} variant="findStock" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid w-full grid-cols-2 gap-x-[1.6rem] gap-y-[.8rem]">
              {displayedStockList.map((stock: StockDataType) => (
                <StockItem key={stock.stockName} variant="findStock" {...stock} />
              ))}
            </div>
            {stockList.length > maxDisplayedItems && (
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

export default DiscoveryStocks;

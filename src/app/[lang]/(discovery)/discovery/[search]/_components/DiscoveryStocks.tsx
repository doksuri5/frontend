"use client";

import { useTranslations } from "next-intl";
import { StockItem } from "@/components/common";
import { StockDataType } from "@/types";
import { useShowMoreItems } from "../_hooks/useShowMoreItems";

const DiscoveryStocks = ({ stockList }: { stockList: StockDataType[] }) => {
  const t = useTranslations();
  const { displayedItems, showMoreItems, maxDisplayedItems, handleShowMore } = useShowMoreItems(4, stockList);

  return (
    <div className="flex_col rounded-[1.6rem] bg-white p-[2.4rem]">
      <div className="grid w-full grid-cols-2 gap-x-[1.6rem] gap-y-[.8rem]">
        {displayedItems.map((stock: StockDataType) => (
          <StockItem key={stock.stockName} variant="findStock" {...stock} />
        ))}
      </div>
      {stockList.length > maxDisplayedItems && !showMoreItems && (
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

export default DiscoveryStocks;

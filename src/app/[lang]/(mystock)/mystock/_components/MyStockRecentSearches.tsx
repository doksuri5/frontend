"use client";

import { useRef } from "react";
import { StockItem } from "@/components/common";
import useDraggable from "@/hooks/use-draggable";
import { useRecentSearchStore } from "@/stores";
import { deleteRecentSearch } from "@/actions/stock";

const MyStockRecentSearches = () => {
  const ref = useRef(null);
  const draggableOptions = useDraggable(ref);
  const { stockItemList, allDeleteStockItem } = useRecentSearchStore();

  const handleAllDeleteSearch = async () => {
    allDeleteStockItem();
    // delete fetch 진행
    await deleteRecentSearch();
  };

  return (
    <div className="flex flex-col gap-[1.6rem]">
      <div className="flex_row justify-between">
        <h3 className="body_3 font-medium text-navy-900">최근 검색한 종목</h3>
        <span
          className="body_5 cursor-pointer font-medium text-grayscale-600 underline"
          onClick={handleAllDeleteSearch}
        >
          전체삭제
        </span>
      </div>
      <ul className="flex gap-[2rem] overflow-x-scroll scrollbar-hide" ref={ref} {...draggableOptions()}>
        {stockItemList.map((stock) => (
          <div key={stock.id} className="rounded-[1.6rem] border border-navy-100 px-[1.6rem] py-[2.4rem]">
            <StockItem variant="findStock" style="h-[4.8rem]" {...stock} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MyStockRecentSearches;

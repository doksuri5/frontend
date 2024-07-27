"use client";

import { useEffect, useState } from "react";
import SearchItem from "./SearchItem";
import SearchItemSkeleton from "./_skeleton/SearchItemSkeleton";
import { getSearchStocks } from "@/actions/search";
import { StockDataType } from "@/types";

type TMyStockSearchResultProps = {
  search: string;
};

const MyStockSearchResult = ({ search }: TMyStockSearchResultProps) => {
  const [lists, setLists] = useState<StockDataType[]>([]);
  const [isRender, setIsRender] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSearchStocks(undefined, { params: search });
      if (res.ok) {
        setLists(res.data);
        setIsRender(false);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div className="flex flex-col gap-[1.6rem]">
      <h3 className="body_3 font-medium text-navy-900">검색 결과</h3>
      <div className="flex_col h-[34rem] gap-[1.6rem] overflow-auto scrollbar-hide">
        {isRender ? (
          <>
            {Array.from({ length: 3 }).map((_, idx) => (
              <SearchItemSkeleton key={idx} />
            ))}
          </>
        ) : (
          <>{lists && lists.map((data) => <SearchItem key={data.id} data={data} />)}</>
        )}
      </div>
    </div>
  );
};

export default MyStockSearchResult;

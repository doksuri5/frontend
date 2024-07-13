"use client";

import { getRecentSearchDetails } from "@/actions/stock";
import SearchItem from "@/app/[lang]/(mystock)/mystock/_components/SearchItem";
import { StockDataType } from "@/types";
import { useEffect, useState } from "react";

type TMyStockSearchResultProps = {
  value: string;
};

const MyStockSearchResult = ({ value }: TMyStockSearchResultProps) => {
  const [lists, setLists] = useState<StockDataType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getRecentSearchDetails();
      setLists(res?.data.filter((data) => data.stockName.includes(value)));
    }

    fetchData();
  }, [value]);

  return (
    <div className="flex flex-col gap-[1.6rem]">
      <h3 className="body_3 font-medium text-navy-900">검색 결과</h3>
      <div className="flex_col gap-[1.6rem]">
        {lists && lists.map((data) => <SearchItem key={data.id} data={data} />)}
      </div>
    </div>
  );
};

export default MyStockSearchResult;

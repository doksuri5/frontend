"use client";

import { StockItemSkeleton } from "@/components/common";
import StockItem from "@/components/common/List/StockItem";
import { StockDataType } from "@/types";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

type TRelatedStocksProps = {
  stockData: StockDataType[];
};

const DUMMY_STOCK: StockDataType[] = [
  {
    id: nanoid(),
    stockName: "애플",
    symbolCode: "AAPL",
    compareToPreviousClosePrice: -1.75,
    fluctuationsRatio: -1.15,
    nationType: "USA",
    reutersCode: "AAPL.O",
    stockNameEng: "",
    closePrice: 0,
    marketPrice: 0,
    investmentIndex: 0,
    profitability: 0,
    growthRate: 0,
    interestRate: 0,
  },
  {
    id: nanoid(),
    stockName: "애플",
    symbolCode: "AAPL",
    compareToPreviousClosePrice: 2.5,
    fluctuationsRatio: 1.72,
    nationType: "USA",
    reutersCode: "AAPL.O",
    stockNameEng: "",
    closePrice: 0,
    marketPrice: 0,
    investmentIndex: 0,
    profitability: 0,
    growthRate: 0,
    interestRate: 0,
  },
  {
    id: nanoid(),
    stockName: "애플",
    symbolCode: "AAPL",
    compareToPreviousClosePrice: -0.75,
    fluctuationsRatio: -0.48,
    nationType: "USA",
    reutersCode: "AAPL.O",
    stockNameEng: "",
    closePrice: 0,
    marketPrice: 0,
    investmentIndex: 0,
    profitability: 0,
    growthRate: 0,
    interestRate: 0,
  },
];

export default function RelatedStocks() {
  const [stockData, setStockData] = useState<StockDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStockData(DUMMY_STOCK);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <section className="min-h-[31rem] min-w-[38.4rem] rounded-[1.6rem] bg-white p-[3.2rem]">
      <h2 className="body_3 pb-[1rem] font-bold text-navy-900">현재 뉴스와 관련된 주식</h2>
      <div className="flex flex-col gap-[0.8rem]">
        {loading &&
          Array(4)
            .fill(0)
            .map((_, index) => <StockItemSkeleton variant="findStock" key={index} />)}
        {!loading && stockData.map((stock) => <StockItem variant="findStock" key={stock.id} {...stock} />)}
      </div>
    </section>
  );
}

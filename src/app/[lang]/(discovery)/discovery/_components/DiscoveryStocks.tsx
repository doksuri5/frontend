"use client";

import { useEffect, useState } from "react";
import { StockItem, StockItemSkeleton } from "@/components/common";
import { StockDataType } from "@/types";
import DiscoverySection from "./DiscoverySection";
import Apple_icon from "@/public/icons/Apple_icon.svg";

type TStocksProps = {
  param: string;
};

const Stocks = ({ param }: TStocksProps) => {
  const [stockList, setStockList] = useState<StockDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStockList([
        {
          id: "1",
          stockName: "애플",
          symbolCode: "AAPL",
          closePrice: 0,
          nationType: "USA",
          compareToPreviousClosePrice: 1.75,
          fluctuationsRatio: 0.82,
          reutersCode: "AAPL.O",
          stockNameEng: "",
          marketPrice: 0,
          investmentIndex: 0,
          profitability: 0,
          growthRate: 0,
          interestRate: 0,
        },
        {
          id: "2",
          stockName: "애플",
          symbolCode: "AAPL",
          closePrice: 0,
          nationType: "USA",
          compareToPreviousClosePrice: -1.75,
          fluctuationsRatio: -0.82,
          reutersCode: "AAPL.O",
          stockNameEng: "",
          marketPrice: 0,
          investmentIndex: 0,
          profitability: 0,
          growthRate: 0,
          interestRate: 0,
        },
        {
          id: "3",
          stockName: "애플",
          symbolCode: "AAPL",
          nationType: "USA",
          compareToPreviousClosePrice: -1.75,
          fluctuationsRatio: -0.82,
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
          id: "4",
          stockName: "애플",
          symbolCode: "AAPL",
          nationType: "USA",
          compareToPreviousClosePrice: -1.75,
          fluctuationsRatio: -0.82,
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
          id: "5",
          stockName: "애플",
          symbolCode: "AAPL",
          nationType: "USA",
          compareToPreviousClosePrice: -1.75,
          fluctuationsRatio: -0.82,
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
          id: "6",
          stockName: "애플",
          symbolCode: "AAPL",
          nationType: "USA",
          compareToPreviousClosePrice: -1.75,
          fluctuationsRatio: -0.82,
          reutersCode: "AAPL.O",
          stockNameEng: "",
          closePrice: 0,
          marketPrice: 0,
          investmentIndex: 0,
          profitability: 0,
          growthRate: 0,
          interestRate: 0,
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const subTag = <span className={`body_5 font-medium text-grayscale-600`}>{`(${stockList.length})`}</span>;

  return (
    <DiscoverySection title="주식" subTag={subTag}>
      <div className="flex_col rounded-[1.6rem] bg-white p-[2.4rem]">
        <div className="grid w-full grid-cols-2 gap-x-[1.6rem] gap-y-[.8rem]">
          {loading ? (
            <>
              {Array.from({ length: 6 }).map((_, idx) => (
                <StockItemSkeleton key={idx} variant="findStock" />
              ))}
            </>
          ) : (
            <>
              {stockList.map((stock) => (
                <StockItem variant="findStock" key={stock.id} {...stock} />
              ))}
            </>
          )}
        </div>
        {loading || (
          <>
            <hr className="mb-[1.6rem] mt-[1.8rem]" />
            <p className="body_4 w-full cursor-pointer px-[1rem] text-center font-medium text-grayscale-400">더보기</p>
          </>
        )}
      </div>
    </DiscoverySection>
  );
};

export default Stocks;

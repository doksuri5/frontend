"use client";

import { use, useEffect, useState } from "react";
import { Toggle } from "@/components/common";
import { cn } from "@/utils/cn";
import { formatOnlyIndicator, getTextColor } from "@/utils/stockPriceUtils";
import { TReutersCodes } from "@/constants/stockCodes";
import { StockDataType } from "@/types";
import StockDetailSkeleton from "./skeleton/StockDetailSkeleton";
import { getStockAnalysis } from "@/actions/stock-analysis";
import isUSMarketOpen from "@/utils/check-us-market-open";
import CountUp from "react-countup";

type TStockDetail = {
  reutersCode: TReutersCodes;
};

export default function StockDetail({ reutersCode }: TStockDetail) {
  const [stock, setStock] = useState<StockDataType>();
  const [description, setDescription] = useState<string>("");
  const [currency, setCurrency] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const analysis = await getStockAnalysis(undefined, { params: reutersCode });
      if (!analysis.ok) {
        return;
      }

      setDescription(analysis.data[0].description);
    };

    fetchData();
  }, [reutersCode]);

  useEffect(
    function getStockPrice() {
      const fetchStockPrice = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stock-price/${reutersCode}`);
        if (!response.ok) {
          return console.error("Failed to fetch stock price in StockDetail.tsx");
        }
        const data = await response.json();
        setStock(data.data);
      };

      fetchStockPrice();
    },
    [reutersCode],
  );

  useEffect(
    function setEventSourceForSSE() {
      if (isUSMarketOpen()) {
        const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stock-price/sse/${reutersCode}`);

        eventSource.onmessage = (event) => {
          const newData = JSON.parse(event.data);
          setStock(newData);
        };

        eventSource.onerror = (error) => {
          console.error("EventSource failed:", error);
          eventSource.close();
        };

        return () => {
          eventSource.close();
        };
      }
    },
    [reutersCode],
  );

  if (!stock) return <StockDetailSkeleton />;

  return (
    <section className="min-h-[25.6rem] min-w-[48.8rem] rounded-[1.6rem] bg-white p-[3.2rem]">
      <div className="flex flex-col gap-[3.2rem]">
        <div>
          <div className="flex_row justify-between">
            <div>
              <div className="flex_row gap-[0.4rem]">
                <span className="body_1 font-bold">{currency ? `$${stock.closePrice}` : `₩${stock.closePrice}`}</span>
                <span className="body_1 font-bold">∙</span>
                <span className="body_2 font-normal">{stock.symbolCode}</span>
              </div>
              <div className={cn(`flex_row body_2 gap-[0.8rem] font-normal ${getTextColor(stock.fluctuationsRatio)}`)}>
                <span>
                  {formatOnlyIndicator(stock.compareToPreviousClosePrice)}
                  <CountUp end={Math.abs(stock.compareToPreviousClosePrice)} decimals={2} />
                </span>
                <span>
                  <CountUp end={Math.abs(stock.fluctuationsRatio)} decimals={2} />%
                </span>
              </div>
            </div>
            <Toggle checked={currency} setChecked={setCurrency} />
          </div>
        </div>
        <p>{description}</p>
      </div>
    </section>
  );
}

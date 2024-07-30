"use client";

import { StockPriceDataType } from "@/types/StockDataType";
import isUSMarketOpen from "@/utils/check-us-market-open";
import { useEffect, useState } from "react";

const useStockPrice = (reutersCode: string) => {
  const [loading, setIsLoading] = useState(false);
  const [stock, setStock] = useState<StockPriceDataType>();

  useEffect(
    function getStockPrice() {
      const fetchStockPrice = async () => {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stock/price/${reutersCode}`, {
          next: {
            revalidate: 3600,
          },
        });

        if (!response.ok) {
          return console.error("Failed to fetch stock price in StockDetail.tsx");
        }
        const data = await response.json();
        setIsLoading(false);
        setStock(data.data);
      };

      if (!isUSMarketOpen() || process.env.NODE_ENV === "development") {
        fetchStockPrice();
      }
    },
    [reutersCode],
  );

  useEffect(
    function setEventSourceForSSE() {
      // event source 객체는 로컬에서 작동시키지 않습니다. 이유는 http 1.1 프로토콜을 사용할 경우 event source 객체는 최대 6개의 동시 연결을 허용하기 때문입니다.
      // 로컬에서 event source 객체가 6개 이상 생성되는 매우 느려집니다. 이를 방지하기 위해 event source 객체를 사용하지 않습니다.
      if (isUSMarketOpen() && process.env.NODE_ENV === "production") {
        setIsLoading(true);
        const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stock/price/sse/${reutersCode}`);

        eventSource.onmessage = (event) => {
          const newData = JSON.parse(event.data);
          setStock(newData);
        };

        eventSource.onerror = (error) => {
          eventSource.close();
        };

        setIsLoading(false);
        return () => {
          eventSource.close();
        };
      }
    },
    [reutersCode],
  );

  return {
    stock: stock as StockPriceDataType,
    loading,
  };
};

export default useStockPrice;

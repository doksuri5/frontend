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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stock-price/${reutersCode}`);
        if (!response.ok) {
          return console.error("Failed to fetch stock price in StockDetail.tsx");
        }
        const data = await response.json();
        setIsLoading(false);
        setStock(data.data);
      };

      if (!isUSMarketOpen()) {
        fetchStockPrice();
      }
    },
    [reutersCode],
  );

  useEffect(
    function setEventSourceForSSE() {
      if (isUSMarketOpen()) {
        setIsLoading(true);
        const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stock-price/sse/${reutersCode}`);

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

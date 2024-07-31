"use client";

import { StockPriceDataType } from "@/types/StockDataType";
import isUSMarketOpen from "@/utils/check-us-market-open";
import { useEffect, useRef, useState, useCallback } from "react";

const useStockPrice = (reutersCode: string) => {
  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState<StockPriceDataType | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchStockPrice = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stock/price/${reutersCode}`, {
        next: { revalidate: 3600 },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch stock price");
      }
      const { data } = await response.json();
      setStock(data);
    } catch (error) {
      console.error("Error fetching stock price:", error);
    } finally {
      setLoading(false);
    }
  }, [reutersCode]);

  const debouncedSetStock = useCallback((newData: StockPriceDataType) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setStock(newData);
      setLoading(false);
    }, 200);
  }, []);

  const cleanupEventSource = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  }, []);

  const setupEventSource = useCallback(() => {
    if (eventSourceRef.current) return;

    setLoading(true);
    eventSourceRef.current = new EventSource(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stock/price/sse/${reutersCode}`);

    eventSourceRef.current.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      debouncedSetStock(newData);
    };

    eventSourceRef.current.onerror = () => {
      console.error("EventSource failed. Closing connection.");
      cleanupEventSource();
    };
  }, [reutersCode, debouncedSetStock, cleanupEventSource]);

  useEffect(() => {
    if (!isUSMarketOpen() || process.env.NODE_ENV === "development") {
      fetchStockPrice();
    } else {
      setupEventSource();
    }

    return cleanupEventSource;
  }, [reutersCode, fetchStockPrice, setupEventSource, cleanupEventSource]);

  return { stock, loading };
};

export default useStockPrice;

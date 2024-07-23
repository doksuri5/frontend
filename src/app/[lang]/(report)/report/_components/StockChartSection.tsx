"use client";

import { Button } from "@/components/common";
import { cn } from "@/utils/cn";
import { useEffect, useState, useTransition } from "react";
import StockChart from "./StockChart";
import clsx from "clsx";
import { getStockChartData } from "@/actions/stock";
import { TReutersCodes } from "@/constants/stockCodes";
import StockChartSectionSkeleton from "./skeleton/StockChartSectionSkeleton";
import { MAPPED_PERIOD, StockChartDataType, TMappedPeriod } from "@/types/StockDataType";
import calculatePeriod from "@/utils/calculate-period";
import isUSMarketOpen from "@/utils/check-us-market-open";
type TChartData = {
  reutersCode: TReutersCodes;
};

export default function StockChartSection({ reutersCode }: TChartData) {
  const [period, setPeriod] = useState<keyof TMappedPeriod>("일");
  const chartButton: (keyof TMappedPeriod)[] = ["일", "주", "월", "분기", "년"] as const;
  const [chartData, setChartData] = useState<StockChartDataType[]>();
  const [isPending, startTransition] = useTransition();

  useEffect(
    function fetchStockDataByPeriod() {
      const fetchData = async () => {
        const [startDateTime, endDateTime] = calculatePeriod(period);
        const response = await getStockChartData(undefined, {
          params: `${reutersCode}/${MAPPED_PERIOD[period]}`,
          queryString: [`startDateTime=${startDateTime}`, `endDateTime=${endDateTime}`],
        });

        if (!response.data && !response.ok) {
          return;
        }

        setChartData(response.data);
      };
      startTransition(async () => {
        await fetchData();
      });
    },
    [period, reutersCode],
  );

  useEffect(
    function setEventSourceForSSE() {
      if (isUSMarketOpen() && period === "일") {
        const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stock-price/sse/${reutersCode}`);

        eventSource.onmessage = (event) => {
          const newData = JSON.parse(event.data);

          setChartData((prev) => {
            if (prev) {
              const parsedData = {
                ...prev[prev.length - 1],
                closePrice: newData.closePrice,
              };

              return prev.slice(0, -1).concat(parsedData);
            }
            return prev;
          });
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
    [period, reutersCode],
  );

  if (isPending && !chartData) {
    return <StockChartSectionSkeleton />;
  }

  return (
    <section className="flex min-h-[25.6rem] min-w-[69.2rem] flex-col gap-[0.8rem] rounded-[1.6rem] bg-white p-[3.2rem]">
      <div className="flex flex-row justify-between gap-[0.8rem]">
        <h2 className="body_1 font-bold text-navy-900">주가차트</h2>
        <div className="flex">
          {chartButton.map((button, idx) => (
            <Button
              key={idx}
              size="sm"
              className={cn(
                "min-h-[3.2rem] min-w-[6.4rem]",
                clsx(period === button ? "bg-[#E6E9EF] text-navy-900" : "bg-[#FFFFF] text-grayscale-400"),
              )}
              onClick={() => setPeriod(button)}
            >
              {button}
            </Button>
          ))}
        </div>
      </div>
      <StockChart chartData={chartData ?? []} period={period} />
    </section>
  );
}

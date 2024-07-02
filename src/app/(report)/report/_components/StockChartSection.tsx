"use client";

import { Button } from "@/components/common";
import { cn } from "@/utils/cn";
import { useState } from "react";
import StockChart from "./StockChart";
import clsx from "clsx";

type TChartData = {
  chartData: {
    period: string;
    price: number;
  }[];
};

export default function StockChartSection({ chartData }: TChartData) {
  const [period, setPeriod] = useState("1일");
  const chartButton = ["1일", "3개월", "1년", "3년", "10년"];

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
      <StockChart chartData={chartData} />
    </section>
  );
}

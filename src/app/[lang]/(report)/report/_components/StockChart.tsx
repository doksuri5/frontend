"use client";

import { StockChartDataType, TMappedPeriod } from "@/types/StockDataType";
import { set } from "mongoose";
import { useEffect, useState } from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";

type TChartData = {
  chartData: StockChartDataType[];
  period: keyof TMappedPeriod;
};

export default function StockChart({ chartData, period }: TChartData) {
  const [isClient, setIsClient] = useState(false);
  const [isTooltipActive, setIsTooltipActive] = useState(false);
  const [defaultIndex, setDefaultIndex] = useState<number>();

  useEffect(() => {
    const error = console.error;

    console.error = (...args: any) => {
      if (/defaultProps/.test(args[0])) return;

      error(...args);
    };

    const timeId = setTimeout(() => {
      setIsTooltipActive(true);
      setDefaultIndex(chartData.length - 1);
    }, 500);

    setIsClient(true);

    return () => {
      clearTimeout(timeId);
    };
  }, [chartData.length]);

  const interval = {
    일: 6,
    주: 4,
    월: 7,
    분기: 4,
    년: 1,
  };

  // add last month ticks
  const monthTicks = chartData.map((data) => data.localDate).filter((_, idx) => idx % interval[period] === 0);

  if (!isClient) return null;

  return (
    <AreaChart data={chartData} width={640} height={145} margin={{ top: 10 }}>
      <defs>
        <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(71, 180, 225, 0.7)" />
          <stop offset="100%" stopColor="rgba(71, 180, 225, 0.07)" />
        </linearGradient>
      </defs>
      <XAxis
        dataKey="localDate"
        ticks={monthTicks}
        tickFormatter={(tick: string) => {
          const year = tick.slice(0, 4);
          const month = tick.slice(4, 6);
          return `${period === "일" ? "" : `${year}/`}${month}${period === "일" ? `/${tick.slice(6, 8)}` : ""}`;
        }}
        tick={{ fontSize: 12, fontWeight: 400, fill: "#9F9F9F", dx: -10 }} // 레이블 스타일
        tickLine={false} // 레이블 선 스타일
        axisLine={false} // 축 스타일
      />
      <YAxis
        orientation="right"
        axisLine={false} // 축 스타일
        tickLine={false}
        tick={{ fontSize: 12, fontWeight: 400, fill: "#9F9F9F" }} // 레이블 스타일
      />
      <Tooltip defaultIndex={defaultIndex} active={isTooltipActive} />
      <Area type="monotone" dataKey="closePrice" stroke="#47B4E1" fillOpacity={1} fill="url(#customGradient)" />
    </AreaChart>
  );
}

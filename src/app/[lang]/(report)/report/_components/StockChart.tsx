"use client";

import { useReportStore } from "@/providers/ReportProvider";
import { TPeriod } from "@/stores/useReportStore";
import { StockChartDataType } from "@/types/StockDataType";
import { useEffect, useState } from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";

type TChartData = {
  chartData: StockChartDataType[];
  period: TPeriod;
};

export default function StockChart({ chartData, period }: TChartData) {
  const isExtended = useReportStore((state) => state.isExtended);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const error = console.error;

    console.error = (...args: any) => {
      if (/defaultProps/.test(args[0])) return;

      error(...args);
    };

    setIsClient(true);
  }, []);

  const interval = {
    day: 6,
    week: 4,
    month: 7,
    quarter: 4,
    year: 1,
  };

  // add last month ticks
  const monthTicks = chartData.map((data) => data.localDate).filter((_, idx) => idx % interval[period] === 0);

  if (!isClient) return null;

  return (
    <ResponsiveContainer width="100%" height="80%">
      <AreaChart data={chartData} margin={{ top: 10 }}>
        <defs>
          <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(71, 180, 225, 0.7)" />
            <stop offset="100%" stopColor="rgba(71, 180, 225, 0.07)" />
          </linearGradient>
        </defs>
        <XAxis
          hide={isExtended}
          dataKey="localDate"
          ticks={monthTicks}
          tickFormatter={(tick: string) => {
            const year = tick.slice(0, 4);
            const month = tick.slice(4, 6);
            return `${period === "day" ? "" : `${year}/`}${month}${period === "day" ? `/${tick.slice(6, 8)}` : ""}`;
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
        <Tooltip />
        <Area type="monotone" dataKey="closePrice" stroke="#47B4E1" fillOpacity={1} fill="url(#customGradient)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

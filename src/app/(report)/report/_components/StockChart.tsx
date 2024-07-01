// "use client";

import { useEffect } from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";

const DUMMY_CHART_DATA = [
  { period: "2024/04/1week", price: 41310 },
  { period: "2024/04/2week", price: 32030 },
  { period: "2024/04/3week", price: 20400 },
  { period: "2024/04/4week", price: 27820 },
  { period: "2024/05/1week", price: 18910 },
  { period: "2024/05/2week", price: 23900 },
  { period: "2024/05/3week", price: 34920 },
  { period: "2024/05/4week", price: 20060 },
  { period: "2024/06/1week", price: 27890 },
  { period: "2024/06/2week", price: 18980 },
  { period: "2024/06/3week", price: 23910 },
  { period: "2024/06/4week", price: 34920 },
];

export default function StockChart({}) {
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
  // 각 월의 중앙에 위치할 레이블의 인덱스 계산
  const monthTicks = [
    DUMMY_CHART_DATA[1].period, // 2024/04
    DUMMY_CHART_DATA[5].period, // 2024/05
    DUMMY_CHART_DATA[9].period, // 2024/06
  ];
  return (
    <AreaChart data={DUMMY_CHART_DATA} width={610} height={145} margin={{ top: 10 }}>
      <defs>
        <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(71, 180, 225, 0.7)" />
          <stop offset="100%" stopColor="rgba(71, 180, 225, 0.07)" />
        </linearGradient>
      </defs>
      <XAxis
        dataKey="period"
        ticks={monthTicks}
        tickFormatter={(tick: string) => {
          const [year, month] = tick.split("/");
          return `${year}/${month}`;
        }}
        tick={{ fontSize: 12, fontWeight: 400, fill: "#9F9F9F", dx: 20 }} // 레이블 스타일
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
      <Area type="monotone" dataKey="price" stroke="#47B4E1" fillOpacity={1} fill="url(#customGradient)" />
    </AreaChart>
  );
}

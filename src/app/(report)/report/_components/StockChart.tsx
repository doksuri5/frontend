import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";

type TChartData = {
  chartData: {
    period: string;
    price: number;
  }[];
};

export default function StockChart({ chartData }: TChartData) {
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  // 각 월의 중앙에 위치할 레이블의 인덱스 계산
  const monthTicks = [
    chartData[1].period, // 2024/04
    chartData[5].period, // 2024/05
    chartData[9].period, // 2024/06
  ];

  return (
    <AreaChart data={chartData} width={640} height={145} margin={{ top: 10 }}>
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

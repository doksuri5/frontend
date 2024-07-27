import { useReportStore } from "@/providers/ReportProvider";
import { StockChartDataType } from "@/types/StockDataType";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AccumulationBarChart = ({ chartData }: { chartData: StockChartDataType[] }) => {
  const period = useReportStore((state) => state.period);

  const interval = {
    일: 6,
    주: 4,
    월: 7,
    분기: 4,
    년: 1,
  };

  const monthTicks = chartData.map((data) => data.localDate).filter((_, idx) => idx % interval[period] === 0);

  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart
        barGap={0}
        data={chartData}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <YAxis
          orientation="right"
          axisLine={false} // 축 스타일
          tickLine={false}
          tick={false}
        />
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
        <Tooltip />
        <Bar dataKey="accumulatedTradingVolume" fill="#8884d8" minPointSize={10} barSize={5}></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AccumulationBarChart;

"use client";

import AppleIcon from "@/public/icons/Apple_icon.svg";
import ReportHeader from "./ReportHeader";
import StockDetail from "./StockDetail";
import StockChartSection from "./StockChartSection";
import AIAnalystReport from "./AIAnalystReport";
import StockAIReport from "./StockAIReport";
import PopularNews from "@/components/common/PopularNews";
import { DUMMY_POPULAR_NEWS_ITEMS } from "@/app/[lang]/(news)/news/_components";
import ReportHeaderSkeleton from "./skeleton/ReportHeaderSkeleton";
import StockDetailSkeleton from "./skeleton/StockDetailSkeleton";
import StockChartSectionSkeleton from "./skeleton/StockChartSectionSkeleton";
import StockAIReportSkeleton from "./skeleton/StockAIReportSkeleton";
import AIAnalystReportSkeleton from "./skeleton/AIAnalystReportSkeleton";
import { lazy, Suspense, useEffect, useState } from "react";
import PopularNewsSkeleton from "@/components/common/skeleton/PopularNewsSkeleton";
import { TReutersCodes } from "@/constants/stockCodes";
import { getStocksByReutersCode } from "@/actions/stock";

const DUMMY_CHART = [
  { period: "2024/04/1week", price: 4000 },
  { period: "2024/04/2week", price: 3000 },
  { period: "2024/04/3week", price: 2000 },
  { period: "2024/04/4week", price: 2780 },
  { period: "2024/05/1week", price: 1890 },
  { period: "2024/05/2week", price: 2390 },
  { period: "2024/05/3week", price: 3490 },
  { period: "2024/05/4week", price: 2000 },
  { period: "2024/06/1week", price: 2780 },
  { period: "2024/06/2week", price: 1890 },
  { period: "2024/06/3week", price: 2390 },
  { period: "2024/06/4week", price: 3490 },
];

const PopularNewsComponent = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) =>
      setTimeout(() => resolve(import("@/components/common/PopularNews")), 2000),
    ),
);

export default function Report({ reutersCode }: { reutersCode: TReutersCodes }) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setChartData(DUMMY_CHART);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col gap-[2.4rem] pb-[12rem] pt-[4.7rem]">
      <ReportHeader reutersCode={reutersCode} />
      <div className="flex gap-[2.1rem]">
        <StockDetail reutersCode={reutersCode} />
        {loading ? <StockChartSectionSkeleton /> : <StockChartSection chartData={chartData} />}
      </div>
      <div className="flex flex-row gap-[2.1rem]">
        <StockAIReport reutersCode={reutersCode} />
        <AIAnalystReport reutersCode={reutersCode} />
      </div>
      <Suspense fallback={<PopularNewsSkeleton />}>
        <PopularNewsComponent popularNewsData={DUMMY_POPULAR_NEWS_ITEMS} />
      </Suspense>
    </div>
  );
}

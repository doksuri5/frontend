"use client";

import ReportHeader from "./ReportHeader";
import StockDetail from "./StockDetail";
import StockChartSection from "./StockChartSection";
import AIAnalystReport from "./AIAnalystReport";
import StockAIReport from "./StockAIReport";
import { DUMMY_POPULAR_NEWS_ITEMS } from "@/app/[lang]/(news)/news/_components";
import { lazy, Suspense } from "react";
import PopularNewsSkeleton from "@/components/common/skeleton/PopularNewsSkeleton";
import { TReutersCodes } from "@/constants/stockCodes";

const PopularNewsComponent = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) =>
      setTimeout(() => resolve(import("@/components/common/PoPularNews")), 2000),
    ),
);

export default function Report({ reutersCode }: { reutersCode: TReutersCodes }) {
  return (
    <div className="flex flex-col gap-[2.4rem] pb-[12rem] pt-[4.7rem]">
      <ReportHeader reutersCode={reutersCode} />
      <div className="flex gap-[2.1rem]">
        <StockDetail reutersCode={reutersCode} />
        <StockChartSection reutersCode={reutersCode} />
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

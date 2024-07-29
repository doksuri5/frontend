import { Suspense } from "react";
import { TReutersCodes } from "@/constants/stockCodes";
import PopularNewsSkeleton from "@/components/common/skeleton/PopularNewsSkeleton";
import { PopularNews } from "@/components/common";
import ReportHeader from "../_components/ReportHeader";
import StockDetail from "../_components/StockDetail";
import StockChartSection from "../_components/StockChartSection";
import StockAIReport from "../_components/StockAIReport";
import AIAnalystReport from "../_components/AIAnalystReport";

export default function ReportPage({ params }: { params: { stockReutersCode: TReutersCodes } }) {
  const { stockReutersCode } = params;

  return (
    <div className="flex flex-col gap-[2.4rem] pb-[12rem] pt-[4.7rem]">
      <ReportHeader reutersCode={stockReutersCode} />
      <div className="flex gap-[2.1rem]">
        <StockDetail reutersCode={stockReutersCode} />
        <StockChartSection reutersCode={stockReutersCode} />
      </div>
      <div className="flex flex-row gap-[2.1rem]">
        <StockAIReport reutersCode={stockReutersCode} />
        <AIAnalystReport reutersCode={stockReutersCode} />
      </div>
      <Suspense fallback={<PopularNewsSkeleton />}>
        <PopularNews />
      </Suspense>
    </div>
  );
}

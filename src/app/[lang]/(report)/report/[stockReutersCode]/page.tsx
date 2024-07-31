import { Suspense } from "react";
import { TReutersCodes } from "@/constants/stockCodes";
import PopularNewsSkeleton from "@/components/common/skeleton/PopularNewsSkeleton";
import { PopularNews } from "@/components/common";
import ReportHeader from "../_components/ReportHeader";
import StockDetail from "../_components/StockDetail";
import StockChartSection from "../_components/StockChartSection";
import StockAIReport from "../_components/StockAIReport";
import AIAnalystReport from "../_components/AIAnalystReport";
import AIAnalystReportSkeleton from "../_components/skeleton/AIAnalystReportSkeleton";
import StockAIReportSkeleton from "../_components/skeleton/StockAIReportSkeleton";
import ReportHeaderSkeleton from "../_components/skeleton/ReportHeaderSkeleton";
import { Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";

export default function ReportPage({ params }: { params: { stockReutersCode: TReutersCodes; lang: Locale } }) {
  unstable_setRequestLocale(params.lang);
  const { stockReutersCode } = params;

  return (
    <div className="flex flex-col gap-[2.4rem] pb-[12rem] pt-[4.7rem]">
      <Suspense fallback={<ReportHeaderSkeleton />}>
        <ReportHeader reutersCode={stockReutersCode} />
      </Suspense>
      <div className="flex gap-[2.1rem]">
        <StockDetail reutersCode={stockReutersCode} />
        <StockChartSection reutersCode={stockReutersCode} />
      </div>
      <div className="flex flex-row gap-[2.1rem]">
        <Suspense fallback={<StockAIReportSkeleton />}>
          <StockAIReport reutersCode={stockReutersCode} />
        </Suspense>
        <Suspense fallback={<AIAnalystReportSkeleton />}>
          <AIAnalystReport reutersCode={stockReutersCode} />
        </Suspense>
      </div>
      <Suspense fallback={<PopularNewsSkeleton />}>
        <PopularNews />
      </Suspense>
    </div>
  );
}

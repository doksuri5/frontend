import ReportHeader from "./ReportHeader";
import StockDetail from "./StockDetail";
import StockChartSection from "./StockChartSection";
import AIAnalystReport from "./AIAnalystReport";
import StockAIReport from "./StockAIReport";
import { Suspense } from "react";
import PopularNewsSkeleton from "@/components/common/skeleton/PopularNewsSkeleton";
import { TReutersCodes } from "@/constants/stockCodes";
import { PopularNews } from "@/components/common";
import { fetchPopularNews } from "@/actions/news";

export default async function Report({ reutersCode }: { reutersCode: TReutersCodes }) {
  const newsData = await fetchPopularNews();

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
        <PopularNews popularNewsData={newsData ?? []} />
      </Suspense>
    </div>
  );
}

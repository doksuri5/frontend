import NewsBox from "./_components/news-box";
import AiReports from "./_components/ai-reports";
import RecentLookup from "./_components/recent-lookup";
import { Suspense } from "react";
import InterestStocks from "./_components/interest-stocks";
import { Locale } from "@/i18n";
import { Skeleton } from "@/components/common";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="flex h-full flex-col gap-[4.8rem] bg-background-100 pb-[10rem]">
      <AiReports />
      <section className="flex w-full gap-[2rem]">
        <Suspense
          fallback={
            <div className="flex flex-1 flex-col gap-[2.4rem]">
              <Skeleton className="h-[3.6rem] w-1/2" />
              <Skeleton className="h-[34rem] flex-1" />
            </div>
          }
        >
          <RecentLookup />
        </Suspense>
        <Suspense
          fallback={
            <div className="flex flex-1 flex-col gap-[2.4rem]">
              <Skeleton className="h-[3.6rem] w-1/2" />
              <Skeleton className="h-[34rem] flex-1" />
            </div>
          }
        >
          <InterestStocks />
        </Suspense>
      </section>
      <NewsBox />
    </div>
  );
}

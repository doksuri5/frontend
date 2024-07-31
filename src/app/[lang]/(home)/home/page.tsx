import NewsBox from "./_components/news-box";
import AiReports from "./_components/ai-reports";
import RecentLookup from "./_components/recent-lookup";
import { Suspense } from "react";
import InterestStocks from "./_components/interest-stocks";

export default async function HomePage() {
  return (
    <div className="flex h-full flex-col gap-[4.8rem] bg-background-100 pb-[10rem]">
      <AiReports />
      <section className="flex w-full gap-[2rem]">
        <Suspense>
          <RecentLookup />
        </Suspense>
        <Suspense>
          <InterestStocks />
        </Suspense>
      </section>
      <NewsBox />
    </div>
  );
}

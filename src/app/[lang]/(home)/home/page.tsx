import NewsBox from "./_components/news-box";
import AiReports from "./_components/ai-reports";
import RecentLookup from "./_components/recent-lookup";
import { Suspense } from "react";
import InterestStocks from "./_components/interest-stocks";
import { Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import { Skeleton } from "@/components/common";

export default async function HomePage({ params }: { params: { lang: Locale } }) {
  unstable_setRequestLocale(params.lang);

  return (
    <div className="flex h-full flex-col gap-[4.8rem] bg-background-100 pb-[10rem]">
      <Suspense
        fallback={
          <div className="flex min-w-[43.4rem] flex-col gap-[2.4rem]">
            <Skeleton className="h-[13rem] w-1/2" />
            <div className="w- flex w-full gap-4">
              <div className="max-h-[28rem] flex-1 rounded-[1.6rem] bg-white p-[3.2rem]">
                <Skeleton className="h-[22rem] w-full" />
              </div>
              <div className="max-h-[28rem] flex-1 rounded-[1.6rem] bg-white p-[3.2rem]">
                <Skeleton className="h-[22rem] w-full" />
              </div>
              <div className="max-h-[28rem] flex-1 rounded-[1.6rem] bg-white p-[3.2rem]">
                <Skeleton className="h-[22rem] w-full" />
              </div>
            </div>
          </div>
        }
      >
        <AiReports />
      </Suspense>
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

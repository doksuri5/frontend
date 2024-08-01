import NewsBox from "./_components/news-box";
import RecentLookup from "./_components/recent-lookup";
import { Suspense } from "react";
import InterestStocks from "./_components/interest-stocks";
import { Skeleton } from "@/components/common";
import { unstable_setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";
export const revalidate = 30;

export default function HomePage({ params }: { params: { lang: string } }) {
  unstable_setRequestLocale(params.lang);

  return (
    <>
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
    </>
  );
}

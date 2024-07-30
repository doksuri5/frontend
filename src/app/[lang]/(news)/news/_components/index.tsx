import WarningIcon from "@/public/icons/warning_icon.svg?component";
import { Card, CardSkeleton, PopularNews, PopularNewsSkeleton } from "@/components/common";
import { Suspense } from "react";
import { getTimeDifference } from "@/utils/getTimeDifference";
import RecentNews from "@/app/[lang]/(home)/home/_components/recent-news";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";

export default async function News({ interestStockNews }: any) {
  const session = await auth();
  const t = await getTranslations();

  return (
    <div className="flex flex-col gap-[4.8rem] pb-[8rem] pt-[5.6rem]">
      <Suspense fallback={<PopularNewsSkeleton />}>
        <PopularNews />
      </Suspense>
      <div className="flex w-full flex-col gap-[2.4rem]">
        <h2 className="heading_4 font-bold text-navy-900">
          {t("news.newsRelatedInterestStock", { defaultMessage: "관심종목과 관련된 뉴스" })}
        </h2>
        <div className="flex gap-[2rem]">
          <Suspense
            fallback={Array(3)
              .fill(0)
              .map((_, index) => (
                <CardSkeleton key={index} variant="halfMediaCard" style="w-1/3" />
              ))}
          >
            {interestStockNews.value.length > 0 ? (
              interestStockNews.value.map((news: any) => (
                <Card
                  key={news._id}
                  _id={news._id}
                  variant="halfMediaCard"
                  style="w-1/3"
                  date={`${getTimeDifference(news.date, session?.user.language ?? "ko")}`}
                  title={news.title}
                  image={news.image}
                  content={news.description}
                  publisher={news.publisher}
                />
              ))
            ) : (
              <div className="flex_row_col min-h-[36rem] flex-1 gap-2 rounded-lg bg-white">
                <WarningIcon />
                <p className="body_4 font-medium text-navy-900">추가된 관심 종목이 없습니다.</p>
              </div>
            )}
          </Suspense>
        </div>
      </div>
      <div className="flex w-full flex-col gap-[2.4rem]">
        <RecentNews isHeading={true} />
      </div>
    </div>
  );
}

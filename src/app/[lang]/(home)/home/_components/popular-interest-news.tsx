import { fetchInterestStockNews, fetchPopularNews } from "@/actions/news";
import { Card, NewsItem } from "@/components/common";
import { getTranslations } from "next-intl/server";
import { cn } from "@/utils/cn";

const PopularInterestNews = async () => {
  const t = await getTranslations("home");
  const interestNews = await fetchInterestStockNews();
  const popularNews = (await fetchPopularNews()) ?? [];

  return (
    <>
      <p className="body_1 pb-[1.6rem]">{t("interestStocks")}</p>
      <div className={cn("flex", interestNews.length === 2 ? "justify-start gap-[2rem]" : "justify-between")}>
        {interestNews.map((item: any) => {
          return (
            <Card
              key={item._id}
              _id={item._id}
              variant="iconCard"
              date={item.date}
              title={item.title}
              stockCode={item.relativeStockName}
              style={"transition duration-300 ease-in-out hover:bg-grayscale-100"}
            />
          );
        })}
      </div>
      <p className="body_1 pb-[1.6rem] pt-[4.8rem]">{t("popularNews")}</p>
      <div className="flex flex-col gap-[1.6rem] divide-y rounded-[1.6rem] border p-[4.8rem]">
        {popularNews && (
          <NewsItem
            variant="lineClamp-4"
            _id={popularNews[0]._id}
            image={popularNews[0].image}
            title={popularNews[0].title}
            description={popularNews[0].description}
            publishedTime={popularNews[0].date}
            publisher={popularNews[0].publisher}
          />
        )}
      </div>
    </>
  );
};

export default PopularInterestNews;

import { fetchInterestStockNews, fetchPopularNews } from "@/actions/news";
import { Card, NewsItem } from "@/components/common";
import DraggableList from "@/components/common/DraggableList";
import { getTranslations } from "next-intl/server";

const PopularInterestNews = async () => {
  const t = await getTranslations("home");
  const interestNews = await fetchInterestStockNews();
  const popularNews = (await fetchPopularNews()) ?? [];

  return (
    <>
      <p className="body_1 pb-[1.6rem]">{t("interestStocks")}</p>
      <DraggableList>
        {interestNews.map((item: any) => (
          <Card key={item._id} _id={item._id} variant="iconCard" date={item.date} title={item.title} />
        ))}
      </DraggableList>
      <p className="body_1 pb-[1.6rem] pt-[4.8rem]">{t("popularNews")}</p>
      <div className="flex flex-col gap-[1.6rem] divide-y rounded-[1.6rem] border p-[4.8rem]">
        <NewsItem
          variant="lineClamp-4"
          _id={popularNews[0]._id}
          image={popularNews[0].image}
          title={popularNews[0].title}
          description={popularNews[0].description}
          publishedTime={popularNews[0].date}
          publisher={popularNews[0].publisher}
        />
      </div>
    </>
  );
};

export default PopularInterestNews;

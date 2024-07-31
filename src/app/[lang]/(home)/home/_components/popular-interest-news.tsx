import { fetchInterestStockNews, fetchPopularNews } from "@/actions/news";
import { Card, NewsItem } from "@/components/common";
import DraggableList from "@/components/common/DraggableList";

const PopularInterestNews = async () => {
  const interestNews = await fetchInterestStockNews();
  const popularNews = (await fetchPopularNews()) ?? [];

  return (
    <>
      <p className="body_1 pb-[1.6rem]">관심종목</p>
      <DraggableList>
        {interestNews.map((item: any) => {
          return (
            <Card
              key={item._id}
              _id={item._id}
              variant="iconCard"
              date={item.date}
              title={item.title}
              stockCode={item.relativeStockName}
            />
          );
        })}
      </DraggableList>
      <p className="body_1 pb-[1.6rem] pt-[4.8rem]">주요 뉴스</p>
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

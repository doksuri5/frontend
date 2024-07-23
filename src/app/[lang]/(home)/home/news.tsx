"use client";

import { Card } from "@/components/common";
import NewsItem from "@/components/common/List/NewsItem";
import useDraggable from "@/hooks/use-draggable";
import { useRef } from "react";
import NewsImage from "@/public/icons/news.jpg";
import { NewsItemType } from "@/types";
import NewsInfinityList from "../../(news)/news/_components/NewsInfinityList";
import useInfiniteNews from "@/hooks/useInfiniteNews";

const NEWS = [
  {
    id: 1,
    date: "2024.06.24",
    title: "中제외 배터리 시장, 중국업체들의...",
    stockCode: "AAPL",
    image: null,
    content: null,
    publisher: null,
    size: null,
  },
  {
    id: 2,
    date: "2024.06.24",
    title: "中제외 배터리 시장, 중국업체들의...",
    stockCode: "AAPL",
    image: null,
    content: null,
    publisher: null,
    size: null,
  },
  {
    id: 3,
    date: "2024.06.24",
    title: "中제외 배터리 시장, 중국업체들의...",
    stockCode: "AAPL",
    image: null,
    content: null,
    publisher: null,
    size: null,
  },
];

const DUMMY_NEWS_ITEMS = [...Array(3)].map(
  (_, index): NewsItemType => ({
    _id: String(index),
    image: NewsImage,
    title: "엔비디아 또 신고가… 시총 2위 애플과 962억달러 차이",
    description: `윤석열 대통령이 "포항 앞바다에 막대한 양의 석유·천연가스 매장 가능성이 있다"고 발표하면서 석유주가 이틀째 급등했다.3일 한국석유(004090)는 전일대비 5350원(29.81%) 오른 2만3300원에 거래를 마쳤다. 한국석유는 전날에도 상한가로 장을 마친 바 있다.이 외에도 한국ANKOR유전도 상한가를 찍었고, 흥구석유(024060)는 18.40% 올랐다.윤석열 대통령은 전날 용산 대통령실에서 열린 국정 브리핑에서 "포항 영일만 앞바다에 막대한 양의 석유와 가스가 매장돼 있을 가능성이 높다는 물리탐사 결과가 나왔다"고 밝혔다.매장량은 최대 140억 배럴 가능성이 예상되며 천연가스는 29년, 석유는 4년 이상 사용할 양이라고 설명했다.`,
    publishedTime: "7",
    publisher: "문화일보",
  }),
);

const News = ({ popularNews, interestNews }: { popularNews: any; interestNews: any }) => {
  const ref = useRef(null);
  const draggableOptions = useDraggable(ref);
  const { newsData, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteNews();
  const handleFetchNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <section>
      <h2 className="heading_4 pb-[2.4rem] font-bold">스팩님을 위한 주식 뉴스</h2>
      <div className="flex flex-col rounded-[1.6rem] bg-white p-[4.8rem]">
        <p className="body_1 pb-[1.6rem]">관심종목</p>
        <ul className="flex gap-[2rem] overflow-x-scroll scrollbar-hide" ref={ref} {...draggableOptions()}>
          {interestNews.map((item: any) => (
            <Card key={item.id} variant="iconCard" date={item.date} title={item.title} />
          ))}
        </ul>
        <p className="body_1 pb-[1.6rem] pt-[4.8rem]">주요 뉴스</p>
        <ul className="flex flex-col gap-[1.6rem] divide-y rounded-[1.6rem] border p-[4.8rem]">
          <div className="pb-[3.2rem] pt-[1.6rem] shadow-sm">
            <NewsItem
              _id={popularNews[0]._id}
              variant="lineClamp-4"
              image={popularNews[0].image}
              title={popularNews[0].title}
              description={popularNews[0].description}
              publishedTime={popularNews[0].date}
              publisher={popularNews[0].publisher}
            />
          </div>
        </ul>
        <p className="body_1 pb-[1.6rem] pt-[4.8rem]">최신 뉴스</p>
        <div className="flex gap-[2rem]">
          <NewsInfinityList
            newsItems={newsData}
            lineClamp={"lineClamp-4"}
            variant="border"
            style="max-h-[85rem]"
            fetchNextPage={handleFetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            status={status}
          />
        </div>
      </div>
    </section>
  );
};

export default News;

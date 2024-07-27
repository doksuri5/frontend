"use client";

import { Card } from "@/components/common";
import NewsItem from "@/components/common/List/NewsItem";
import useDraggable from "@/hooks/use-draggable";
import { useRef } from "react";
import NewsInfinityList from "../../(news)/news/_components/NewsInfinityList";
import useInfiniteNews from "@/hooks/useInfiniteNews";
import { useSession } from "next-auth/react";

const News = ({ popularNews, interestNews }: { popularNews: any; interestNews: any }) => {
  const session = useSession();
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
      <h2 className="heading_4 pb-[2.4rem] font-bold">{session.data?.user.name ?? "김스팩"}님을 위한 주식 뉴스</h2>
      <div className="flex flex-col rounded-[1.6rem] bg-white p-[4.8rem]">
        <p className="body_1 pb-[1.6rem]">관심종목</p>
        <ul className="flex touch-none gap-[2rem] overflow-x-scroll scrollbar-hide" ref={ref} {...draggableOptions()}>
          {interestNews.map((item: any) => (
            <Card key={item._id} variant="iconCard" date={item.date} title={item.title} />
          ))}
        </ul>
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

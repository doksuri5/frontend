"use client";

import { Card } from "@/components/common";
import useDraggable from "@/hooks/use-draggable";
import { useRef } from "react";

const news = [
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

const News = () => {
  const ref = useRef(null);
  const draggableOptions = useDraggable(ref);
  return (
    <section>
      <h2 className="heading_4 pb-[1.6rem] font-bold">스팩님을 위한 주식 뉴스</h2>
      <div className="flex flex-col rounded-lg bg-white p-[4rem]">
        <p className="pb-[1.6rem]">관심종목</p>
        <ul className="scrollbar-hide flex gap-[1rem] overflow-x-scroll" ref={ref} {...draggableOptions()}>
          {news.map((item) => (
            <Card key={item.id} variant="iconCard" date={item.date} title={item.title} />
          ))}
        </ul>
        <p>주요 뉴스</p>
      </div>
    </section>
  );
};

export default News;

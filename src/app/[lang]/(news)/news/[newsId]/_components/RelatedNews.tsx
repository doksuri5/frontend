"use client";

import { FindNews, FindNewsSkeleton } from "@/components/common";
import { TIFindNewsProps } from "@/components/common/List/FindNews";
import { Fragment, useEffect, useState } from "react";

export default function RelatedNews({ relatedNews }: any) {
  const [newsData, setNewsData] = useState<TIFindNewsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setNewsData(relatedNews);
    setLoading(false);
  }, [relatedNews]);

  return (
    <section className="min-h-[31rem] min-w-[38.4rem] rounded-[1.6rem] bg-white p-[3.2rem]">
      <h2 className="body_3 pb-[1rem] font-bold text-navy-900">관련 기사</h2>
      {loading &&
        Array(4)
          .fill(0)
          .map((_, index) => (
            <Fragment key={index}>
              <FindNewsSkeleton /> {index < 3 && <hr className="mb-[1.6rem] mt-[1.8rem]" />}
            </Fragment>
          ))}
      {!loading &&
        newsData.map((news, idx) => (
          <Fragment key={idx}>
            <FindNews
              _id={news._id || "3244"}
              image={news?.image}
              title={news.title}
              publishedTime={news.publishedTime}
              newspaperCompany={news.newspaperCompany}
              style={news?.style}
            />
            {idx < newsData.length - 1 && <hr className="mb-[1.6rem] mt-[1.8rem]" />}
          </Fragment>
        ))}
    </section>
  );
}

import { FindNews } from "@/components/common";
import { TIFindNewsProps } from "@/components/common/List/FindNews";
import { Fragment } from "react";

type TRelatedNewsProps = {
  newsData: TIFindNewsProps[];
};

export default function RelatedNews({ newsData }: TRelatedNewsProps) {
  return (
    <section className="min-h-[31rem] min-w-[38.4rem] rounded-[1.6rem] bg-white p-[3.2rem]">
      <h2 className="body_3 pb-[1rem] font-bold text-navy-900">관련 기사</h2>
      {newsData.map((news, idx) => (
        <Fragment key={idx}>
          <FindNews
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

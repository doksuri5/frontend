import { Button } from "@/components/common";
import NewsImage from "@/public/icons/news.jpg";
import TranslateIcon from "@/public/icons/translate_icon.svg?component";
import AI_Summary from "@/public/icons/AI_Summary.svg?component";
import Image, { StaticImageData } from "next/image";
import React from "react";
import DescriptionWithLineBreaks from "@/components/common/DescriptionWithLineBreaks";

type TNewsDetailProps = {
  newsData: {
    image: StaticImageData;
    title: string;
    description: string;
    publishedTime: string;
    newspaperCompany: string;
    view: string;
    aiSummary: string;
  };
};

export default function NewsDetail({ newsData }: TNewsDetailProps) {
  const { image, title, description, publishedTime, newspaperCompany, view, aiSummary } = newsData;

  return (
    <div className="flex min-w-[79.2rem] flex-col gap-[3.2rem] rounded-[1.6rem] bg-white p-[3.2rem]">
      <div>
        <h1 className="heading_4 font-bold text-grayscale-900">{title}</h1>
        <div className="flex justify-between pt-[1.6rem]">
          <div className="body_5 flex gap-[0.6rem] font-medium text-grayscale-600">
            <span>{newspaperCompany}</span>
            <span>∙</span>
            <span>{publishedTime}</span>
            <span>∙</span>
            <span>{view}</span>
          </div>
          <Button variant="textButton" size="md" bgColor="bg-navy-900" className="h-[3.6rem] max-w-[17.6rem]">
            <TranslateIcon />
            번역하기
          </Button>
        </div>
      </div>
      <section>
        <div className="flex gap-[1.2rem]">
          <AI_Summary />
          <span className="body_4 font-semibold">아잇나우 AI요약</span>
        </div>
        <div className="body_4 pt-[2.4rem] font-normal leading-[2.6rem]">{aiSummary}</div>
      </section>
      <article>
        <div className="relative mb-[2.4rem] h-[38rem] w-full overflow-hidden rounded-2xl">
          <Image alt="news-image" src={image} fill />
        </div>
        <DescriptionWithLineBreaks description={description} />
      </article>
    </div>
  );
}

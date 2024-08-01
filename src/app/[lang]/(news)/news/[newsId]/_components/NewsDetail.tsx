import Image from "next/image";
import React from "react";
import DescriptionWithLineBreaks from "@/components/common/DescriptionWithLineBreaks";
import { NewsDetailType } from "@/types";
import AiSummary from "./AiSummary";

type TNewsDetailProps = {
  newsData: NewsDetailType;
};

export default function NewsDetail({ newsData }: TNewsDetailProps) {
  const { image, title, description, publishedTime, publisher } = newsData;

  const replaceDescription = description
    .replace("<저작권자(c) 연합뉴스, 무단 전재-재배포, AI 학습 및 활용 금지>", "")
    .replace("(끝)", "");
  return (
    <div className="flex min-w-[79.2rem] flex-col gap-[3.2rem] rounded-[1.6rem] bg-white p-[3.2rem]">
      <div>
        <h1 className="heading_4 font-bold text-grayscale-900">{title}</h1>
        <div className="flex justify-between pt-[1.6rem]">
          <div className="body_5 flex gap-[0.6rem] font-medium text-grayscale-600">
            <span>{publisher}</span>
            <span>∙</span>
            <span>{publishedTime}</span>
          </div>
        </div>
      </div>
      <AiSummary content={replaceDescription} />
      <article>
        <div className="relative mb-[2.4rem] h-[38rem] w-full overflow-hidden rounded-2xl">
          <Image alt="news-image" src={image} fill />
        </div>
        <DescriptionWithLineBreaks description={replaceDescription} />
      </article>
    </div>
  );
}

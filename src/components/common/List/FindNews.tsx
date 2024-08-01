import Link from "next/link";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { NEWS_PATH } from "@/routes/path";
import { cn } from "@/utils/cn";
import { getTimeDifference } from "@/utils/getTimeDifference";

export type TIFindNewsProps = {
  _id: string;
  image?: StaticImageData | string;
  title: string;
  publishedTime: string;
  newspaperCompany: string;
  style?: string;
  lang: string;
};

function FindNews({ _id, image, title, publishedTime, newspaperCompany, style, lang }: TIFindNewsProps) {
  return (
    <Link href={`${NEWS_PATH}/${_id}`} className="w-full">
      <div className={cn(`flex h-[6.4rem] w-full gap-[2rem] ${style} group`)}>
        {image && (
          <div className="relative h-[6.4rem] w-[12rem] flex-shrink-0 overflow-hidden rounded-2xl">
            <Image
              src={image}
              fill
              alt="news-image"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="flex w-full flex-1 flex-col justify-between py-[0.4rem]">
          <h3 className="body_4 line-clamp-1 font-medium text-grayscale-900 group-hover:underline">{title}</h3>
          <div className="body_6 flex gap-[0.8rem] font-normal text-grayscale-600">
            <span>{getTimeDifference(publishedTime, lang)}</span>
            <span>∙</span>
            <span>{newspaperCompany}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default React.memo(FindNews);

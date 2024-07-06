import { NEWS_PATH } from "@/routes/path";
import { cn } from "@/utils/cn";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export type TIFindNewsProps = {
  _id: string;
  image?: StaticImageData;
  title: string;
  publishedTime: string;
  newspaperCompany: string;
  style?: string;
};

export default function FindNews({ _id, image, title, publishedTime, newspaperCompany, style }: TIFindNewsProps) {
  return (
    <Link href={`${NEWS_PATH}/${_id}`}>
      <div className={cn(`flex h-[6.4rem] w-full gap-[2rem] ${style}`)}>
        {image && (
          <div className="relative h-[6.4rem] w-[12rem] flex-shrink-0 overflow-hidden rounded-2xl">
            <Image src={image} fill alt="news-image" />
          </div>
        )}
        <div className="flex w-full flex-1 flex-col justify-between py-[0.4rem]">
          <h3 className="body_4 line-clamp-1 font-medium text-grayscale-900">{title}</h3>
          <div className="body_6 flex gap-[0.8rem] font-normal text-grayscale-600">
            <span>{publishedTime}시간전</span>
            <span>∙</span>
            <span>{newspaperCompany}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

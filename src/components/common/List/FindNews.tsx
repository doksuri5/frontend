import Image, { StaticImageData } from "next/image";

export type TIFindNewsProps = {
  image: StaticImageData;
  title: string;
  publishedTime: string;
  newspaperCompany: string;
  style?: string;
};

export default function FindNews({ image, title, publishedTime, newspaperCompany, style }: TIFindNewsProps) {
  return (
    <div className={`flex h-[6.4rem] w-full gap-[2rem] ${style}`}>
      <div className="relative h-[64px] w-[120px] flex-shrink-0 overflow-hidden rounded-2xl">
        <Image src={image} fill alt="news-image" />
      </div>
      <div className="flex w-full flex-1 flex-col justify-between py-[0.4rem]">
        <h3 className="body_4 line-clapm-1 font-medium text-grayscale-900">{title}</h3>
        <div className="body_6 flex gap-[0.8rem] font-normal text-grayscale-600">
          <span>{publishedTime}시간전</span>
          <span>∙</span>
          <span>{newspaperCompany}</span>
        </div>
      </div>
    </div>
  );
}

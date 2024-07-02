import { cn } from "@/utils/cn";
import Image, { StaticImageData } from "next/image";

export type TINewsItemProps = {
  id: number;
  image: StaticImageData;
  title: string;
  description: string;
  publishedTime: string;
  newspaperCompany: string;
  variant?: "lineClamp-2" | "lineClamp-4";
  style?: string;
};

const variantStyles = {
  "lineClamp-2": {
    height: "h-[10rem]",
    lineClamp: "line-clamp-2",
    imageSize: "h-[100px] w-[172px]",
  },
  "lineClamp-4": {
    height: "h-[14.8rem]",
    lineClamp: "line-clamp-4",
    imageSize: "h-[148px] w-[252px]",
  },
};

export default function NewsItem({
  image,
  title,
  description,
  publishedTime,
  newspaperCompany,
  variant = "lineClamp-2",
  style,
}: TINewsItemProps) {
  const selectedVariantStyles = variantStyles[variant];

  return (
    <div className={cn(`flex w-full gap-[2rem] ${selectedVariantStyles.height} ${style}`)}>
      <div
        className={cn(
          `relative h-[10rem] w-[17.2rem] flex-shrink-0 overflow-hidden rounded-2xl ${selectedVariantStyles.imageSize}`,
        )}
      >
        <Image src={image} fill alt="news-image" />
      </div>
      <div className="flex w-full flex-1 flex-col gap-[1.6rem]">
        <div className="flex items-center justify-between">
          <h3 className="body_3 font-bold text-grayscale-900">{title}</h3>
          <div className="body_5 flex gap-[0.8rem] font-medium text-grayscale-600">
            <span>{publishedTime}시간전</span>
            <span>∙</span>
            <span>{newspaperCompany}</span>
          </div>
        </div>
        <p className={cn(`body_4 font-normal ${selectedVariantStyles.lineClamp}`)}>{description}</p>
      </div>
    </div>
  );
}

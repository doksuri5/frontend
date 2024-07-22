import { NEWS_PATH } from "@/routes/path";
import { NewsItemType } from "@/types";
import { cn } from "@/utils/cn";
import { getTimeDifference } from "@/utils/getTimeDifference";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export type TNewsItemProps = NewsItemType & {
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
  _id,
  image,
  title,
  description,
  publishedTime,
  publisher,
  variant = "lineClamp-2",
  style,
}: TNewsItemProps) {
  const selectedVariantStyles = variantStyles[variant];

  return (
    <Link href={`${NEWS_PATH}/${_id}`}>
      <div className={cn(`flex w-full gap-[2rem] ${selectedVariantStyles.height} ${style}`)}>
        <div
          className={cn(
            `relative h-[10rem] w-[17.2rem] flex-shrink-0 overflow-hidden rounded-2xl ${selectedVariantStyles.imageSize}`,
          )}
        >
          <Image src={image} fill style={{ objectFit: "cover" }} alt="news-image" />
        </div>
        <div className="flex w-full flex-1 flex-col gap-[1.6rem]">
          <div className="flex items-center justify-between">
            <h3 className="body_3 font-bold text-grayscale-900">{title}</h3>
            <div className="body_5 flex gap-[0.8rem] font-medium text-grayscale-600">
              <span>{getTimeDifference(publishedTime)}</span>
              <span>∙</span>
              <span>{publisher}</span>
            </div>
          </div>
          <p className={cn(`body_4 font-normal ${selectedVariantStyles.lineClamp}`)}>{description}</p>
        </div>
      </div>
    </Link>
  );
}

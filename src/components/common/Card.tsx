/**
 * variant: "iconCard" | "halfMediaCard" | "fullMediaCard", default는 "iconCard"
 * date: 뉴스 날짜
 * title: 뉴스 헤드라인
 * stockCode: 종목 이니셜. iconCard에서만 사용되는 props. ex) 애플-> "AAPL"
 * image: 뉴스 이미지
 * content: 뉴스 기사
 * publisher: 발행처
 * size: 카드 사이즈. fullImgCard에서만 사용되는 props. "large" | "small" 선택 가능, default는 "large"
 * style: 상위 div컨테이너에 커스텀 스타일 지정
 */

import Image from "next/image";
import LargeRect from "@/public/icons/card3Rectangle_large.svg";
import SmallRect from "@/public/icons/card3Rectangle_small.svg";
import Rectangle from "@/public/icons/card2Rectangle.svg";
import { cn } from "@/utils/cn";

type TCardProps = {
  variant: "iconCard" | "halfMediaCard" | "fullMediaCard";
  date?: string;
  title?: string;
  stockCode?: string;
  image?: string;
  content?: string;
  publisher?: string;
  size?: "large" | "small";
  style?: string;
};

export default function Card({
  variant = "iconCard",
  date,
  title,
  stockCode,
  image,
  content,
  publisher,
  size = "large",
  style,
}: TCardProps) {
  switch (variant) {
    case "iconCard":
      return (
        <div
          className={cn(
            `flex h-[10rem] w-[35.5rem] flex-row items-center justify-between gap-[.8rem] rounded-[2.4rem] border border-grayscale-200 bg-grayscale-0 px-[1.6rem] py-[2.4rem] ${style}`,
          )}
        >
          <div className="body_5 flex h-[5.2rem] w-[24.3rem] flex-col justify-between gap-[.4rem] text-gray-400">
            <div>{date}</div>
            <div className="body_2 line-clamp-1 text-ellipsis font-bold text-gray-900">{title}</div>
          </div>
          {stockCode ? (
            <Image
              src={`https://ssl.pstatic.net/imgstock/fn/real/logo/stock/Stock${stockCode}.O.svg`}
              alt="logo"
              width={48}
              height={48}
            />
          ) : (
            <div className="h-[4.8rem] w-[4.8rem] rounded-[50%] bg-grayscale-200"></div>
          )}
        </div>
      );
    case "halfMediaCard":
      return (
        <div className={cn(`flex min-h-[36rem] min-w-[38.8rem] flex-col overflow-hidden rounded-[1.6rem] ${style}`)}>
          <div className="relative min-h-[23.6rem] w-[100%]">
            <Image src={image || Rectangle} alt="news-image" />
          </div>
          <div className="flex w-full flex-col gap-[.8rem] rounded-b-[1.6rem] bg-grayscale-0 px-[2.4rem] py-[1.6rem] font-medium">
            <div className="body_3 line-clamp-2 h-[5.6rem] cursor-pointer text-ellipsis text-grayscale-900">
              {title}
            </div>
            <div className="body_5 flex flex-row justify-between text-grayscale-600">
              <div className="flex flex-row gap-[.8rem]">
                <div>{date}</div>
                <div>·</div>
                <div>{publisher}</div>
              </div>
              <div className="cursor-pointer font-normal">더보기→</div>
            </div>
          </div>
        </div>
      );
    case "fullMediaCard":
      return (
        <div
          className={cn(
            `container relative flex ${size === "large" ? "min-h-[42rem]" : "min-h-[20rem]"} min-w-[59rem] flex-col overflow-hidden rounded-[1.6rem] ${style}`,
          )}
        >
          <div className="relative h-[100%] w-[100%]">
            <Image
              fill
              src={image || (size === "large" ? LargeRect : SmallRect)}
              alt="news-image"
              sizes={`${size === "large" ? "minHeight: 26.25rem" : "minHeight: 12.5rem"} minWidth: 36.875rem`}
            />
          </div>
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-[2.4rem]">
            <div className="body_1 mb-[1.4rem] font-bold text-grayscale-0">{title}</div>
            <div className="body_5 font-medium">
              {size === "large" && (
                <div className="mb-[1.4rem] line-clamp-2 h-[4rem] text-ellipsis font-medium text-grayscale-200">
                  {content}
                </div>
              )}
              <div className="flex flex-row gap-[.8rem] font-medium text-grayscale-300">
                <div>{date}</div>
                <div>·</div>
                <div>{publisher}</div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

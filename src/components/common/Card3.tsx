import LargeRect from "@/app/svg/card3Rectangle_large.svg";
import SmallRect from "@/app/svg/card3Rectangle_small.svg";
import Image from "next/image";

type TCard3Props = {
  image?: string;
  title?: string;
  description?: string;
  date?: string;
  publisher?: string;
  size?: "large" | "small";
};

export default function Card3({ image, title, description, date, publisher, size = "large" }: TCard3Props) {
  return (
    <div
      className={`container relative flex ${size === "large" ? "h-[420px]" : "h-[200px]"} w-[590px] flex-col overflow-hidden rounded-[16px]`}
    >
      <div className="relative h-[100%] w-[100%]">
        <Image
          layout="fill"
          src={image && image !== "" ? image : size === "large" ? LargeRect : SmallRect}
          alt="news-image"
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-[24px]">
        <div className="body_1 mb-[14px] font-bold text-grayscale-0">{title}</div>
        <div className="body_5 font-medium">
          {size === "large" && <div className="mb-[14px] font-medium text-grayscale-200">{description}</div>}
          <div className="flex flex-row gap-[8px] font-medium text-grayscale-300">
            <div>{date}</div>
            <div>·</div>
            <div>{publisher}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

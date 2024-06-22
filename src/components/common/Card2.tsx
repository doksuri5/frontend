import Image from "next/image";
import Rectangle from "@/app/svg/card2Rectangle.svg";

type TCard2Props = {
  image?: string;
  title?: string;
  date?: string;
  publisher?: string; //발행처
};

export default function Card2({ image, title, date, publisher }: TCard2Props) {
  return (
    <div className="flex h-[360px] w-[388px] flex-col overflow-hidden rounded-t-2xl">
      <div className="h-[236px]">
        <Image
          src={image && image !== "" ? image : Rectangle}
          alt="news-image"
          width={388}
          height={236}
          className="w-fill h-fill object-cover"
        />
      </div>
      <div className="flex flex-col gap-[8px] bg-grayscale-0 px-[24px] py-[16px] font-medium">
        <div className="body_3 cursor-pointer text-grayscale-900">{title}</div>
        <div className="body_5 flex flex-row justify-between text-grayscale-600">
          <div className="flex flex-row gap-[8px]">
            <div>{date}</div>
            <div>·</div>
            <div>{publisher}</div>
          </div>
          <div className="cursor-pointer font-normal">더보기→</div>
        </div>
      </div>
    </div>
  );
}

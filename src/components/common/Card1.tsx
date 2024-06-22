import Image from "next/image";

type TCardProps = {
  date?: string;
  title?: string;
  stockCode?: string;
};

export default function Card1({ date, title, stockCode }: TCardProps) {
  return (
    <div className="flex h-[100px] w-[355px] items-center rounded-3xl border border-grayscale-200 bg-grayscale-0 px-[16px] py-[24px]">
      <div className="h-13 flex w-[323px] flex-row justify-between gap-8">
        <div className="body_5 flex h-[52px] w-[243px] flex-col justify-between gap-1 text-gray-400">
          <div>{date}</div>
          <div className="body_2 truncate font-bold text-gray-900">{title}</div>
        </div>
        {stockCode ? (
          <Image
            src={`https://ssl.pstatic.net/imgstock/fn/real/logo/stock/Stock${stockCode}.O.svg`}
            alt="logo"
            width={48}
            height={48}
          />
        ) : (
          <div className="h-[48px] w-[48px] rounded-[50%] bg-grayscale-200"></div>
        )}
      </div>
    </div>
  );
}

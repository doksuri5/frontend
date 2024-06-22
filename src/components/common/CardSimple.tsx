import Image from "next/image";

type TCardSimpleProps = {
  date: string;
  title: string;
  stockCode: string;
};

export default function CardSimple({ date, title, stockCode }: TCardSimpleProps) {
  return (
    <div className="flex h-[100px] w-[355px] items-center rounded-3xl border border-grayscale-200 bg-grayscale-0 px-[16px] py-[24px]">
      <div className="h-13 flex w-[323px] flex-row justify-between gap-8">
        <div className="body_5 flex h-[52px] w-[243px] flex-col justify-between gap-1 text-gray-400">
          <div>{date}</div>
          <div className="body_2 truncate font-bold text-gray-900">{title}</div>
        </div>
        <Image
          src={`https://ssl.pstatic.net/imgstock/fn/real/logo/stock/Stock${stockCode}.O.svg`}
          alt="logo"
          width={48}
          height={48}
        />
      </div>
    </div>
  );
}

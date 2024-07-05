import { cn } from "@/utils/cn";
import Image from "next/image";

type TAIAnalystReport = {
  data: {
    icon: string;
    stockName: string;
    stockCode: string;
    priceUSD: number;
    aiReport: string;
    fluctuationsRatio: number;
    compareToPreviousClosePrice: number;
  };
};

export default function AIAnalystReport({ data }: TAIAnalystReport) {
  const { icon, stockName, stockCode, priceUSD, aiReport, fluctuationsRatio, compareToPreviousClosePrice } = data;
  const fluctuationColor = fluctuationsRatio < 0 ? "text-blue-600" : "text-warning-100";
  const fluctuationArrow = fluctuationsRatio < 0 ? "▼" : "▲";

  return (
    <section className="min-h-[29.5rem] min-w-[75rem] rounded-[1.6rem] bg-white p-[3.2rem]">
      <h2 className="body_1 pb-[5.5rem] font-bold text-navy-900">아잇나우 AI 애널리스트 리포트</h2>
      <div className="mb-[1.6rem] flex items-center gap-[0.8rem]">
        <Image src={icon} alt="icon" width={30} height={30} />
        <h3 className="body_3 font-bold">{stockName}</h3>
        <h3 className="body_5 font-normal text-grayscale-600">{stockCode}</h3>
        <div className="body_5 text-right font-medium">
          <span>${priceUSD}</span>
        </div>
        <div className={cn("body_4 flex gap-[0.8rem] font-normal", fluctuationColor)}>
          <span>{fluctuationArrow + compareToPreviousClosePrice}</span>
          <span>{priceUSD}%</span>
        </div>
      </div>
      <p className="body_4 font-medium">{aiReport}</p>
      <div className="flex items-center gap-[0.8rem]"></div>
    </section>
  );
}

import { SimpleRadarChart } from "@/components/common";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useCallback } from "react";

type StockAIReport = {
  data: {
    fluctuationRatio: number;
    score: number;
  };
};

export default function StockAIReport({ data }: StockAIReport) {
  const { fluctuationRatio, score } = data;

  const fluctuationColor = fluctuationRatio < 0 ? "text-blue-600" : "text-warning-100";
  const fluctuationArrow = fluctuationRatio < 0 ? "▼" : "▲";

  const changeArrow = useCallback((ratio: number) => {
    return ratio < 0 ? "▼" : "▲";
  }, []);

  return (
    <section className="min-h-[29.5rem] min-w-[43rem]">
      <div className="h-[29.5rem] flex-1 rounded-[1.6rem] bg-white p-[3.2rem]">
        <div className="flex justify-between gap-[0.8rem]">
          <h2 className="body_1 font-bold text-navy-900">종목 AI 리포트</h2>
          <h2 className="heading_3 font-medium text-grayscale-700">{score}점</h2>
        </div>
        <div className="flex h-full w-full items-center gap-[0.8rem]">
          <div className="h-full w-[80%] min-w-[13rem] p-[1.6rem]">
            <SimpleRadarChart />
          </div>
          <ul className="body_6 flex h-auto min-w-[14rem] flex-col gap-[0.4rem] rounded-[2.4rem] bg-[#F9F9F9] p-[1.6rem]">
            <li className="flex justify-between">
              주가
              <div className={cn("flex gap-[0.8rem] font-normal", fluctuationColor)}>
                <span>{fluctuationArrow + fluctuationRatio}%</span>
              </div>
            </li>
            <li className="flex justify-between">
              투자지수
              <div className={cn("flex gap-[0.8rem] font-normal", fluctuationColor)}>
                <span>{fluctuationArrow + fluctuationRatio}%</span>
              </div>
            </li>
            <li className="flex justify-between">
              수익성
              <div className={cn("flex gap-[0.8rem] font-normal", fluctuationColor)}>
                <span>{fluctuationArrow + fluctuationRatio}%</span>
              </div>
            </li>
            <li className="flex justify-between">
              성장성
              <div className={cn("flex gap-[0.8rem] font-normal", fluctuationColor)}>
                <span>{fluctuationArrow + fluctuationRatio}%</span>
              </div>
            </li>
            <li className="flex justify-between">
              관심도
              <div className={cn("flex gap-[0.8rem] font-normal", fluctuationColor)}>
                <span>{fluctuationArrow + fluctuationRatio}%</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

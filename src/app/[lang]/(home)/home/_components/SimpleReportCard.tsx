import SimpleRadarChart from "@/components/common/SimpleRadarChart";
import { cn } from "@/utils/cn";
import { formatValueWithIndicator, formatValueWithSign, getTextColor } from "@/utils/stockPriceUtils";
import Image from "next/image";
import { useCallback, useMemo } from "react";

type TReport = {
  companyName: string;
  stockCode: string;
  currentPrice: number;
  fluctuationPrice: number;
  fluctuationRatio: number;
};

// create dummy data for the report

// 주가, 투자지수, 수익성, 성장성, 관심도 영어로 변경해서 더미데이터 생성
// 주가: stockPrice, 투자지수: investmentIndex, 수익성: profitability, 성장성: growth, 관심도: interest
// %로 표시 fluctuationRatio 와 같은 형태로 더미데이터 생성

const DUMMY_REPORTS = {
  stockPrice: 2.5,
  investmentIndex: 1.72,
  profitability: -0.48,
  growth: 0.79,
  interest: -1.32,
};

const SimpleReportCard = ({ report }: { report: TReport }) => {
  const { companyName, stockCode, currentPrice, fluctuationPrice, fluctuationRatio } = report;

  const fluctuationColor = getTextColor(fluctuationRatio);

  return (
    <section className="h-[28rem] flex-1 rounded-[1.6rem] bg-white p-[3.2rem]">
      <div className="flex items-center gap-[0.8rem]">
        <Image src="/icons/Apple_icon.svg" alt="icon" width={30} height={30} />
        <h3 className="body_3 font-bold">{companyName}</h3>
        <h3 className="body_5 font-normal text-grayscale-600">{stockCode}</h3>
      </div>
      <div className="flex items-center gap-[0.8rem]">
        <div className="body_5 text-right font-medium">
          <span>${currentPrice}</span>
        </div>
        <div className={cn("body_4 flex gap-[0.8rem] font-normal", fluctuationColor)}>
          <span>{formatValueWithIndicator(fluctuationPrice)}</span>
          <span>{formatValueWithSign(fluctuationRatio)}%</span>
        </div>
      </div>
      <div className="flex h-full w-full items-center gap-[0.8rem]">
        <div className="h-full w-[80%] min-w-[13rem] p-[1.6rem]">
          <SimpleRadarChart />
        </div>
        <ul className="body_6 flex h-auto min-w-[14rem] flex-col gap-[0.4rem] rounded-[2.4rem] bg-[#F9F9F9] p-[1.6rem]">
          <li className="flex justify-between">
            주가
            <div className={cn("flex gap-[0.8rem] font-normal", fluctuationColor)}>
              <span>{formatValueWithIndicator(fluctuationRatio)}%</span>
            </div>
          </li>
          <li className="flex justify-between">
            투자지수
            <div className={cn("flex gap-[0.8rem] font-normal", fluctuationColor)}>
              <span>{formatValueWithIndicator(fluctuationRatio)}%</span>
            </div>
          </li>
          <li className="flex justify-between">
            수익성
            <div className={cn("flex gap-[0.8rem] font-normal", fluctuationColor)}>
              <span>{formatValueWithIndicator(fluctuationRatio)}%</span>
            </div>
          </li>
          <li className="flex justify-between">
            성장성
            <div className={cn("flex gap-[0.8rem] font-normal", fluctuationColor)}>
              <span>{formatValueWithIndicator(fluctuationRatio)}%</span>
            </div>
          </li>
          <li className="flex justify-between">
            관심도
            <div className={cn("flex gap-[0.8rem] font-normal", fluctuationColor)}>
              <span>{formatValueWithIndicator(fluctuationRatio)}%</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SimpleReportCard;

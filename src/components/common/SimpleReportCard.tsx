"use client";

import { getStockAnalysis } from "@/actions/stock-analysis";
import SimpleRadarChart from "@/components/common/SimpleRadarChart";
import { TReutersCodes } from "@/constants/stockCodes";
import { StockAIReportDataType } from "@/types/StockDataType";
import { cn } from "@/utils/cn";
import { formatOnlyIndicator, formatValueWithIndicator, getTextColor } from "@/utils/stockPriceUtils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "./Skeleton";
import CountUp from "react-countup";
// 주가, 투자지수, 수익성, 성장성, 관심도 영어로 변경해서 더미데이터 생성
// 주가: stockPrice, 투자지수: investmentIndex, 수익성: profitability, 성장성: growth, 관심도: interest
// %로 표시 fluctuationRatio 와 같은 형태로 더미데이터 생성

const SimpleReportCard = ({
  reutersCode,
  isShowHeader = true,
}: {
  reutersCode?: TReutersCodes;
  isShowHeader?: boolean;
}) => {
  const [stockAnalysis, setStockAnalysis] = useState<StockAIReportDataType>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const data = await getStockAnalysis(undefined, { params: reutersCode });
      setStockAnalysis(data.data[0]);
    };

    fetchData();
    setIsLoading(false);
  }, [reutersCode]);

  if (!stockAnalysis || isLoading) {
    return <Skeleton className="h-[20rem] w-full" />;
  }

  const fluctuationColor = stockAnalysis.metrics.fluctuationsRatio < 0 ? "text-blue-600" : "text-warning-100";
  const fluctuationArrow = stockAnalysis.metrics.fluctuationsRatio < 0 ? "▼" : "▲";

  return (
    <section className="h-[28rem] flex-1 rounded-[1.6rem] bg-white p-[3.2rem]">
      {isShowHeader && (
        <>
          <div className="flex items-center gap-[0.8rem]">
            <Image src="/icons/Apple_icon.svg" alt="icon" width={30} height={30} />
            <h3 className="body_3 font-bold">{stockAnalysis.metrics.stockName}</h3>
            <h3 className="body_5 font-normal text-grayscale-600">{stockAnalysis.metrics.symbolCode}</h3>
          </div>
          <div className="flex items-center gap-[0.8rem]">
            <div className="body_5 text-right font-medium">
              <span>${stockAnalysis.metrics.closePrice}</span>
            </div>
            <div className={cn("body_4 flex gap-[0.8rem] font-normal", fluctuationColor)}>
              <span>{fluctuationArrow + stockAnalysis.metrics.closePriceChange}</span>
              <span>{stockAnalysis.metrics.fluctuationsRatio}%</span>
            </div>
          </div>
        </>
      )}
      <div className="flex h-full w-full items-center gap-[0.8rem]">
        <div className="h-full w-full min-w-[13rem] p-[1.6rem]">
          <SimpleRadarChart />
        </div>
        <ul className="body_6 flex h-auto min-w-[14rem] flex-col gap-[0.4rem] rounded-[2.4rem] bg-[#F9F9F9] p-[1.6rem]">
          <li className="flex justify-between">
            주가
            <div className={cn("flex gap-[0.8rem] font-normal", getTextColor(stockAnalysis.metrics.fluctuationsRatio))}>
              <span>
                {formatOnlyIndicator(stockAnalysis.metrics.fluctuationsRatio)}
                <CountUp end={Math.abs(stockAnalysis.metrics.fluctuationsRatio)} decimals={2} />%
              </span>
            </div>
          </li>
          <li className="flex justify-between">
            투자지수
            <div className={cn("flex gap-[0.8rem] font-normal", getTextColor(stockAnalysis.investmentIndex))}>
              <span>
                {formatOnlyIndicator(stockAnalysis.investmentIndex)}
                <CountUp end={Math.abs(stockAnalysis.investmentIndex)} />%
              </span>
            </div>
          </li>
          <li className="flex justify-between">
            수익성
            <div className={cn("flex gap-[0.8rem] font-normal", getTextColor(stockAnalysis.profitabilityPercentage))}>
              <span>
                {formatOnlyIndicator(stockAnalysis.profitabilityPercentage)}
                <CountUp end={Math.abs(stockAnalysis.profitabilityPercentage)} />%
              </span>
            </div>
          </li>
          <li className="flex justify-between">
            성장성
            <div className={cn("flex gap-[0.8rem] font-normal", getTextColor(stockAnalysis.growthPercentage))}>
              <span>
                {formatOnlyIndicator(stockAnalysis.growthPercentage)}
                <CountUp end={Math.abs(stockAnalysis.growthPercentage)} />%
              </span>
            </div>
          </li>
          <li className="flex justify-between">
            관심도
            <div className={cn("flex gap-[0.8rem] font-normal", getTextColor(stockAnalysis.interestPercentage))}>
              <span>
                {formatOnlyIndicator(stockAnalysis.interestPercentage)}
                <CountUp end={Math.abs(stockAnalysis.interestPercentage)} />%
              </span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SimpleReportCard;

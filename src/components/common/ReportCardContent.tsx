import { formatOnlyIndicator, getTextColor } from "@/utils/stockPriceUtils";
import SimpleRadarChart from "./SimpleRadarChart";
import { cn } from "@/utils/cn";
import CountUp from "react-countup";
import { TReutersCodes } from "@/constants/stockCodes";
import { useEffect, useState } from "react";
import { getStockAnalysis } from "@/actions/stock-analysis";
import { Skeleton } from "./Skeleton";
import { StockAIReportDataType } from "@/types/StockDataType";

const ReportCardContent = ({ reutersCode }: { reutersCode: TReutersCodes }) => {
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

  return (
    <div className="flex h-full w-full items-center gap-[0.8rem]">
      <div className="h-full w-full min-w-[13rem] p-[1.6rem]">
        <SimpleRadarChart data={stockAnalysis} />
      </div>
      <ul className="body_6 flex h-auto min-w-[14rem] flex-col gap-[0.4rem] rounded-[2.4rem] bg-[#F9F9F9] p-[1.6rem]">
        <li className="flex justify-between">
          1. 주가
          <div className={cn("flex gap-[0.8rem] font-normal", getTextColor(stockAnalysis.metrics.fluctuationsRatio))}>
            <span>
              {formatOnlyIndicator(stockAnalysis.metrics.fluctuationsRatio)}
              <CountUp end={Math.abs(stockAnalysis.metrics.fluctuationsRatio)} decimals={1} />%
            </span>
          </div>
        </li>
        <li className="flex justify-between">
          2. 투자지수
          <div className={cn("flex gap-[0.8rem] font-normal", getTextColor(stockAnalysis.investmentIndex))}>
            <span>
              {formatOnlyIndicator(stockAnalysis.investmentIndex)}
              <CountUp end={Math.abs(stockAnalysis.investmentIndex)} />%
            </span>
          </div>
        </li>
        <li className="flex justify-between">
          3. 수익성
          <div className={cn("flex gap-[0.8rem] font-normal", getTextColor(stockAnalysis.profitabilityPercentage))}>
            <span>
              {formatOnlyIndicator(stockAnalysis.profitabilityPercentage)}
              <CountUp end={Math.abs(stockAnalysis.profitabilityPercentage)} />%
            </span>
          </div>
        </li>
        <li className="flex justify-between">
          4. 성장성
          <div className={cn("flex gap-[0.8rem] font-normal", getTextColor(stockAnalysis.growthPercentage))}>
            <span>
              {formatOnlyIndicator(stockAnalysis.growthPercentage)}
              <CountUp end={Math.abs(stockAnalysis.growthPercentage)} />%
            </span>
          </div>
        </li>
        <li className="flex justify-between">
          5. 관심도
          <div className={cn("flex gap-[0.8rem] font-normal", getTextColor(stockAnalysis.interestPercentage))}>
            <span>
              {formatOnlyIndicator(stockAnalysis.interestPercentage)}
              <CountUp end={Math.abs(stockAnalysis.interestPercentage)} />%
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ReportCardContent;

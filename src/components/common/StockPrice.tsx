"use client";

import { TReutersCodes } from "@/constants/stockCodes";
import useStockPrice from "@/hooks/use-stock-price";
import { cn } from "@/utils/cn";
import { formatOnlyIndicator, getTextColor } from "@/utils/stockPriceUtils";
import { Skeleton } from "./Skeleton";
import ClientCountUp from "./CountUp";

const StockPrice = ({ reutersCode }: { reutersCode: TReutersCodes }) => {
  const { stock, loading } = useStockPrice(reutersCode);

  if (!stock || stock.closePrice === 0 || loading) {
    return <Skeleton className="my-[0.4rem] h-[1.2rem] w-3/6" />;
  }

  return (
    <>
      <div className="body_4 font-medium">
        <span>
          $<ClientCountUp preserveValue end={Math.abs(stock?.closePrice)} decimals={2} />
        </span>
      </div>
      <div className={cn(`body_4 flex gap-[0.8rem] font-normal ${getTextColor(stock?.fluctuationsRatio)}`)}>
        <span>
          {formatOnlyIndicator(stock?.compareToPreviousClosePrice)}
          <ClientCountUp preserveValue end={Math.abs(stock?.compareToPreviousClosePrice)} decimals={2} />
        </span>
        <span>
          <ClientCountUp preserveValue end={Math.abs(stock?.fluctuationsRatio)} decimals={2} />%
        </span>
      </div>
    </>
  );
};

export default StockPrice;

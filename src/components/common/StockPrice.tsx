"use client";

import { TReutersCodes } from "@/constants/stockCodes";
import useStockPrice from "@/hooks/use-stock-price";
import { cn } from "@/utils/cn";
import { formatOnlyIndicator, getTextColor } from "@/utils/stockPriceUtils";
import { Skeleton } from "./Skeleton";
import ClientCountUp from "./CountUp";

const StockPrice = ({
  reutersCode,
  vertical = false,
  style,
}: {
  reutersCode: TReutersCodes;
  vertical?: boolean;
  style?: string;
}) => {
  const { stock, loading } = useStockPrice(reutersCode);

  if (!stock || stock.closePrice === 0 || loading) {
    if (vertical) {
      return (
        <div className="flex h-[5rem] w-1/4 flex-col items-end gap-2">
          <Skeleton className="my-[0.4rem] h-[3rem] w-1/2" />
          <Skeleton className="my-[0.4rem] h-[3rem] w-10/12" />
        </div>
      );
    }

    return <Skeleton className="my-[0.4rem] h-[1.2rem] w-3/6" />;
  }

  return (
    <div
      className={cn("flex gap-2", {
        "flex-col items-end": vertical,
        "flex-row": !vertical,
      })}
    >
      <div className={cn(`body_4 text-end font-medium ${style}`)}>
        <span>
          $<ClientCountUp preserveValue end={Math.abs(stock?.closePrice)} decimals={2} />
        </span>
      </div>
      <div className={cn(`body_4 flex gap-[0.8rem] font-normal ${getTextColor(stock?.fluctuationsRatio)} ${style}`)}>
        <span>
          {formatOnlyIndicator(stock?.compareToPreviousClosePrice)}
          <ClientCountUp preserveValue end={Math.abs(stock?.compareToPreviousClosePrice)} decimals={2} />
        </span>
        <span>
          <ClientCountUp preserveValue end={Math.abs(stock?.fluctuationsRatio)} decimals={2} />%
        </span>
      </div>
    </div>
  );
};

export default StockPrice;

"use client";

import { Toggle } from "@/components/common";
import { TReutersCodes } from "@/constants/stockCodes";
import useStockPrice from "@/hooks/use-stock-price";
import { cn } from "@/utils/cn";
import { formatOnlyIndicator, getTextColor } from "@/utils/stockPriceUtils";
import { useState } from "react";
import CountUp from "react-countup";
import StockDetailSkeleton from "./skeleton/StockDetailSkeleton";

const StockDetailHeader = ({ reutersCode }: { reutersCode: TReutersCodes }) => {
  const [currency, setCurrency] = useState(false);
  const { stock } = useStockPrice(reutersCode);

  if (!stock) return <StockDetailSkeleton />;

  return (
    <div className="flex_row justify-between">
      <div>
        <div className="flex_row gap-[0.4rem]">
          <span className="body_1 font-bold">
            {currency ? (
              <CountUp preserveValue end={stock.closePrice} prefix="$" decimals={2} />
            ) : (
              <CountUp preserveValue end={stock.closePrice} prefix="￦" decimals={2} />
            )}
          </span>
          <span className="body_1 font-bold">∙</span>
          <span className="body_2 font-normal">{stock.symbolCode}</span>
        </div>
        <div className={cn(`flex_row body_2 gap-[0.8rem] font-normal ${getTextColor(stock.fluctuationsRatio)}`)}>
          <span>
            {formatOnlyIndicator(stock.compareToPreviousClosePrice)}
            <CountUp preserveValue end={Math.abs(stock.compareToPreviousClosePrice)} decimals={2} />
          </span>
          <span>
            <CountUp preserveValue end={Math.abs(stock.fluctuationsRatio)} decimals={2} />%
          </span>
        </div>
      </div>
      <Toggle checked={currency} setChecked={setCurrency} />
    </div>
  );
};

export default StockDetailHeader;

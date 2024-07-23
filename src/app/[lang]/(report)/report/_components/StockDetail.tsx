"use client";

import { useEffect, useState } from "react";
import { Toggle } from "@/components/common";
import { cn } from "@/utils/cn";
import { formatOnlyIndicator, getTextColor } from "@/utils/stockPriceUtils";
import { TReutersCodes } from "@/constants/stockCodes";
import StockDetailSkeleton from "./skeleton/StockDetailSkeleton";
import { getStockAnalysis } from "@/actions/stock-analysis";
import CountUp from "react-countup";
import useStockPrice from "@/hooks/use-stock-price";

type TStockDetail = {
  reutersCode: TReutersCodes;
};

export default function StockDetail({ reutersCode }: TStockDetail) {
  const [description, setDescription] = useState<string>("");
  const [currency, setCurrency] = useState(false);
  const { stock } = useStockPrice(reutersCode);

  useEffect(() => {
    const fetchData = async () => {
      const analysis = await getStockAnalysis(undefined, { params: reutersCode });
      if (!analysis.ok) {
        return;
      }

      setDescription(analysis.data[0].description);
    };

    fetchData();
  }, [reutersCode]);

  if (!stock) return <StockDetailSkeleton />;

  return (
    <section className="min-h-[25.6rem] min-w-[48.8rem] rounded-[1.6rem] bg-white p-[3.2rem]">
      <div className="flex flex-col gap-[3.2rem]">
        <div>
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
        </div>
        <p>{description}</p>
      </div>
    </section>
  );
}

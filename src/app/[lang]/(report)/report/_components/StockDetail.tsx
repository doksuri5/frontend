"use client";

import { useEffect, useState } from "react";
import { Toggle } from "@/components/common";
import { cn } from "@/utils/cn";
import { formatValueWithIndicator, formatValueWithSign, getTextColor } from "@/utils/stockPriceUtils";
import { TReutersCodes } from "@/constants/stockCodes";
import { getStocksByReutersCode } from "@/actions/stock";
import { StockDataType } from "@/types";
import StockDetailSkeleton from "./skeleton/StockDetailSkeleton";

type TStockDetail = {
  reutersCode: TReutersCodes;
};

export default function StockDetail({ reutersCode }: TStockDetail) {
  const [stock, setStock] = useState<StockDataType>();
  const [currency, setCurrency] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStocksByReutersCode(undefined, { params: reutersCode });
      if (!data.data[0]) {
        return;
      }

      setStock(data.data[0]);
    };

    fetchData();
  }, [reutersCode]);

  if (!stock) return <StockDetailSkeleton />;

  // TODO: change currency symbol
  const viewCurrency = currency ? `$${stock?.closePrice}` : `₩${stock?.closePrice}`;
  const viewStockName = currency ? stock?.symbolCode : stock.stockName;

  //TODO: Add stock description
  return (
    <section className="min-h-[25.6rem] min-w-[48.8rem] rounded-[1.6rem] bg-white p-[3.2rem]">
      <div className="flex flex-col gap-[3.2rem]">
        <div>
          <div className="flex_row justify-between">
            <div>
              <div className="flex_row gap-[0.4rem]">
                <span className="body_1 font-bold">{viewCurrency}</span>
                <span className="body_1 font-bold">∙</span>
                <span className="body_2 font-normal">{viewStockName}</span>
              </div>
              <div className={cn(`flex_row body_2 gap-[0.8rem] font-normal ${getTextColor(stock.fluctuationsRatio)}`)}>
                <span>{formatValueWithIndicator(stock.compareToPreviousClosePrice)}</span>
                <span>{formatValueWithSign(stock.fluctuationsRatio)}%</span>
              </div>
            </div>
            <Toggle checked={currency} setChecked={setCurrency} />
          </div>
        </div>
        <p>{}</p>
      </div>
    </section>
  );
}

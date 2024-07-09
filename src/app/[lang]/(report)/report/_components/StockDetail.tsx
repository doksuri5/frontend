"use client";

import { useState } from "react";
import { Toggle } from "@/components/common";
import { cn } from "@/utils/cn";
import {
  getAbsoluteCompareToPreviousClosePrice,
  getCompareToPreviousClosePriceArrow,
  getFluctuationsRatioColor,
  getFluctuationsRatioSign,
} from "@/utils/stockPriceUtils";
import { StockDetailDataType } from "@/types";

type TStockDetail = {
  stockDetail: Omit<StockDetailDataType, "_id" | "icon" | "score" | "stockCode" | "isMyStock" | "aiReport">;
};

export default function StockDetail({ stockDetail }: TStockDetail) {
  const [currency, setCurrency] = useState(false);
  const { priceUSD, price, symbolCode, stockName, compareToPreviousClosePrice, fluctuationsRatio, description } =
    stockDetail;

  const fluctuationColor = getFluctuationsRatioColor(fluctuationsRatio);
  const fluctuationSign = getFluctuationsRatioSign(fluctuationsRatio);
  const compareToPreviousClosePriceValue = getAbsoluteCompareToPreviousClosePrice(compareToPreviousClosePrice);
  const compareToPreviousClosePriceArrow = getCompareToPreviousClosePriceArrow(compareToPreviousClosePrice);

  const viewCurrency = currency ? `$${priceUSD}` : `₩${price}`;
  const viewStockName = currency ? symbolCode : stockName;

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
              <div className={cn(`flex_row body_2 gap-[0.8rem] font-normal ${fluctuationColor}`)}>
                <span>{compareToPreviousClosePriceArrow + compareToPreviousClosePriceValue}</span>
                <span>
                  {fluctuationSign}
                  {fluctuationsRatio}%
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

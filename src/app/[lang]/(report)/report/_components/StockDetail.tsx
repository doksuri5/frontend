"use client";

import { useState } from "react";
import { Toggle } from "@/components/common";
import { cn } from "@/utils/cn";
import { getCompareToPreviousClosePriceArrow, getFluctuationsRatioColor } from "@/utils/stockPriceUtils";

type TStockDetail = {
  stockDetail: {
    currentPriceUSD: number;
    currentPriceKRW: string;
    stockEngName: string;
    stockKorName: string;
    fluctuationPrice: number;
    fluctuationRatio: number;
    description: string;
  };
};

export default function StockDetail({ stockDetail }: TStockDetail) {
  const [currency, setCurrency] = useState(false);
  const {
    currentPriceUSD,
    currentPriceKRW,
    stockEngName,
    stockKorName,
    fluctuationPrice,
    fluctuationRatio,
    description,
  } = stockDetail;

  const fluctuationColor = getFluctuationsRatioColor(fluctuationRatio);
  const fluctuationArrow = getCompareToPreviousClosePriceArrow(fluctuationRatio);
  const fluctuationSign = fluctuationRatio < 0 ? "-" : "+";
  const viewCurrency = currency ? `$${currentPriceUSD}` : `₩${currentPriceKRW}`;
  const viewStockName = currency ? stockEngName : stockKorName;

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
                <span>{fluctuationArrow + fluctuationPrice}</span>
                <span>
                  {fluctuationSign}
                  {fluctuationRatio}%
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

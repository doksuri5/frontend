"use client";

import { getStockAnalysis } from "@/actions/stock-analysis";
import { STOCK_NAMES, TReutersCodes } from "@/constants/stockCodes";
import { StockAIReportDataType } from "@/types/StockDataType";
import { cn } from "@/utils/cn";
import { formatValueWithIndicator, formatValueWithSign, getTextColor } from "@/utils/stockPriceUtils";
import Image from "next/image";
import { useEffect, useState } from "react";
import AIAnalystReportSkeleton from "./skeleton/AIAnalystReportSkeleton";

type TAIAnalystReport = {
  reutersCode: TReutersCodes;
};

export default function AIAnalystReport({ reutersCode }: TAIAnalystReport) {
  const [aiData, setAiData] = useState<StockAIReportDataType>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStockAnalysis(undefined, { params: reutersCode });
      if (!data.data[0]) {
        return;
      }

      setAiData(data.data[0]);
    };

    fetchData();
  }, [reutersCode]);

  if (!aiData) {
    return <AIAnalystReportSkeleton />;
  }

  return (
    <section className="min-h-[29.5rem] min-w-[75rem] rounded-[1.6rem] bg-white p-[3.2rem]">
      <h2 className="body_1 pb-[5.5rem] font-bold text-navy-900">아잇나우 AI 애널리스트 리포트</h2>
      <div className="mb-[1.6rem] flex items-center gap-[0.8rem] text-grayscale-900">
        <Image src={`/icons/stocks/${STOCK_NAMES[reutersCode]}.svg`} alt="icon" width={30} height={30} />
        <h3 className="body_3 font-bold">{aiData.metrics.stockName}</h3>
        <h3 className="body_3 font-normal">{aiData.metrics.symbolCode}</h3>
        <div className="body_4 font-medium">
          <span>${aiData.metrics.closePrice}</span>
        </div>
        <div className={cn(`body_4 flex gap-[0.8rem] font-normal ${getTextColor(aiData.metrics.fluctuationsRatio)}`)}>
          <span>{formatValueWithIndicator(aiData.metrics.closePriceChange)}</span>
          <span>{formatValueWithSign(aiData.metrics.fluctuationsRatio)}%</span>
        </div>
      </div>
      <p className="body_4 font-medium">{aiData.report}</p>
    </section>
  );
}

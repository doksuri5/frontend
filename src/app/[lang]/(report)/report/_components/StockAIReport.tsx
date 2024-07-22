"use client";

import { getStockAnalysis } from "@/actions/stock-analysis";
import SimpleReportCard from "@/components/common/SimpleReportCard";
import { TReutersCodes } from "@/constants/stockCodes";
import { useEffect, useState } from "react";
import StockAIReportSkeleton from "./skeleton/StockAIReportSkeleton";

type TStockAIReport = {
  reutersCode: TReutersCodes;
};

export default function StockAIReport({ reutersCode }: TStockAIReport) {
  const [totalScore, setTotalScore] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStockAnalysis(undefined, { params: reutersCode });
      if (!data.data[0]) {
        return;
      }

      const { investmentIndex } = data.data[0];
      setTotalScore(investmentIndex);
    };

    fetchData();
  }, [reutersCode]);

  if (!totalScore) return <StockAIReportSkeleton />;

  return (
    <div className="flex_col min-h-[28rem] min-w-[43rem] flex-1 rounded-[1.6rem] bg-white p-[3.2rem]">
      <div className="flex w-full justify-between gap-[0.8rem]">
        <h2 className="body_1 font-bold text-navy-900">종목 AI 리포트</h2>
        <h2 className="heading_3 font-medium text-grayscale-700">{totalScore ?? 0}점</h2>
      </div>
      <SimpleReportCard isShowHeader={false} reutersCode={reutersCode} />
    </div>
  );
}

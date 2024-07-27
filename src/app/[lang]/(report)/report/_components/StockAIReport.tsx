import { getStockAnalysis } from "@/actions/stock-analysis";
import SimpleReportCard from "@/components/common/SimpleReportCard";
import { TReutersCodes } from "@/constants/stockCodes";
import StockAIReportSkeleton from "./skeleton/StockAIReportSkeleton";

type TStockAIReport = {
  reutersCode: TReutersCodes;
};

export default async function StockAIReport({ reutersCode }: TStockAIReport) {
  const data = await getStockAnalysis(undefined, { params: reutersCode });
  const { investmentIndex } = data.data[0];

  if (!investmentIndex) return <StockAIReportSkeleton />;

  return (
    <div className="flex_col min-h-[28rem] min-w-[43rem] flex-1 rounded-[1.6rem] bg-white p-[3.2rem]">
      <div className="flex w-full justify-between gap-[0.8rem]">
        <h2 className="body_1 font-bold text-navy-900">종목 AI 리포트</h2>
        <h2 className="heading_3 font-medium text-grayscale-700">{investmentIndex ?? 0}점</h2>
      </div>
      <SimpleReportCard isShowHeader={false} reutersCode={reutersCode} isShowPrice={false} />
    </div>
  );
}

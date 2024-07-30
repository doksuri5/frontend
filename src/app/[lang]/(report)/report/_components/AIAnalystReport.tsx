import { getStockAnalysis } from "@/actions/stock-analysis";
import { STOCK_NAMES, TReutersCodes } from "@/constants/stockCodes";
import Image from "next/image";
import AIAnalystReportSkeleton from "./skeleton/AIAnalystReportSkeleton";
import StockPrice from "@/components/common/StockPrice";
import { auth } from "@/auth";

type TAIAnalystReport = {
  reutersCode: TReutersCodes;
};

const AIAnalystReport = async ({ reutersCode }: TAIAnalystReport) => {
  const session = await auth();
  const data = await getStockAnalysis(undefined, { params: reutersCode });

  if (!data) {
    return <AIAnalystReportSkeleton />;
  }

  return (
    <section className="min-h-[29.5rem] min-w-[75rem] rounded-[1.6rem] bg-white p-[3.2rem]">
      <h2 className="body_1 pb-[5.5rem] font-bold text-navy-900">아잇나우 AI 애널리스트 리포트</h2>
      <div className="mb-[1.6rem] flex items-center gap-[0.8rem] text-grayscale-900">
        <Image src={`/icons/stocks/${STOCK_NAMES[reutersCode]}.svg`} alt="icon" width={30} height={30} />
        <h3 className="body_3 font-bold">{data.data[0].metrics.stockName}</h3>
        <h3 className="body_3 font-normal">{data.data[0].metrics.symbolCode}</h3>
        <StockPrice reutersCode={reutersCode} />
      </div>
      <p className="body_4 font-medium">{data.data[0].report[session?.user.language ?? "ko"]}</p>
    </section>
  );
};

export default AIAnalystReport;

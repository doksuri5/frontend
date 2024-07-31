import { getStockAnalysis } from "@/actions/stock-analysis";
import SimpleReportCard from "@/components/common/SimpleReportCard";
import { TReutersCodes } from "@/constants/stockCodes";
import { getTranslations } from "next-intl/server";

type TStockAIReport = {
  reutersCode: TReutersCodes;
};

const StockAIReport = async ({ reutersCode }: TStockAIReport) => {
  const t = await getTranslations();
  const data = await getStockAnalysis(undefined, { params: reutersCode });
  const { investmentIndex } = data.data[0];

  return (
    <div className="flex_col min-h-[28rem] min-w-[43rem] flex-1 rounded-[1.6rem] bg-white p-[3.2rem]">
      <div className="flex w-full justify-between gap-[0.8rem]">
        <h2 className="body_1 font-bold text-navy-900">{t("report.stockAIReport")}</h2>
        <h2 className="heading_3 font-medium text-grayscale-700">
          {investmentIndex ?? 0}
          {t("analysis.point")}
        </h2>
      </div>
      <SimpleReportCard isShowHeader={false} reutersCode={reutersCode} isShowPrice={false} />
    </div>
  );
};

export default StockAIReport;

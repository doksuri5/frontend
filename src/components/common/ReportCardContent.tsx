import { formatOnlyIndicator, getTextColor } from "@/utils/stockPriceUtils";
import SimpleRadarChart from "./SimpleRadarChart";
import { cn } from "@/utils/cn";
import { TReutersCodes } from "@/constants/stockCodes";
import { getStockAnalysis } from "@/actions/stock-analysis";
import { Skeleton } from "./Skeleton";
import ClientCountUp from "./CountUp";
import { getLocale, getTranslations } from "next-intl/server";

const ReportCardContent = async ({ reutersCode }: { reutersCode: TReutersCodes }) => {
  const locale = await getLocale();
  const t = await getTranslations();
  const stockAnalysis = (await getStockAnalysis(undefined, { params: reutersCode })).data[0];

  if (!stockAnalysis) {
    return <Skeleton className="h-[18rem] w-full" />;
  }

  return (
    <div className="flex h-full w-full items-center gap-[0.8rem]">
      <div className="h-full w-full min-w-[13rem] p-[1.6rem]">
        <SimpleRadarChart data={stockAnalysis} />
      </div>
      <ul
        className={cn(
          "body_6 flex h-auto min-w-[14rem] flex-col gap-[0.4rem] rounded-[2.4rem] bg-[#F9F9F9] p-[1.6rem]",
          {
            "min-w-[18rem]": locale === "en" || locale === "fr",
          },
        )}
      >
        <li className="flex justify-between">
          1. {t("analysis.stockPrice")}
          <div className={cn("flex gap-[0.8rem] font-normal", getTextColor(stockAnalysis.metrics.fluctuationsRatio))}>
            <span>
              {formatOnlyIndicator(stockAnalysis.metrics.fluctuationsRatio)}
              <ClientCountUp end={Math.abs(stockAnalysis.metrics.fluctuationsRatio)} decimals={1} />%
            </span>
          </div>
        </li>
        <li className="flex justify-between">
          2. {t("analysis.investmentIndex")}
          <div className={cn("flex gap-[0.8rem] font-normal", getTextColor(stockAnalysis.investmentIndex))}>
            <span>
              {formatOnlyIndicator(stockAnalysis.investmentIndex)}
              <ClientCountUp end={Math.abs(stockAnalysis.investmentIndex)} />%
            </span>
          </div>
        </li>
        <li className="flex justify-between">
          3. {t("analysis.profitability")}
          <div className={cn("flex gap-[0.8rem] font-normal", getTextColor(stockAnalysis.profitabilityPercentage))}>
            <span>
              {formatOnlyIndicator(stockAnalysis.profitabilityPercentage)}
              <ClientCountUp end={Math.abs(stockAnalysis.profitabilityPercentage)} />%
            </span>
          </div>
        </li>
        <li className="flex justify-between">
          4. {t("analysis.growth")}
          <div className={cn("flex gap-[0.8rem] font-normal", getTextColor(stockAnalysis.growthPercentage))}>
            <span>
              {formatOnlyIndicator(stockAnalysis.growthPercentage)}
              <ClientCountUp end={Math.abs(stockAnalysis.growthPercentage)} />%
            </span>
          </div>
        </li>
        <li className="flex justify-between">
          5. {t("analysis.interest")}
          <div className={cn("flex gap-[0.8rem] font-normal", getTextColor(stockAnalysis.interestPercentage))}>
            <span>
              {formatOnlyIndicator(stockAnalysis.interestPercentage)}
              <ClientCountUp end={Math.abs(stockAnalysis.interestPercentage)} />%
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ReportCardContent;

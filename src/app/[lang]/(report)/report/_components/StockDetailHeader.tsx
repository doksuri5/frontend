"use client";

import { Toggle } from "@/components/common";
import { TReutersCodes } from "@/constants/stockCodes";
import useStockPrice from "@/hooks/use-stock-price";
import { cn } from "@/utils/cn";
import { formatOnlyIndicator, getTextColor } from "@/utils/stockPriceUtils";
import { useMemo, useState } from "react";
import CountUp from "react-countup";
import StockDetailSkeleton from "./skeleton/StockDetailSkeleton";
import { localeMapToNation, currencySymbols } from "@/constants/currency";
import { useSession } from "next-auth/react";
import { StockCurrencyExchangeDataType } from "@/types/StockDataType";

const StockDetailHeader = ({
  reutersCode,
  currency,
}: {
  reutersCode: TReutersCodes;
  currency: StockCurrencyExchangeDataType[];
}) => {
  const session = useSession();
  const [isChanged, setIsChanged] = useState(false);

  const baseCurrency = currency.find((item) => item.nation === "USD");

  const nationRate = useMemo(
    () => currency.find((item) => item.nation === localeMapToNation[session.data?.user.language ?? "ko"]),
    [currency, session.data?.user.language],
  ) ?? { nation: "KRW", rate: "1" };

  const { stock } = useStockPrice(reutersCode);

  if (!stock) return <StockDetailSkeleton />;

  const localCurrencyAmount =
    (stock.closePrice * Number(baseCurrency?.rate.replace(",", ""))) / Number(nationRate?.rate.replace(",", ""));

  return (
    <div className="flex_row justify-between">
      <div>
        <div className="flex_row gap-[0.4rem]">
          <span className="body_1 font-bold">
            {isChanged ? (
              <CountUp preserveValue end={stock.closePrice} prefix={"$"} decimals={2} />
            ) : (
              <CountUp
                preserveValue
                end={localCurrencyAmount}
                prefix={currencySymbols[nationRate?.nation ?? "KRW"] ?? "￦"}
                decimals={2}
              />
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
      {nationRate.nation !== "USD" && <Toggle checked={isChanged} setChecked={setIsChanged} />}
    </div>
  );
};

export default StockDetailHeader;

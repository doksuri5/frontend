import { getStocksByReutersCode } from "@/actions/stock";
import { STOCK_NAMES, TReutersCodes } from "@/constants/stockCodes";
import { Locale } from "@/i18n";
import { cn } from "@/utils/cn";
import { getLocale } from "next-intl/server";
import Image from "next/image";

const ReportCardHeader = async ({ reutersCode, titleSize }: { reutersCode: TReutersCodes; titleSize: "lg" | "md" }) => {
  const locale = (await getLocale()) as Locale;
  const stock = await getStocksByReutersCode(undefined, { params: reutersCode });

  return (
    <>
      <div className="flex items-center gap-[0.8rem]">
        <Image src={`/icons/stocks/${STOCK_NAMES[reutersCode]}.svg`} alt="icon" width={30} height={30} />
        <h3
          className={cn("font-bold", {
            body_1: titleSize === "lg",
            body_3: titleSize === "md",
          })}
        >
          {locale === "ko" ? stock.data.stockName : stock.data.stockNameEng}
        </h3>
        <h3
          className={cn("font-normal text-grayscale-600", {
            body_3: titleSize === "lg",
            body_5: titleSize === "md",
          })}
        >
          {stock.data.symbolCode}
        </h3>
      </div>
    </>
  );
};

export default ReportCardHeader;

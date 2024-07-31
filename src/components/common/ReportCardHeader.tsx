import { getStocksByReutersCode } from "@/actions/stock";
import { auth } from "@/auth";
import { STOCK_NAMES, TReutersCodes } from "@/constants/stockCodes";
import { cn } from "@/utils/cn";
import Image from "next/image";

const ReportCardHeader = async ({ reutersCode, titleSize }: { reutersCode: TReutersCodes; titleSize: "lg" | "md" }) => {
  const session = await auth();
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
          {session?.user.language === "ko" ? stock.data.stockName : stock.data.stockNameEng}
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

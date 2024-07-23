import { getStocksByReutersCode } from "@/actions/stock";
import { STOCK_NAMES, TReutersCodes } from "@/constants/stockCodes";
import { StockDataType } from "@/types";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "./Skeleton";

const ReportCardHeader = ({ reutersCode, titleSize }: { reutersCode: TReutersCodes; titleSize: "lg" | "md" }) => {
  const [stockInfo, setStockInfo] = useState<StockDataType>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const data = await getStocksByReutersCode(undefined, { params: reutersCode });
      setStockInfo(data.data);
    };

    fetchData();
    setIsLoading(false);
  }, [reutersCode]);

  if (!stockInfo || isLoading) {
    return <Skeleton className="h-[4rem] w-full" />;
  }

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
          {stockInfo.stockName}
        </h3>
        <h3
          className={cn("font-normal text-grayscale-600", {
            body_3: titleSize === "lg",
            body_5: titleSize === "md",
          })}
        >
          {stockInfo.symbolCode}
        </h3>
      </div>
    </>
  );
};

export default ReportCardHeader;

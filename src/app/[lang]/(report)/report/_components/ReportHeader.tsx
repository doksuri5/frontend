import { getStocksByReutersCode } from "@/actions/stock";
import { STOCK_NAMES, TReutersCodes } from "@/constants/stockCodes";
import Image from "next/image";
import ReportHeaderSkeleton from "./skeleton/ReportHeaderSkeleton";
import MyStockToggleInReport from "./MyStockToggleInReport";

type TStockHeader = {
  reutersCode: TReutersCodes;
};

export default async function ReportHeader({ reutersCode }: TStockHeader) {
  const stock = await getStocksByReutersCode(undefined, { params: reutersCode });

  if (!stock.data) return <ReportHeaderSkeleton />;

  return (
    <section className="flex_row justify-between">
      <div className="flex items-center gap-[1.4rem]">
        <div className="relative h-[6.4rem] w-[6.4rem]">
          <Image src={`/icons/stocks/${STOCK_NAMES[reutersCode]}.svg`} alt="stock-icon" width={60} height={60} />
        </div>
        <div className="flex_row gap-[0.8rem] text-navy-900">
          <h1 className="heading_4 font-bold">{stock.data.stockName}</h1>
          <h1 className="body_2 font-normal">∙</h1>
          <h1 className="body_2 font-normal">{stock.data.symbolCode}</h1>
        </div>
      </div>
      <MyStockToggleInReport reutersCode={reutersCode} />
    </section>
  );
}

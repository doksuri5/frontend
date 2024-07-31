import { TReutersCodes } from "@/constants/stockCodes";
import StockDetailHeader from "./StockDetailHeader";
import { getStockCurrencyExchange, getStockDescription } from "@/actions/stock";
import TextMore from "@/components/common/TextMore";
import { getStockAnalysis } from "@/actions/stock-analysis";
import { auth } from "@/auth";

type TStockDetail = {
  reutersCode: TReutersCodes;
};

const StockDetail = async ({ reutersCode }: TStockDetail) => {
  const session = await auth();
  const analysis = await getStockAnalysis(undefined, { params: reutersCode });
  const currency = await getStockCurrencyExchange();

  return (
    <section className="min-h-[25.6rem] min-w-[48.8rem] rounded-[1.6rem] bg-white p-[3.2rem]">
      <div className="flex flex-col gap-[1.6rem]">
        <div>
          <StockDetailHeader reutersCode={reutersCode} currency={currency.data} />
        </div>
        <TextMore>{analysis.data[0].description[session?.user.language ?? "ko"]}</TextMore>
      </div>
    </section>
  );
};

export default StockDetail;

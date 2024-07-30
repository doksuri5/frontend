import { TReutersCodes } from "@/constants/stockCodes";
import StockDetailHeader from "./StockDetailHeader";
import { getStockCurrencyExchange, getStockDescription } from "@/actions/stock";
import TextMore from "@/components/common/TextMore";

type TStockDetail = {
  reutersCode: TReutersCodes;
};

export default async function StockDetail({ reutersCode }: TStockDetail) {
  const description = await getStockDescription(undefined, { params: `${reutersCode}/description` });
  const currency = await getStockCurrencyExchange();

  return (
    <section className="min-h-[25.6rem] min-w-[48.8rem] rounded-[1.6rem] bg-white p-[3.2rem]">
      <div className="flex flex-col gap-[1.6rem]">
        <div>
          <StockDetailHeader reutersCode={reutersCode} currency={currency.data} />
        </div>
        <TextMore>{description.data.corporateOverview}</TextMore>
      </div>
    </section>
  );
}

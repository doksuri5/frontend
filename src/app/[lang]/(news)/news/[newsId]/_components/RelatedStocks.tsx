import StockItem from "@/components/common/List/StockItem";

type TRelatedStocksProps = {
  stockData: any[];
};

export default function RelatedStocks({ stockData }: TRelatedStocksProps) {
  return (
    <section className="min-h-[31rem] min-w-[38.4rem] rounded-[1.6rem] bg-white p-[3.2rem]">
      <h2 className="body_3 pb-[1rem] font-bold text-navy-900">현재 뉴스와 관련된 주식</h2>
      <div className="flex flex-col gap-[0.8rem]">
        {stockData.map((stock) => (
          <StockItem
            variant="findStock"
            _id={stock.id}
            icon={stock.icon}
            stockName={stock.stockKorName}
            symbolCode={stock.stockEngName}
            price={stock.currentPrice}
            compareToPreviousClosePrice={stock.fluctuationPrice}
            fluctuationsRatio={stock.fluctuationRatio}
            key={stock.id}
          />
        ))}
      </div>
    </section>
  );
}

import { StockItem } from "../common";
import DiscoverySection from "./DiscoverySection";
import Apple_icon from "@/public/icons/Apple_icon.svg";

type TStocksProps = {
  param: string;
};

const Stocks = ({ param }: TStocksProps) => {
  const stockList = [
    {
      idx: 1,
      icon: Apple_icon,
      stockName: "애플",
      symbolCode: "AAPL",
      price: 0,
      nationType: "USA",
      compareToPreviousClosePrice: -1.75,
      fluctuationsRatio: -0.82,
    },
    {
      idx: 2,
      icon: Apple_icon,
      stockName: "애플",
      symbolCode: "AAPL",
      price: 0,
      nationType: "USA",
      compareToPreviousClosePrice: -1.75,
      fluctuationsRatio: -0.82,
    },
    {
      idx: 3,
      icon: Apple_icon,
      stockName: "애플",
      symbolCode: "AAPL",
      price: 0,
      nationType: "USA",
      compareToPreviousClosePrice: -1.75,
      fluctuationsRatio: -0.82,
    },
    {
      idx: 4,
      icon: Apple_icon,
      stockName: "애플",
      symbolCode: "AAPL",
      price: 0,
      nationType: "USA",
      compareToPreviousClosePrice: -1.75,
      fluctuationsRatio: -0.82,
    },
    {
      idx: 5,
      icon: Apple_icon,
      stockName: "애플",
      symbolCode: "AAPL",
      price: 0,
      nationType: "USA",
      compareToPreviousClosePrice: -1.75,
      fluctuationsRatio: -0.82,
    },
    {
      idx: 6,
      icon: Apple_icon,
      stockName: "애플",
      symbolCode: "AAPL",
      price: 0,
      nationType: "USA",
      compareToPreviousClosePrice: -1.75,
      fluctuationsRatio: -0.82,
    },
  ];

  const subTag = <span className={`body_5 font-medium text-grayscale-600`}>{`(${stockList.length})`}</span>;

  return (
    <DiscoverySection title="주식" subTag={subTag}>
      <div className="flex_col rounded-[1.6rem] bg-white p-[2.4rem]">
        <div className="grid w-full grid-cols-2 gap-x-[1.6rem] gap-y-[.8rem]">
          {stockList.map((stock) => (
            <StockItem
              key={stock.idx}
              icon={stock.icon}
              stockKorName={stock.stockName}
              stockEngName={stock.symbolCode}
              currentPrice={stock.price}
              fluctuationPrice={stock.compareToPreviousClosePrice}
              fluctuationRatio={stock.fluctuationsRatio}
              variant="findStock"
            />
          ))}
        </div>
        <hr className="mb-[1.6rem] mt-[1.8rem]" />
        <p className="body_4 w-full cursor-pointer px-[1rem] text-center font-medium text-grayscale-400">더보기</p>
      </div>
    </DiscoverySection>
  );
};

export default Stocks;

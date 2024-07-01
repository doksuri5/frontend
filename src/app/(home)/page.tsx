import { StockItem, Button } from "@/components/common";
import AIIcon from "@/public/icons/AI_icon.svg?component";
import Image from "next/image";
import News from "./news";
import SimpleRadarChart from "@/components/common/SimpleRadarChart";
import SimpleReportCard from "./_components/SimpleReportCard";

const dummyDataItems = [
  {
    id: 1,
    icon: "./icons/Apple_icon.svg",
    stockKorName: "애플",
    stockEngName: "AAPL",
    currentPrice: 150.25,
    fluctuationPrice: -1.75,
    fluctuationRatio: -1.15,
  },
  {
    id: 2,
    icon: "/icons/Apple_icon.svg",
    stockKorName: "애플",
    stockEngName: "AAPL",
    currentPrice: 148.0,
    fluctuationPrice: 2.5,
    fluctuationRatio: 1.72,
  },
  {
    id: 3,
    icon: "/icons/Apple_icon.svg",
    stockKorName: "애플",
    stockEngName: "AAPL",
    currentPrice: 155.1,
    fluctuationPrice: -0.75,
    fluctuationRatio: -0.48,
  },
  {
    id: 4,
    icon: "/icons/Apple_icon.svg",
    stockKorName: "애플",
    stockEngName: "AAPL",
    currentPrice: 152.3,
    fluctuationPrice: 1.2,
    fluctuationRatio: 0.79,
  },
  {
    id: 5,
    icon: "/icons/Apple_icon.svg",
    stockKorName: "애플",
    stockEngName: "AAPL",
    currentPrice: 149.5,
    fluctuationPrice: -2.0,
    fluctuationRatio: -1.32,
  },
];

export default function HomePage() {
  return (
    <main className="flex h-full flex-col gap-10 bg-background-100">
      <div className="flex gap-4 pt-[4rem]">
        <h1 className="heading_4 font-bold">스팩님의 AI 리포트</h1>
        <Button variant="textButton" bgColor="bg-navy-900" className="h-[4rem] w-[8rem]">
          <AIIcon width={20} height={20} />
          AI
        </Button>
      </div>
      <section className="flex w-full gap-4">
        {dummyDataItems.slice(0, 3).map((stock) => (
          <SimpleReportCard
            report={{
              companyName: stock.stockKorName,
              stockCode: stock.stockEngName,
              currentPrice: stock.currentPrice,
              fluctuationPrice: stock.fluctuationPrice,
              fluctuationRatio: stock.fluctuationRatio,
            }}
            key={stock.id}
          />
        ))}
      </section>
      <section className="flex w-full gap-4 pt-[4rem]">
        <div className="flex h-[30rem] flex-1 flex-col gap-4">
          <h2 className="heading_4 font-bold">최근 조회</h2>
          <div className="flex_row_col flex-1 gap-2 rounded-lg bg-white">
            <Image src="/icons/warning_icon.svg" alt="waring icon" width={50} height={50} />
            <p>최근 조회한 종목이 없습니다.</p>
          </div>
        </div>
        <div className="flex h-[30rem] flex-1 flex-col gap-4">
          <h2 className="heading_4 font-bold">관심 종목</h2>
          <div className="flex-1 overflow-auto rounded-lg bg-white py-[1.2rem] pl-[2.4rem] pr-[3.2rem] scrollbar-hide">
            {dummyDataItems.map((stock) => (
              <StockItem
                variant="stock"
                icon={stock.icon}
                stockKorName={stock.stockKorName}
                stockEngName={stock.stockEngName}
                currentPrice={stock.currentPrice}
                fluctuationPrice={stock.fluctuationPrice}
                fluctuationRatio={stock.fluctuationRatio}
                key={stock.id}
              />
            ))}
          </div>
        </div>
      </section>
      <News />
    </main>
  );
}

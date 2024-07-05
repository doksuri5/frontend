"use client";

import AppleIcon from "@/public/icons/Apple_icon.svg";
import ReportHeader from "./ReportHeader";
import StockDetail from "./StockDetail";
import StockChartSection from "./StockChartSection";
import AIAnalystReport from "./AIAnalystReport";
import StockAIReport from "./StockAIReport";
import PopularNews from "@/components/common/PopularNews";
import { DUMMY_POPULAR_NEWS_ITEMS } from "@/app/[lang]/(news)/news/_components";

const DUMMY_STCOK = {
  icon: AppleIcon,
  stockCode: "ERS462",
  stockName: "애플",
  symbolCode: "APPL",
  priceUSD: 15.28,
  price: 21105,
  compareToPreviousClosePrice: 1.75,
  fluctuationsRatio: 0.82,
  description: `애플은 스마트폰, 개인용 컴퓨터, 태블릿, 웨어러블 및 액세서리를 설계, 제조 및 판매하고 다양한 관련 서비스를 판매한다. 제품 카테고리는 iPhone, MAc, iPad, Wearables, Home 및 Accessories로 나뉜다.`,
  aiReport: `급격한 금리 인상에도 견조한 자동차 수요를 반영하여 테슬라의 목표주가를 340달러로 26% 상향 조정하고 Top Pick으로 유지한다. 단기 상승에 따른 숨 고르기가 예상되지만, 중기적으로 동사의 경쟁우위는 더 강해지고 있다. 기존 OEM의 전기차 전환이 더디고 중국 신생 업체들의 현금 흐름이 약화되고있는 가운데, 
테슬라의 멕시코 공장이 가동되면 전기차 제조 경쟁력 격차는 더 벌어질 것으로 예상된다.`,
  score: 70,
  isMyStock: false,
};

const DUMMY_CHART = [
  { period: "2024/04/1week", price: 4000 },
  { period: "2024/04/2week", price: 3000 },
  { period: "2024/04/3week", price: 2000 },
  { period: "2024/04/4week", price: 2780 },
  { period: "2024/05/1week", price: 1890 },
  { period: "2024/05/2week", price: 2390 },
  { period: "2024/05/3week", price: 3490 },
  { period: "2024/05/4week", price: 2000 },
  { period: "2024/06/1week", price: 2780 },
  { period: "2024/06/2week", price: 1890 },
  { period: "2024/06/3week", price: 2390 },
  { period: "2024/06/4week", price: 3490 },
];

export default function Report() {
  const {
    icon,
    stockCode,
    stockName,
    symbolCode,
    priceUSD,
    price,
    compareToPreviousClosePrice,
    fluctuationsRatio,
    description,
    aiReport,
    score,
    isMyStock,
  } = DUMMY_STCOK;

  return (
    <div className="flex flex-col gap-[2.4rem] pb-[12rem] pt-[4.7rem]">
      <ReportHeader
        data={{
          icon,
          stockName,
          symbolCode,
          isMyStock,
        }}
      />
      <div className="flex gap-[2.1rem]">
        <StockDetail
          stockDetail={{
            priceUSD,
            price,
            symbolCode,
            stockName,
            compareToPreviousClosePrice,
            fluctuationsRatio,
            description,
          }}
        />
        <StockChartSection chartData={DUMMY_CHART} />
      </div>
      <div className="flex flex-row gap-[2.1rem]">
        <StockAIReport data={{ fluctuationsRatio, score }} />
        <AIAnalystReport
          data={{
            icon,
            stockName,
            stockCode,
            priceUSD,
            aiReport,
            fluctuationsRatio,
            compareToPreviousClosePrice,
          }}
        />
      </div>
      <PopularNews popularNewsData={DUMMY_POPULAR_NEWS_ITEMS} />
    </div>
  );
}

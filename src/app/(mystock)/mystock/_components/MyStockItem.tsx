import React from "react";
import Image from "next/image";
import { Button } from "@/components/common";
import { StockDataType } from "@/types";
import graph from "@/public/icons/graph.png";

type TMyStockItemProps = {
  data: StockDataType;
};
const MyStockItem = ({ data }: TMyStockItemProps) => {
  const cashSymbol = new Map([
    ["USA", "$"],
    ["KOR", "₩"],
  ]);
  const compareToPreviousClosePriceColor = data.compareToPreviousClosePrice < 0 ? "text-blue-600" : "text-warning-100";
  const fluctuationsRatioColor = data.fluctuationsRatio < 0 ? "text-blue-600" : "text-warning-100";
  const compareToPreviousClosePriceArrow = data.compareToPreviousClosePrice < 0 ? "▼" : "▲";
  const compareToPreviousClosePriceSign =
    data.compareToPreviousClosePrice < 0 ? data.compareToPreviousClosePrice * -1 : data.compareToPreviousClosePrice;
  const fluctuationsRatioSign = data.fluctuationsRatio < 0 ? "" : "+";

  return (
    <div className="flex_col rounded-[1.6rem] bg-white px-[3.2rem]">
      {/* 주식 정보 */}
      <div className="mb-[1.6rem] mt-[3.2rem] w-full">
        <div className="flex_row justify-start gap-[.8rem]">
          <Image src={data.icon} alt="아이콘" width={32} height={32} />
          <strong className="body_1 text-grayscale-900">{data.stockName}</strong>
          <span className="body_3 text-grayscale-600">{data.symbolCode}</span>
        </div>
        <div className="flex_row justify-start gap-[.8rem]">
          <span className="body_4 font-medium text-grayscale-900">{`${cashSymbol.get(data.nationType) || ""}${data.price}`}</span>
          <span className={`${compareToPreviousClosePriceColor}`}>
            {compareToPreviousClosePriceArrow}
            {compareToPreviousClosePriceSign}
          </span>
          <span className={`${fluctuationsRatioColor}`}>{fluctuationsRatioSign + data.fluctuationsRatio + "%"}</span>
        </div>
      </div>

      {/* 차트 */}
      <div className="flex_row justify-between gap-[2.4rem]">
        <Image src={graph} alt="dd" />
        <div className="h-[16.8rem] w-[16.8rem] rounded-[2.4rem] bg-background-100 px-[2.4rem] py-[1.6rem]"></div>
      </div>

      {/* 버튼 */}
      <div className="flex_row my-[1.6rem] w-full gap-[.8rem]">
        <Button variant="textButton" size="md" bgColor="bg-grayscale-200">
          삭제하기
        </Button>
        <Button variant="textButton" size="md" bgColor="bg-navy-900">
          자세히 보기
        </Button>
      </div>
    </div>
  );
};

export default MyStockItem;

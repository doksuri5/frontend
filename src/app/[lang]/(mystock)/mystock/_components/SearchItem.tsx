"use client";

import Image from "next/image";
import { Button } from "@/components/common";
import { useInterestStockStore } from "@/app/[lang]/(mystock)/mystock/stores";
import { StockDataType } from "@/types";
import {
  getCompareToPreviousClosePriceColor,
  getCompareToPreviousClosePriceArrow,
  getAbsoluteCompareToPreviousClosePrice,
  getFluctuationsRatioColor,
  getFluctuationsRatioSign,
} from "@/utils/stockPriceUtils";

type TSearchItemProps = {
  data: StockDataType;
};
const SearchItem = ({ data }: TSearchItemProps) => {
  const { stockItemList, addStockItemList, deleteStockItem } = useInterestStockStore();
  const isStockItemListContainsData = stockItemList.some((item) => item._id === data._id);

  const cashSymbol = new Map([
    ["USA", "$"],
    ["KOR", "₩"],
  ]);

  const addStock = () => {
    if (!isStockItemListContainsData) {
      addStockItemList(data);
      // add fetching 진행 (캐싱 무효화도 같이)
    }
  };

  const deleteStock = () => {
    if (isStockItemListContainsData) {
      deleteStockItem(data);
      // delete fetching 진행 (캐싱 무효화도 같이)
    }
  };

  return (
    <div className="flex_row w-full justify-between">
      <div className="flex_row gap-[1.6rem]">
        <Image src={data.icon} alt="아이콘" width={48} height={48} />
        <div className="flex_row gap-[.4rem]">
          <span className="body_2 font-medium text-grayscale-900">{data.stockName}</span>
          <span className="body_3 text-grayscale-600">∙</span>
          <span className="body_3 text-grayscale-600">{data.symbolCode}</span>
        </div>
      </div>
      <div className="flex_row gap-[2rem]">
        <div className="flex_row gap-[.8rem]">
          <span className="body_4 font-medium text-grayscale-900">{`${cashSymbol.get(data.nationType) || ""}${data.price}`}</span>
          <span className={`${getCompareToPreviousClosePriceColor(data.compareToPreviousClosePrice)}`}>
            {getCompareToPreviousClosePriceArrow(data.compareToPreviousClosePrice)}
            {getAbsoluteCompareToPreviousClosePrice(data.compareToPreviousClosePrice)}
          </span>
          <span className={`${getFluctuationsRatioColor(data.fluctuationsRatio)}`}>
            {getFluctuationsRatioSign(data.fluctuationsRatio) + data.fluctuationsRatio + "%"}
          </span>
        </div>
        {isStockItemListContainsData ? (
          <Button variant="textButton" size="sm" bgColor="bg-grayscale-200" className="w-[12rem]" onClick={deleteStock}>
            삭제하기
          </Button>
        ) : (
          <Button variant="textButton" size="sm" bgColor="bg-navy-900" className="w-[12rem]" onClick={addStock}>
            추가
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchItem;

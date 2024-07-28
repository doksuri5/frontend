"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/common";
import { useInterestStockStore } from "@/app/[lang]/(mystock)/mystock/stores";
import { StockDataType } from "@/types";
import { formatValueWithIndicator, formatValueWithSign, getTextColor } from "@/utils/stockPriceUtils";
import { STOCK_NAMES } from "@/constants/stockCodes";
import { deleteInterestStock, insertInterestStock } from "@/actions/stock";

type TSearchItemProps = {
  data: StockDataType;
};
const SearchItem = ({ data }: TSearchItemProps) => {
  const t = useTranslations("myStock");

  const { stockItemList, addStockItemList, deleteStockItem } = useInterestStockStore();
  const isStockItemListContainsData = stockItemList.some((item) => item.id === data.id);

  const cashSymbol = new Map([
    ["USA", "$"],
    ["KOR", "₩"],
  ]);

  const addStock = async () => {
    if (!isStockItemListContainsData) {
      await insertInterestStock({ reutersCode: data.reutersCode });
      addStockItemList(data);
    }
  };

  const deleteStock = async () => {
    if (isStockItemListContainsData) {
      await deleteInterestStock(undefined, { params: data.reutersCode });
      deleteStockItem(data);
    }
  };

  return (
    <div className="flex_row w-full justify-between">
      <div className="flex_row gap-[1.6rem]">
        <Image src={`/icons/stocks/${STOCK_NAMES[data.reutersCode]}.svg`} alt="아이콘" width={48} height={48} />
        <div className="flex_row gap-[.4rem]">
          <span className="body_2 font-medium text-grayscale-900">{data.stockName}</span>
          <span className="body_3 text-grayscale-600">∙</span>
          <span className="body_3 text-grayscale-600">{data.symbolCode}</span>
        </div>
      </div>
      <div className="flex_row gap-[2rem]">
        <div className="flex_row gap-[.8rem]">
          <span className="body_4 font-medium text-grayscale-900">{`${cashSymbol.get(data.nationType) || ""}${data.closePrice}`}</span>
          <span className={`${getTextColor(data.compareToPreviousClosePrice)}`}>
            {formatValueWithIndicator(data.compareToPreviousClosePrice)}
          </span>
          <span className={`${getTextColor(data.fluctuationsRatio)}`}>
            {formatValueWithSign(data.fluctuationsRatio) + "%"}
          </span>
        </div>
        {isStockItemListContainsData ? (
          <Button variant="textButton" size="sm" bgColor="bg-grayscale-200" className="w-[12rem]" onClick={deleteStock}>
            {t("modal.modalSearchItemDelete")}
          </Button>
        ) : (
          <Button variant="textButton" size="sm" bgColor="bg-navy-900" className="w-[12rem]" onClick={addStock}>
            {t("modal.modalSearchItemAdd")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchItem;

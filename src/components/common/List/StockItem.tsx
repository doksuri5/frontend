import { StockDataType } from "@/types";
import { cn } from "@/utils/cn";
import {
  getCompareToPreviousClosePriceColor,
  getCompareToPreviousClosePriceArrow,
  getCompareToPreviousClosePriceSign,
  getFluctuationsRatioColor,
  getFluctuationsRatioSign,
} from "@/utils/stockPriceUtils";
import Image from "next/image";

type TIStockItemProps = StockDataType & {
  iconSize?: number;
  style?: string;
  variant?: "stock" | "findStock";
};

const variantStyles = {
  stock: {
    weight: "w-full",
    height: "h-32",
    imageSize: "h-[6.4rem] w-[6.4rem] flex_row_center",
    stockKorName: "body_2 font-bold",
    stockEngName: "body_5 font-normal",
    currentPrice: "body_3 text-right font-medium",
    fluctuation: "body_4 flex gap-[0.8rem] font-normal",
  },
  findStock: {
    weight: "w-[26.3rem]",
    height: "h-[6.4rem]",
    imageSize: "h-[4.8rem] w-[4.8rem]",
    stockKorName: "body_4 font-bold",
    stockEngName: "body_5 font-normal",
    currentPrice: "body_5 text-right font-medium",
    fluctuation: "caption flex gap-[0.8rem] font-normal",
  },
};

export default function StockItem({
  _id,
  icon,
  iconSize = 50,
  stockName,
  symbolCode,
  price,
  compareToPreviousClosePrice,
  fluctuationsRatio,
  style,
  variant = "stock",
}: TIStockItemProps) {
  const fluctuationPriceColor = getCompareToPreviousClosePriceColor(compareToPreviousClosePrice);
  const fluctuationRatioColor = getFluctuationsRatioColor(compareToPreviousClosePrice);
  const fluctuationArrow = getCompareToPreviousClosePriceArrow(compareToPreviousClosePrice);
  const fluctuationPriceSign = getCompareToPreviousClosePriceSign(compareToPreviousClosePrice);
  const fluctuationRatioSign = getFluctuationsRatioSign(fluctuationsRatio);

  const selectedVariantStyles = variantStyles[variant];

  return (
    <div
      className={cn(
        `flex items-center justify-between text-grayscale-900 ${selectedVariantStyles.weight} ${selectedVariantStyles.height} ${style}`,
      )}
    >
      <div className="flex items-center gap-[1.6rem]">
        <div className={selectedVariantStyles.imageSize}>
          <Image src={icon} alt="icon" width={iconSize} height={iconSize} />
        </div>
        <div>
          <h3 className={selectedVariantStyles.stockKorName}>{stockName}</h3>
          <h3 className={selectedVariantStyles.stockEngName}>{symbolCode}</h3>
        </div>
      </div>
      <div>
        <div className={selectedVariantStyles.currentPrice}>
          <span>${price}</span>
        </div>
        <div className={cn(`${selectedVariantStyles.fluctuation}`)}>
          <span className={`${fluctuationPriceColor}`}>{fluctuationArrow + fluctuationPriceSign}</span>
          <span className={`${fluctuationRatioColor}`}>{fluctuationRatioSign + fluctuationsRatio}%</span>
        </div>
      </div>
    </div>
  );
}

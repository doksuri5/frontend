import { cn } from "@/utils/cn";
import {
  getCompareToPreviousClosePriceColor,
  getCompareToPreviousClosePriceArrow,
  getCompareToPreviousClosePriceSign,
  getFluctuationsRatioColor,
  getFluctuationsRatioSign,
} from "@/utils/stockPriceUtils";
import Image from "next/image";

type TIStockItemProps = {
  icon: string;
  iconSize?: number;
  stockKorName: string;
  stockEngName: string;
  currentPrice: number;
  fluctuationPrice: number;
  fluctuationRatio: number;
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
  icon,
  iconSize = 50,
  stockKorName,
  stockEngName,
  currentPrice,
  fluctuationPrice,
  fluctuationRatio,
  style,
  variant = "stock",
}: TIStockItemProps) {
  const fluctuationPriceColor = getCompareToPreviousClosePriceColor(fluctuationPrice);
  const fluctuationRatioColor = getFluctuationsRatioColor(fluctuationRatio);
  const fluctuationArrow = getCompareToPreviousClosePriceArrow(fluctuationPrice);
  const fluctuationPriceSign = getCompareToPreviousClosePriceSign(fluctuationPrice);
  const fluctuationRatioSign = getFluctuationsRatioSign(fluctuationRatio);

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
          <h3 className={selectedVariantStyles.stockKorName}>{stockKorName}</h3>
          <h3 className={selectedVariantStyles.stockEngName}>{stockEngName}</h3>
        </div>
      </div>
      <div>
        <div className={selectedVariantStyles.currentPrice}>
          <span>${currentPrice}</span>
        </div>
        <div className={cn(`${selectedVariantStyles.fluctuation}`)}>
          <span className={`${fluctuationPriceColor}`}>{fluctuationArrow + fluctuationPriceSign}</span>
          <span className={`${fluctuationRatioColor}`}>{fluctuationRatioSign + fluctuationRatio}%</span>
        </div>
      </div>
    </div>
  );
}

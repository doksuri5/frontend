import { cn } from "@/utils/cn";
import { Skeleton } from "./Skeleton";

const StockItemSkeleton = ({ variant, style }: { variant: "stock" | "findStock"; style?: string }) => {
  const variantStyles = {
    stock: {
      weight: "w-[49.4rem]",
      height: "h-32",
      imageSize: "h-[6.4rem] w-[6.4rem]",
      stockKorName: "w-[70%] h-[3rem]",
      stockEngName: "w-[90%] h-[2.8rem]",
      currentPrice: "w-[40%] h-[2.5rem]",
      fluctuation: "w-[60%] h-[2rem]",
    },
    findStock: {
      weight: "w-[26.3rem]",
      height: "h-[6.4rem]",
      imageSize: "h-[4.8rem] w-[4.8rem]",
      stockKorName: "w-[70%] h-[2.4rem]",
      stockEngName: "w-[90%] h-[2rem]",
      currentPrice: "w-[40%] h-[2rem]",
      fluctuation: "w-[60%] h-[1.6rem]",
    },
  };

  const selectedVariantStyles = variantStyles[variant];

  return (
    <div
      className={cn(
        `flex items-center justify-between text-grayscale-900 ${selectedVariantStyles.weight} ${selectedVariantStyles.height} ${style}`,
      )}
    >
      <div className="flex w-[50%] items-center gap-[1.6rem]">
        <Skeleton className={selectedVariantStyles.imageSize} />
        <div className="gap flex h-[4.8rem] flex-1 flex-col justify-between">
          <Skeleton className={selectedVariantStyles.stockKorName} />
          <Skeleton className={selectedVariantStyles.stockEngName} />
        </div>
      </div>
      <div className="flex h-[3.6rem] w-[50%] flex-col items-end justify-evenly gap-[.5rem]">
        <Skeleton className={selectedVariantStyles.currentPrice} />
        <Skeleton className={selectedVariantStyles.fluctuation} />
      </div>
    </div>
  );
};

export default StockItemSkeleton;

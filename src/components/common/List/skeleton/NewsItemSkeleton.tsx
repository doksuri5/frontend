import { cn } from "@/utils/cn";
import { Skeleton } from "../../Skeleton";

const variantStyles = {
  "lineClamp-2": {
    height: "h-[10rem]",
    descriptionHeight: "h-[4.8rem]",
    imageSize: "h-[100px] w-[172px]",
  },
  "lineClamp-4": {
    height: "h-[14.8rem]",
    descriptionHeight: "h-[9.6rem]",
    imageSize: "h-[148px] w-[252px]",
  },
};

export default function NewsItemSkeleton({
  variant = "lineClamp-2",
  style,
}: {
  variant?: "lineClamp-2" | "lineClamp-4";
  style?: string;
}) {
  const selectedVariantStyles = variantStyles[variant];

  return (
    <div className={cn(`flex w-full gap-[2rem] ${selectedVariantStyles.height} ${style}`)}>
      <Skeleton
        className={cn(
          `relative h-[10rem] w-[17.2rem] flex-shrink-0 overflow-hidden rounded-2xl ${selectedVariantStyles.imageSize}`,
        )}
      />
      <div className="flex w-full flex-1 flex-col gap-[1.6rem]">
        <div className="flex items-center justify-between">
          <Skeleton className="h-[2.8rem] w-4/5" />
          <Skeleton className="h-[2rem] w-2/12" />
        </div>
        <Skeleton className={cn(`body_4 font-normal ${selectedVariantStyles.descriptionHeight}`)} />
      </div>
    </div>
  );
}

import { Skeleton } from "@/components/common";

export default function StockDetailSkeleton() {
  return (
    <div className="flex w-full flex-col gap-[3.2rem]">
      <div>
        <div className="flex_row w-full justify-between">
          <Skeleton className="h-[6rem] w-5/12" />
          <Skeleton className="h-[4rem] w-[7.6rem]" />
        </div>
      </div>
    </div>
  );
}

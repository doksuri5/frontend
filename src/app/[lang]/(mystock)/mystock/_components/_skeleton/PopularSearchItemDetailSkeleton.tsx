import { Skeleton } from "@/components/common/Skeleton";

const PopularSearchItemDetailSkeleton = () => {
  return (
    <div className={`flex_row h-[4rem] w-[32rem] justify-between`}>
      <div className="flex_row gap-[1rem]">
        <Skeleton className="h-[2.4rem] w-[1.6rem]" />
        <Skeleton className="h-[3.2rem] w-[3.2rem] rounded-full" />
        <Skeleton className="h-[2.4rem] w-[10rem]" />
      </div>
      <div>
        <Skeleton className="h-[2.4rem] w-[10rem]" />
      </div>
    </div>
  );
};

export default PopularSearchItemDetailSkeleton;

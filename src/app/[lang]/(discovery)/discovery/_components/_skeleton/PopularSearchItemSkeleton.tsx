import { Skeleton } from "@/components/common/Skeleton";

const PopularSearchItemSkeleton = () => {
  return (
    <div className={`flex_row h-[4rem] w-[26.3rem] gap-[1.6rem]`}>
      <Skeleton className="h-[2.5rem] w-[1.8rem]" />
      <Skeleton className="h-[2.5rem] w-[70%]" />
    </div>
  );
};

export default PopularSearchItemSkeleton;

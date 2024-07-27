import { Skeleton } from "@/components/common/Skeleton";

const SearchItemSkeleton = () => {
  return (
    <div className="flex_row w-full justify-between">
      <div className="flex_row gap-[1.6rem]">
        <Skeleton className="h-[4.8rem] w-[4.8rem]" />
        <div className="flex_row gap-[.4rem]">
          <Skeleton className="h-[2.8rem] w-[100px]" />
          <Skeleton className="h-[1rem] w-[10px]" />
          <Skeleton className="h-[2.8rem] w-[50px]" />
        </div>
      </div>
      <div className="flex_row gap-[2rem]">
        <div className="flex_row gap-[.8rem]">
          <Skeleton className="h-[2.4rem] w-[7rem]" />
          <Skeleton className="h-[2.4rem] w-[4rem]" />
          <Skeleton className="h-[2.4rem] w-[4rem]" />
        </div>
        <Skeleton className="h-[3.6rem] w-[12rem]" />
      </div>
    </div>
  );
};

export default SearchItemSkeleton;

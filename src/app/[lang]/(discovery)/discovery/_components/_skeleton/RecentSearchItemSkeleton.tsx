import { Skeleton } from "@/components/common/Skeleton";

const RecentSearchItemSkeleton = () => {
  return (
    <li className="flex_row h-[4rem] w-full justify-between">
      <div className="flex_row gap-[.8rem]">
        <Skeleton className="h-[2.5rem] w-[2.5rem]" />
        <Skeleton className="h-[2rem] w-[8rem]" />
      </div>
      <div className="flex_row gap-[.8rem]">
        <Skeleton className="h-[2rem] w-[4rem]" />
        <Skeleton className="h-[2.4rem] w-[2.4rem]" />
      </div>
    </li>
  );
};

export default RecentSearchItemSkeleton;

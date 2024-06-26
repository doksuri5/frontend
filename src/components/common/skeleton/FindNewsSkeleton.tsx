import { Skeleton } from "./Skeleton";

const FindNewsSkeleton = () => {
  return (
    <div className="flex h-[6.4rem] w-full gap-[2rem]">
      <div className="h-[6.4rem] w-[12rem] flex-shrink-0">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex w-full flex-1 flex-col justify-between py-[0.4rem]">
        <Skeleton className="h-[1.6rem] w-[100%]" />
        <div className="flex gap-[0.8rem]">
          <Skeleton className="h-[1.4rem] w-[40%]" />
        </div>
      </div>
    </div>
  );
};

export default FindNewsSkeleton;

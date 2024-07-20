import React from "react";
import { Skeleton } from "@/components/common";

const MyStockItemSkeleton = () => {
  return (
    <div className="flex_col rounded-[1.6rem] bg-white px-[3.2rem]">
      <div className="mb-[1.6rem] mt-[3.2rem] w-full">
        <div className="flex_row justify-start gap-[.8rem]">
          <Skeleton className="h-[3.2rem] w-[3.2rem] rounded-full" />
          <Skeleton className="h-[3.2rem] w-[15rem]" />
          <Skeleton className="h-[3.2rem] w-[5rem]" />
        </div>
        <div className="flex_row mt-[.8rem] justify-start gap-[.8rem]">
          <Skeleton className="h-[2.4rem] w-[8rem]" />
          <Skeleton className="h-[2.4rem] w-[5rem]" />
          <Skeleton className="h-[2.4rem] w-[5rem]" />
        </div>
      </div>
      <Skeleton className="h-[20rem] w-full" /> {/* SimpleReportCard 부분 */}
      {/* 버튼 */}
      <div className="flex_row my-[1.6rem] w-full gap-[.8rem]">
        <Skeleton className="h-[5.6rem] flex-1" />
        <Skeleton className="h-[5.6rem] flex-1" />
      </div>
    </div>
  );
};

export default MyStockItemSkeleton;

import { Skeleton } from "@/components/common";

export default function ReportHeaderSkeleton() {
  return (
    <section className="flex_row w-full justify-between">
      <div className="flex w-full items-center gap-[1.4rem]">
        <Skeleton className="h-[6.4rem] w-[6.4rem] rounded-full bg-white" />
        <Skeleton className="h-[6.4rem] w-2/6 bg-white" />
      </div>
      <Skeleton className="h-[5.6rem] w-[18rem] bg-white" />
    </section>
  );
}

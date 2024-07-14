import { Skeleton } from "@/components/common";

export default function StockAIReportSkeleton() {
  return (
    <section className="min-h-[29.5rem] min-w-[43rem]">
      <div className="h-[29.5rem] flex-1 rounded-[1.6rem] bg-white p-[3.2rem]">
        <div className="flex justify-between gap-[0.8rem]">
          <h2 className="body_1 font-bold text-navy-900">종목 AI 리포트</h2>
          <Skeleton className="h-[4rem] w-2/6" />
        </div>
        <Skeleton className="mt-[1.7rem] h-[18rem] w-full" />
      </div>
    </section>
  );
}

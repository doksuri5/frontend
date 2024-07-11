import { Skeleton } from "@/components/common";

export default function AIAnalystReportSkeleton() {
  return (
    <section className="min-h-[29.5rem] min-w-[75rem] rounded-[1.6rem] bg-white p-[3.2rem]">
      <h2 className="body_1 pb-[5.5rem] font-bold text-navy-900">아잇나우 AI 애널리스트 리포트</h2>
      <div className="mb-[1.6rem] flex w-full items-center gap-[0.8rem]">
        <Skeleton className="h-[3rem] w-[3rem] rounded-full" />
        <Skeleton className="h-[3rem] w-3/6" />
      </div>
      <Skeleton className="h-[9.6rem] w-full" />
    </section>
  );
}

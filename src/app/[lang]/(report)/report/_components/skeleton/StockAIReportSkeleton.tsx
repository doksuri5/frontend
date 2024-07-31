import { Skeleton } from "@/components/common";
import { useTranslations } from "next-intl";

export default function StockAIReportSkeleton() {
  const t = useTranslations("report");
  return (
    <section className="min-h-[29.5rem] min-w-[43rem]">
      <div className="h-[29.5rem] flex-1 rounded-[1.6rem] bg-white p-[3.2rem]">
        <div className="flex justify-between gap-[0.8rem]">
          <h2 className="body_1 font-bold text-navy-900">{t("stockAIReport")}</h2>
          <Skeleton className="h-[4rem] w-2/6" />
        </div>
        <Skeleton className="mt-[1.7rem] h-[18rem] w-full" />
      </div>
    </section>
  );
}

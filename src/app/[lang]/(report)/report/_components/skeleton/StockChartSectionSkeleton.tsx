import { Skeleton } from "@/components/common";
import { useTranslations } from "next-intl";

export default function StockChartSectionSkeleton() {
  const t = useTranslations("report");
  return (
    <section className="flex min-h-[25.6rem] min-w-[69.2rem] flex-col gap-[0.8rem] rounded-[1.6rem] bg-white p-[3.2rem]">
      <div className="flex flex-row justify-between gap-[0.8rem]">
        <h2 className="body_1 font-bold text-navy-900">{t("stockPriceChart")}</h2>
        <Skeleton className="min-h-[3.2rem] min-w-[32rem]" />
      </div>
      <Skeleton className="h-[14.5rem] w-full" />
    </section>
  );
}

import { Skeleton } from "@/components/common";
import AI_Summary from "@/public/icons/AI_Summary.svg?component";
import { useTranslations } from "next-intl";

export default function NewsDetailSkeleton() {
  const t = useTranslations();

  return (
    <div className="flex min-w-[79.2rem] flex-col gap-[3.2rem] rounded-[1.6rem] bg-white p-[3.2rem]">
      <div>
        <Skeleton className="h-[3.6rem] w-full" />
        <div className="flex justify-between pt-[1.6rem]">
          <Skeleton className="h-[2rem] w-5/12" />
          <Skeleton className="h-[3.6rem] w-[17.6rem]" />
        </div>
      </div>
      <section>
        <div className="flex gap-[1.2rem]">
          <AI_Summary />
          <span className="body_4 font-semibold">{t("news.AISummary", { defaultMessage: "아잇나우 AI요약" })}</span>
        </div>
        <Skeleton className="mt-[2.4rem] h-[14.4rem] w-full" />
      </section>
      <article>
        <Skeleton className="relative mb-[2.4rem] h-[38rem] w-full overflow-hidden rounded-2xl" />
        <Skeleton className="h-[40rem] w-full" />
      </article>
    </div>
  );
}

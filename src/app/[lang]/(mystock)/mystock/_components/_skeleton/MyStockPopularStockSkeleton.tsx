import { useTranslations } from "next-intl";
import PopularSearchItemDetailSkeleton from "./PopularSearchItemDetailSkeleton";

const MyStockPopularStockSkeleton = () => {
  const t = useTranslations("myStock");

  return (
    <div className="flex flex-col gap-[1.6rem]">
      <h3 className="body_3 font-medium text-navy-900">{t("modal.modalPopularTitle")}</h3>
      <div className="grid h-[35rem] w-full grid-flow-col grid-rows-5 gap-[2.4rem] rounded-[1.6rem] border border-navy-100 p-[2.4rem]">
        {Array.from({ length: 6 }).map((_, idx) => (
          <PopularSearchItemDetailSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
};

export default MyStockPopularStockSkeleton;

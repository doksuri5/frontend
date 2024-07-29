import { useTranslations } from "next-intl";
import { StockItemSkeleton } from "@/components/common";

const MyStockRecentSearchSkeleton = () => {
  const t = useTranslations("myStock");

  return (
    <div className="flex flex-col gap-[1.6rem]">
      <div className="flex_row justify-between">
        <h3 className="body_3 font-medium text-navy-900">{t("modal.modalRecentSearchTitle")}</h3>
        <span className="body_5 cursor-pointer font-medium text-grayscale-600 underline">
          {t("modal.modalAllDeleteText")}
        </span>
      </div>
      <ul className="flex gap-[2rem] overflow-x-scroll scrollbar-hide">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="rounded-[1.6rem] border border-navy-100 px-[1.6rem] py-[2.4rem]">
            <StockItemSkeleton variant="findStock" />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MyStockRecentSearchSkeleton;

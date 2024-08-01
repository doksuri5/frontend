import { getRecentSearchDetails } from "@/actions/stock";
import { StockItem } from "@/components/common";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const RecentLookup = async () => {
  const t = await getTranslations("home.recent");
  const recentSearches = (await getRecentSearchDetails()).data;

  return (
    <div className="flex h-[40rem] flex-1 flex-col gap-[2.4rem]">
      <h2 className="heading_4 font-bold">{t("title")}</h2>
      <div
        className={cn("flex-1 overflow-auto rounded-[1.6rem] bg-white pb-[.8rem] pt-[1.2rem]", {
          "flex items-center justify-center": !recentSearches || recentSearches.length === 0,
        })}
      >
        {!recentSearches || recentSearches.length === 0 ? (
          <div className="flex_row_col flex-1 gap-[1.3rem] rounded-[1.6rem] bg-white">
            <Image src="/icons/warning_icon.svg" alt="warning icon" width={50} height={50} />
            <p>{t("noRecentSearches")}</p>
          </div>
        ) : (
          <div className="scrollbar-thin scrollbar_style h-full overflow-y-scroll pl-[2.4rem] pr-[3.2rem]">
            {recentSearches.map((stock) => (
              <StockItem variant="stock" key={stock.id} {...stock} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentLookup;

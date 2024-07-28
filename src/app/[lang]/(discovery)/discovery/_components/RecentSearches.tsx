"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import SearchItem from "./SearchItem";
import { Alert, Skeleton } from "@/components/common";
import { SearchTextDataType } from "@/types/SearchDataType";
import { deleteRecentSearchTextList, getRecentSearches } from "@/actions/search";
import WarningIcon from "@/public/icons/warning_icon.svg?component";
import RecentSearchItemSkeleton from "./_skeleton/RecentSearchItemSkeleton";

const RecentSearches = ({ recentSearches }: { recentSearches: SearchTextDataType[] }) => {
  const t = useTranslations("discovery");
  const [showAlert, setShowAlert] = useState(false);
  const [searchItems, setSearchItems] = useState(recentSearches);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchRecentSearches = async () => {
      const response = await getRecentSearches();
      if (response.ok) setSearchItems(response.data);
    };

    startTransition(async () => {
      await fetchRecentSearches();
    });
  }, [recentSearches]);

  // 전체 삭제
  const handleDeleteSearch = async () => {
    if (recentSearches.length !== 0) {
      try {
        await deleteRecentSearchTextList();
        setSearchItems([]);
      } catch (error) {
        console.error("Fetch Error", error);
      } finally {
        setShowAlert(false);
      }
    }
  };

  // Alert Show
  const handleAlertShow = () => {
    if (recentSearches.length !== 0) setShowAlert(true);
  };

  if (isPending)
    return (
      <div className="flex_col relative min-h-[20rem] rounded-[1.6rem] bg-white p-[2.4rem]">
        {Array.from({ length: 5 }).map((_, index) => (
          <RecentSearchItemSkeleton key={index} />
        ))}
      </div>
    );

  return (
    <>
      <div className="flex_col relative min-h-[20rem] rounded-[1.6rem] bg-white p-[2.4rem]">
        <button
          type="button"
          className="body_5 absolute right-0 top-[-3.3rem] font-medium text-grayscale-600 underline"
          onClick={handleAlertShow}
        >
          {t("allDeleteButton")}
        </button>
        {searchItems.length === 0 ? (
          <div className="flex_row_col flex-1 gap-2 rounded-lg bg-white">
            <WarningIcon />
            <p className="body_4 font-medium text-navy-900">{t("NoneRecentSearch")}</p>
          </div>
        ) : (
          <ul className="h-[18rem] w-full overflow-y-scroll scrollbar-hide">
            {searchItems.map((search) => (
              <SearchItem key={search.searchText} search={search} />
            ))}
          </ul>
        )}
      </div>

      {/* Alert 컴포넌트 */}
      {showAlert && (
        <Alert
          variant="fnButton"
          title={t("alert.alertTitle")}
          buttonText={t("alert.alertButtonText")}
          subButtonText={t("alert.alertCancleText")}
          onClick={handleDeleteSearch}
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
};

export default RecentSearches;

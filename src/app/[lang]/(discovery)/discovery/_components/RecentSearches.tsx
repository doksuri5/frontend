"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, startTransition, useCallback } from "react";
import SearchItem from "./SearchItem";
import { Alert } from "@/components/common";
import { SearchTextDataType } from "@/types/SearchDataType";
import { deleteRecentSearchTextList, getRecentSearches } from "@/actions/search";
import RecentSearchItemSkeleton from "./_skeleton/RecentSearchItemSkeleton";
import WarningIcon from "@/public/icons/warning_icon.svg?component";

const RecentSearches = () => {
  const t = useTranslations("discovery");
  const [showAlert, setShowAlert] = useState(false);
  const [searchItems, setSearchItems] = useState<SearchTextDataType[]>([]);
  const [isRendering, setIsRendering] = useState(false);

  useEffect(() => {
    const fetchRecentSearches = async () => {
      const response = await getRecentSearches();
      if (response.ok) setSearchItems(response.data);
    };

    startTransition(async () => {
      await fetchRecentSearches();
      setIsRendering(true);
    });
  }, []);

  // 전체 삭제
  const handleDeleteSearch = useCallback(async () => {
    if (searchItems.length !== 0) {
      try {
        await deleteRecentSearchTextList();
        setSearchItems([]);
      } catch (error) {
        console.error("Fetch Error", error);
      } finally {
        setShowAlert(false);
      }
    }
  }, [searchItems]);

  // Alert Show
  const handleAlertShow = useCallback(() => {
    if (searchItems.length !== 0) setShowAlert(true);
  }, [searchItems]);

  if (!isRendering)
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
        {isRendering && searchItems.length === 0 ? (
          <div className="flex_row_col flex-1 gap-2 rounded-lg bg-white">
            <WarningIcon />
            <p className="body_4 font-medium text-navy-900">{t("NoneRecentSearch")}</p>
          </div>
        ) : (
          <ul className="h-[18rem] w-full overflow-y-scroll scrollbar-hide">
            {searchItems.map((search) => (
              <SearchItem key={search.searchText} search={search} setSearchItems={setSearchItems} />
            ))}
          </ul>
        )}
      </div>

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

"use client";

import { useEffect, useState } from "react";

import DiscoverySection from "./DiscoverySection";
import SearchItem from "./SearchItem";
import RecentSearchItemSkeleton from "./_skeleton/RecentSearchItemSkeleton";

import { getRecentSearches } from "@/actions/recent";
import { SearchRecentDataType } from "@/types/RecentDataType";

import WarningIcon from "@/public/icons/warning_icon.svg?component";

const RecentSearches = () => {
  const [searchList, setSearchList] = useState<SearchRecentDataType[]>([]);
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const response = await getRecentSearches(undefined);
        if (response.ok) setSearchList(response.data);
      } catch (error) {
        console.error("Fetch Error", error);
      } finally {
        setIsRender(true);
      }
    };
    fetchRecent();
  }, []);

  const deleteSearchList = () => {};
  const deleteSearch = () => {};

  const subTag = (
    <button type="button" className="body_5 font-medium text-grayscale-600 underline" onClick={deleteSearchList}>
      전체삭제
    </button>
  );

  return (
    <DiscoverySection
      title="최근 검색어"
      subTag={searchList.length > 0 ? subTag : undefined}
      titleStyle="justify-between"
    >
      <div className="flex_col min-h-[20rem] rounded-[1.6rem] bg-white p-[2.4rem]">
        {!isRender ? (
          <ul className="w-full">
            {Array.from({ length: 6 }).map((_, idx) => (
              <RecentSearchItemSkeleton key={idx} />
            ))}
          </ul>
        ) : (
          <>
            {searchList.length !== 0 ? (
              <ul className="w-full">
                {searchList.map((search) => (
                  <SearchItem key={search.searchText} search={search} deleteSearch={deleteSearch} />
                ))}
              </ul>
            ) : (
              <div className="flex_row_col flex-1 gap-2 rounded-lg bg-white">
                <WarningIcon />
                <p className="body_4 font-medium text-navy-900">최근 조회한 종목이 없습니다.</p>
              </div>
            )}
          </>
        )}
      </div>
    </DiscoverySection>
  );
};
export default RecentSearches;

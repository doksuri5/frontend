"use client";

import { useEffect, useState } from "react";

import DiscoverySection from "./DiscoverySection";
import SearchItem from "./SearchItem";
import { Alert } from "@/components/common";
import RecentSearchItemSkeleton from "./_skeleton/RecentSearchItemSkeleton";

import { deleteRecentSearchTextList, deleteRecentSearchTextItem, getRecentSearches } from "@/actions/search";
import { SearchTextDataType } from "@/types/SearchDataType";

import WarningIcon from "@/public/icons/warning_icon.svg?component";

const RecentSearches = () => {
  const [searchList, setSearchList] = useState<SearchTextDataType[]>([]);
  const [isRender, setIsRender] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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

  // 알럿 켜기
  const handleAlertConfirm = async () => {
    setShowAlert(true);
  };

  // 삭제
  const handleDeleteSearch = async () => {
    try {
      const response = await deleteRecentSearchTextList();
      if (response.ok) setSearchList([]);
    } catch (error) {
      console.error("Fetch Error", error);
    } finally {
      setShowAlert(false);
    }
  };

  const handleDeleteSearchItem = async (search_text: string) => {
    try {
      const response = await deleteRecentSearchTextItem(undefined, { params: search_text });
      if (response.ok) setSearchList(response.data);
    } catch (error) {
      console.error("Fetch Error", error);
    } finally {
      setShowAlert(false);
    }
  };

  const subTag = (
    <button type="button" className="body_5 font-medium text-grayscale-600 underline" onClick={handleAlertConfirm}>
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
          <ul className="h-[18rem] w-full">
            {Array.from({ length: 5 }).map((_, idx) => (
              <RecentSearchItemSkeleton key={idx} />
            ))}
          </ul>
        ) : (
          <>
            {searchList.length !== 0 ? (
              <ul className="h-[18rem] w-full overflow-y-scroll scrollbar-hide">
                {searchList.map((search) => (
                  <SearchItem
                    key={search.searchText}
                    search={search}
                    deleteSearch={() => handleDeleteSearchItem(search.searchText)}
                  />
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

      {/* Alert 컴포넌트 */}
      {showAlert && (
        <Alert
          variant="fnButton"
          title="최근 검색어를 전부 삭제하시겠습니까?"
          buttonText="삭제하기"
          subButtonText="취소"
          onClick={handleDeleteSearch}
          onClose={() => setShowAlert(false)}
        />
      )}
    </DiscoverySection>
  );
};
export default RecentSearches;

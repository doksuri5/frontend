"use client";

import DiscoverySection from "./DiscoverySection";
import { SearchDataType } from "@/types";
import TimeIcon from "@/public/icons/time_icon.svg?component";
import CloseIcon from "@/public/icons/close_icon.svg?component";
import WarningIcon from "@/public/icons/warning_icon.svg?component";

const RecentSearches = () => {
  const deleteSearchList = () => {};
  const deleteSearch = () => {};

  const subTag = (
    <button type="button" className="body_5 font-medium text-grayscale-600 underline" onClick={deleteSearchList}>
      전체삭제
    </button>
  );

  const searchList: SearchDataType[] = [
    { id: "1", user_id: "", stock_name: "테슬라", stock_code: "", created_at: "06.14" },
    { id: "2", user_id: "", stock_name: "테슬라", stock_code: "", created_at: "06.14" },
    { id: "3", user_id: "", stock_name: "테슬라", stock_code: "", created_at: "06.14" },
    { id: "4", user_id: "", stock_name: "테슬라", stock_code: "", created_at: "06.14" },
    { id: "5", user_id: "", stock_name: "테슬라", stock_code: "", created_at: "06.14" },
    { id: "6", user_id: "", stock_name: "테슬라", stock_code: "", created_at: "06.14" },
    { id: "7", user_id: "", stock_name: "테슬라", stock_code: "", created_at: "06.14" },
  ];

  return (
    <DiscoverySection
      title="최근 검색어"
      subTag={searchList.length > 0 ? subTag : undefined}
      titleStyle="justify-between"
    >
      <div className="flex_col min-h-[20rem] rounded-[1.6rem] bg-white p-[2.4rem]">
        {searchList.length !== 0 ? (
          <ul className="w-full">
            {searchList.map((search) => (
              <li key={search.id} className="flex_row h-[4rem] w-full justify-between">
                <div className="flex_row gap-[.8rem]">
                  <TimeIcon width={24} height={24} fill="text-navy-900" />
                  <span className="body_4 font-medium text-grayscale-600">{search.stock_name}</span>
                </div>
                <div className="flex_row gap-[.8rem]">
                  <span className="body_5 text-grayscale-400">{search.created_at}</span>
                  <button type="button" onClick={deleteSearch}>
                    <CloseIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex_row_col flex-1 gap-2 rounded-lg bg-white">
            <WarningIcon />
            <p className="body_4 font-medium text-navy-900">최근 조회한 종목이 없습니다.</p>
          </div>
        )}
      </div>
    </DiscoverySection>
  );
};
export default RecentSearches;

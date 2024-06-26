"use client";

import DiscoverySection from "./DiscoverySection";
import TimeIcon from "@/public/icons/time_icon.svg?component";
import CloseIcon from "@/public/icons/close_icon.svg?component";

const RecentSearches = () => {
  const deleteSearchList = () => {};
  const deleteSearch = () => {};

  const subTag = (
    <button type="button" className={`body_5 font-medium text-grayscale-600 underline`} onClick={deleteSearchList}>
      전체삭제
    </button>
  );

  const searchList = [
    { idx: 1, stockName: "테슬라", data: "06.14" },
    { idx: 2, stockName: "테슬라", data: "06.14" },
    { idx: 3, stockName: "테슬라", data: "06.14" },
    { idx: 4, stockName: "테슬라", data: "06.14" },
    { idx: 5, stockName: "테슬라", data: "06.14" },
    { idx: 6, stockName: "테슬라", data: "06.14" },
    { idx: 7, stockName: "테슬라", data: "06.14" },
  ];

  return (
    <DiscoverySection title="최근 검색어" subTag={subTag} titleStyle="justify-between">
      <div className="flex_col rounded-[1.6rem] bg-white p-[2.4rem]">
        <ul className="w-full">
          {searchList.length !== 0 ? (
            searchList.map((search) => (
              <li key={search.idx} className="flex_row h-[4rem] w-full justify-between">
                <div className="flex_row gap-[.8rem]">
                  <TimeIcon width={24} height={24} fill="text-navy-900" />
                  <span className="body_4 font-medium text-grayscale-600">{search.stockName}</span>
                </div>
                <div className="flex_row gap-[.8rem]">
                  <span className="body_5 text-grayscale-400">{search.data}</span>
                  <button type="button" onClick={deleteSearch}>
                    <CloseIcon />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      </div>
    </DiscoverySection>
  );
};
export default RecentSearches;

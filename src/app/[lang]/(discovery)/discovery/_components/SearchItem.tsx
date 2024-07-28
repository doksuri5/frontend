"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import { deleteRecentSearchTextItem } from "@/actions/search";
import { SearchTextDataType } from "@/types/SearchDataType";
import TimeIcon from "@/public/icons/time_icon.svg?component";
import CloseIcon from "@/public/icons/close_icon.svg?component";

type TSearchItemProps = {
  search: SearchTextDataType;
};
const SearchItem = ({ search }: TSearchItemProps) => {
  const router = useRouter();

  const moveLink = (searchText: string) => {
    router.push(`/discovery/${searchText}`);
  };

  // 개별 삭제
  const handleDeleteSearchItem = async (searchText: string) => {
    try {
      await deleteRecentSearchTextItem(undefined, { params: searchText });
    } catch (error) {
      console.error("Fetch Error", error);
    }
  };

  return (
    <li className="flex_row h-[4rem] w-full justify-between">
      <div className="flex_row gap-[.8rem]">
        <TimeIcon width={24} height={24} fill="text-navy-900" />
        <span
          className="body_4 cursor-pointer font-medium text-grayscale-600"
          onClick={() => moveLink(search.searchText)}
        >
          {search.searchText}
        </span>
      </div>
      <div className="flex_row gap-[.8rem]">
        <span className="body_5 text-grayscale-400">{search.searchDate.split("T")[0].slice(5).replace("-", ".")}</span>
        <button type="button" onClick={() => handleDeleteSearchItem(search.searchText)}>
          <CloseIcon />
        </button>
      </div>
    </li>
  );
};

export default memo(SearchItem);

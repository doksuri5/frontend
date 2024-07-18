"use client";

import { memo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchTextDataType } from "@/types/SearchDataType";
import TimeIcon from "@/public/icons/time_icon.svg?component";
import CloseIcon from "@/public/icons/close_icon.svg?component";

const SearchItem = ({ search, deleteSearch }: { search: SearchTextDataType; deleteSearch: () => void }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const moveLink = (search: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", search);

    const newPath = `${pathname}?${params.toString()}`;
    router.push(newPath);
  };

  return (
    <li key={search.searchText} className="flex_row h-[4rem] w-full justify-between">
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
        <span className="body_5 text-grayscale-400">{search.searchDate.split("T")[0].slice(5)}</span>
        <button type="button" onClick={deleteSearch}>
          <CloseIcon />
        </button>
      </div>
    </li>
  );
};

export default memo(SearchItem);

import TimeIcon from "@/public/icons/time_icon.svg?component";
import CloseIcon from "@/public/icons/close_icon.svg?component";
import { SearchTextDataType } from "@/types/SearchDataType";

const SearchItem = ({ search, deleteSearch }: { search: SearchTextDataType; deleteSearch: () => void }) => {
  return (
    <li key={search.searchText} className="flex_row h-[4rem] w-full justify-between">
      <div className="flex_row gap-[.8rem]">
        <TimeIcon width={24} height={24} fill="text-navy-900" />
        <span className="body_4 font-medium text-grayscale-600">{search.searchText}</span>
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

export default SearchItem;

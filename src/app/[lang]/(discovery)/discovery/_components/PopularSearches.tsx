import { PopularSearchesNameDataType } from "@/types/SearchDataType";

const PopularSearches = ({ popularSearches }: { popularSearches: PopularSearchesNameDataType[] }) => {
  return (
    <div className="flex_col rounded-[1.6rem] bg-white p-[2.4rem]">
      <div className="grid w-full grid-flow-col grid-rows-5 gap-4">
        {popularSearches.map((popular, index) => (
          <div key={popular.stockName} className={`flex_row h-[4rem] w-[26.3rem] gap-[1.6rem]`}>
            <span className="body_4 w-[1.8rem] font-medium text-navy-900">{index + 1}</span>
            <span className="body_4 w-full truncate font-medium text-grayscale-600">{popular.stockName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSearches;

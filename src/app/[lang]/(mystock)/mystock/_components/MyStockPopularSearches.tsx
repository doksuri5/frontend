import Image from "next/image";
import { PopularDetailDataType } from "@/types";
import { formatValueWithIndicator, formatValueWithSign, getTextColor } from "@/utils/stockPriceUtils";
import Apple_icon from "@/public/icons/Apple_icon.svg";

const popularList: PopularDetailDataType[] = [
  {
    _id: "1",
    rank: 1,
    icon: Apple_icon,
    stockName: "애플",
    symbolCode: "AAPL",
    compareToPreviousClosePrice: 1.75,
    fluctuationsRatio: 0.82,
  },
  {
    _id: "2",
    rank: 2,
    icon: Apple_icon,
    stockName: "테슬라",
    symbolCode: "AAPL",
    compareToPreviousClosePrice: 1.75,
    fluctuationsRatio: 0.82,
  },
  {
    _id: "3",
    rank: 3,
    icon: Apple_icon,
    stockName: "아마존",
    symbolCode: "AAPL",
    compareToPreviousClosePrice: 1.75,
    fluctuationsRatio: 0.82,
  },
  {
    _id: "4",
    rank: 4,
    icon: Apple_icon,
    stockName: "MS",
    symbolCode: "AAPL",
    compareToPreviousClosePrice: 1.75,
    fluctuationsRatio: 0.82,
  },
  {
    _id: "5",
    rank: 5,
    icon: Apple_icon,
    stockName: "구글",
    symbolCode: "AAPL",
    compareToPreviousClosePrice: 1.75,
    fluctuationsRatio: 0.82,
  },
  {
    _id: "6",
    rank: 6,
    icon: Apple_icon,
    stockName: "유니티",
    symbolCode: "AAPL",
    compareToPreviousClosePrice: 1.75,
    fluctuationsRatio: 0.82,
  },
];

const MyStockPopularSearches = () => {
  return (
    <div className="flex flex-col gap-[1.6rem]">
      <h3 className="body_3 font-medium text-navy-900">인기 검색어</h3>
      <div className="grid w-full grid-flow-col grid-rows-5 gap-[2.4rem] rounded-[1.6rem] border border-navy-100 p-[2.4rem]">
        {popularList.map((popular) => (
          <div key={popular._id} className={`flex_row h-[4rem] justify-between gap-[1.6rem]`}>
            <div className="flex_row">
              <span className="body_4 w-[1.8rem] font-medium text-navy-900">{popular.rank}</span>
              <Image
                src={popular.icon as string}
                alt="아이콘"
                width={32}
                height={32}
                className="ml-[1.6rem] mr-[.8rem]"
              />
              <span className="body_4 w-full truncate font-medium text-grayscale-600">{popular.stockName}</span>
            </div>
            <div>
              <span className={`${getTextColor(popular.compareToPreviousClosePrice)}`}>
                {formatValueWithIndicator(popular.compareToPreviousClosePrice)}
              </span>
              <span className={`${getTextColor(popular.fluctuationsRatio)}`}>
                {formatValueWithSign(popular.fluctuationsRatio) + "%"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyStockPopularSearches;

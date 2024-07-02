import SearchItem from "@/app/[lang]/(mystock)/mystock/_components/SearchItem";
import Apple_icon from "@/public/icons/Apple_icon.svg";

type TMyStockSearchResultProps = {
  value: string;
};
const MyStockSearchResult = ({ value }: TMyStockSearchResultProps) => {
  // server action으로 value값으로 검색 한 결과 값 fetching으로 가져오기 (지금은 임시 데이터)
  const searchData = [
    {
      _id: "1",
      icon: Apple_icon,
      stockName: "애플",
      symbolCode: "AAPL",
      price: 0,
      nationType: "USA",
      compareToPreviousClosePrice: 1.75,
      fluctuationsRatio: 0.82,
    },
    {
      _id: "2",
      icon: Apple_icon,
      stockName: "마이크로소프트",
      symbolCode: "AAPL",
      price: 0,
      nationType: "USA",
      compareToPreviousClosePrice: -1.75,
      fluctuationsRatio: -0.82,
    },
  ];

  const filterList = searchData.filter((data) => data.stockName.includes(value));

  return (
    <div className="flex flex-col gap-[1.6rem]">
      <h3 className="body_3 font-medium text-navy-900">검색 결과</h3>
      <div className="flex_col gap-[1.6rem]">
        {filterList && filterList.map((data) => <SearchItem key={data._id} data={data} />)}
      </div>
    </div>
  );
};

export default MyStockSearchResult;

import { MyStockHeader, MyStockBody, MyStockModalSection } from "@/app/(mystock)/mystock/_components";
import { SearchDetailDataType, StockDataType } from "@/types";
import Apple_icon from "@/public/icons/Apple_icon.svg";

//
const stockList: StockDataType[] = [
  {
    _id: "1",
    icon: Apple_icon,
    stockName: "애플",
    symbolCode: "AAPL",
    price: 0.0,
    nationType: "USA",
    compareToPreviousClosePrice: 1.75,
    fluctuationsRatio: 0.82,
  },
  {
    _id: "2",
    icon: Apple_icon,
    stockName: "애플",
    symbolCode: "AAPL",
    price: 0.0,
    nationType: "USA",
    compareToPreviousClosePrice: -1.75,
    fluctuationsRatio: -0.82,
  },
  {
    _id: "3",
    icon: Apple_icon,
    stockName: "애플",
    symbolCode: "AAPL",
    price: 0.0,
    nationType: "USA",
    compareToPreviousClosePrice: -1.75,
    fluctuationsRatio: -0.82,
  },
  {
    _id: "4",
    icon: Apple_icon,
    stockName: "애플",
    symbolCode: "AAPL",
    price: 0.0,
    nationType: "USA",
    compareToPreviousClosePrice: -1.75,
    fluctuationsRatio: -0.82,
  },
  {
    _id: "5",
    icon: Apple_icon,
    stockName: "애플",
    symbolCode: "AAPL",
    price: 0.0,
    nationType: "USA",
    compareToPreviousClosePrice: -1.75,
    fluctuationsRatio: -0.82,
  },
  {
    _id: "6",
    icon: Apple_icon,
    stockName: "애플",
    symbolCode: "AAPL",
    price: 0.0,
    nationType: "USA",
    compareToPreviousClosePrice: -1.75,
    fluctuationsRatio: -0.82,
  },
];

// db에서 유저 이름 가져오기
const userName = "김스팩";

// 최근 검색어 데이터 fetching
// 최근 검색어 데이터를 db에서 가져오고
// 네이버 주식 api 데이터를 가져와서
// symbolCode에 맞게 병합 처리 후 클라이언트로 보내기
const recentSearchList: SearchDetailDataType[] = [
  {
    _id: "1",
    user_id: "",
    icon: Apple_icon,
    stockName: "애플",
    symbolCode: "AAPL",
    price: 0.0,
    nationType: "USA",
    compareToPreviousClosePrice: 1.75,
    fluctuationsRatio: 0.82,
    created_at: "06.14",
  },
];

export default function MyStockPage() {
  const data = stockList;

  return (
    <>
      <MyStockHeader userName={userName} />
      <MyStockBody dataList={data} />
      <MyStockModalSection dataList={data} recentSearchList={recentSearchList} />
    </>
  );
}

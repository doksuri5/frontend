import { MyStockHeader, MyStockBody, MyStockModalSection } from "@/app/[lang]/(mystock)/mystock/_components";
import { SearchDetailDataType, StockDataType } from "@/types";
import { ApiResponse } from "@/types/ResponseType";
import { RecentSearchSchema } from "@/types/SearchDataType";
import { StockSchema } from "@/types/StockDataType";

// db에서 유저 이름 가져오기
const userName = "김스팩";

// 최근 검색어 데이터 fetching
// 최근 검색어 데이터를 db에서 가져오고
// 네이버 주식 api 데이터를 가져와서
// symbolCode에 맞게 병합 처리 후 클라이언트로 보내기
const getStocks = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/interest/getDetailInterestStocks`, {
    cache: "no-cache",
  });

  const data = await res.json();

  return ApiResponse(StockSchema).safeParse(data).data;
};

const getRecentSearchList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getRecentSearches`, {
    cache: "no-cache",
  });

  const data = await res.json();

  return ApiResponse(RecentSearchSchema).safeParse(data).data;
};

export default async function MyStockPage() {
  const stocksData = (await getStocks())?.data;
  const recentSearchedData = (await getRecentSearchList())?.data;

  return (
    <>
      <MyStockHeader userName={userName} />
      <MyStockBody dataList={stocksData ?? []} />
      <MyStockModalSection dataList={stocksData ?? []} recentSearchList={recentSearchedData ?? []} />
    </>
  );
}

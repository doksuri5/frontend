import { getDetailInterestStocks, getRecentSearchDetails } from "@/actions/stock";
import { MyStockHeader, MyStockBody, MyStockModalSection } from "@/app/[lang]/(mystock)/mystock/_components";

// db에서 유저 이름 가져오기
const userName = "김스팩";

// 최근 검색어 데이터 fetching
// 최근 검색어 데이터를 db에서 가져오고
// 네이버 주식 api 데이터를 가져와서
// symbolCode에 맞게 병합 처리 후 클라이언트로 보내기

export default async function MyStockPage() {
  const stocksData = (await getDetailInterestStocks()).data;
  const recentSearchedData = (await getRecentSearchDetails()).data;

  return (
    <>
      <MyStockHeader userName={userName} />
      <MyStockBody dataList={stocksData ?? []} />
      <MyStockModalSection dataList={stocksData ?? []} recentSearchList={recentSearchedData ?? []} />
    </>
  );
}

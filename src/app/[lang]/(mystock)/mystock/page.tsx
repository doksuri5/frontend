import { getDetailInterestStocks, getRecentSearchDetails } from "@/actions/stock";
import { MyStockHeader, MyStockBody, MyStockModalSection } from "@/app/[lang]/(mystock)/mystock/_components";
import { auth } from "@/auth";

const getDetailMyStocks = async () => {
  const stocksData = await getDetailInterestStocks();
  const recentSearchedData = await getRecentSearchDetails();

  return {
    stocksData: stocksData.data,
    recentSearchedData: recentSearchedData.data,
  };
};

export default async function MyStockPage() {
  const session = await auth();
  const { stocksData = [], recentSearchedData = [] } = await getDetailMyStocks();

  return (
    <>
      <MyStockHeader userName={session?.user.name ?? "김스팩"} />
      <MyStockBody dataList={stocksData} />
      <MyStockModalSection dataList={stocksData} recentSearchList={recentSearchedData} />
    </>
  );
}

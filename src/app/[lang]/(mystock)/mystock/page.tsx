import dynamic from "next/dynamic";
import { MyStockHeader, MyStockModalSection } from "@/app/[lang]/(mystock)/mystock/_components";
import MyStockBodySkeleton from "./_components/_skeleton/MyStockBodySkeleton";
import { getDetailInterestStocks, getRecentSearchDetails } from "@/actions/stock";
import { StockDataType } from "@/types";
import { auth } from "@/auth";

const MyStockBody = dynamic(() => import("@/app/[lang]/(mystock)/mystock/_components/MyStockBody"), {
  ssr: false,
  loading: () => <MyStockBodySkeleton />,
});

export default async function MyStockPage() {
  const session = await auth();

  const [stocksDataResult, recentSearchedDataResult] = await Promise.allSettled([
    getDetailInterestStocks(),
    getRecentSearchDetails(),
  ]);

  const stocksData: StockDataType[] =
    stocksDataResult.status === "fulfilled" && stocksDataResult.value.ok ? stocksDataResult.value.data : [];
  const recentSearchedData: StockDataType[] =
    recentSearchedDataResult.status === "fulfilled" && recentSearchedDataResult.value.ok
      ? recentSearchedDataResult.value.data
      : [];

  return (
    <>
      <MyStockHeader userName={session?.user.name ?? "김스팩"} />
      <MyStockBody dataList={stocksData} />
      <MyStockModalSection dataList={stocksData} recentSearchList={recentSearchedData} />
    </>
  );
}

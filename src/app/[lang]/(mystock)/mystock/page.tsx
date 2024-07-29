import dynamic from "next/dynamic";
import { MyStockHeader } from "@/app/[lang]/(mystock)/mystock/_components";
import MyStockBodySkeleton from "./_components/_skeleton/MyStockBodySkeleton";
import { getDetailInterestStocks } from "@/actions/stock";
import { StockDataType } from "@/types";
import { auth } from "@/auth";

const MyStockBody = dynamic(() => import("@/app/[lang]/(mystock)/mystock/_components/MyStockBody"), {
  ssr: false,
  loading: () => <MyStockBodySkeleton />,
});

const MyStockModalServer = dynamic(() => import("@/app/[lang]/(mystock)/mystock/_components/MyStockModalServer"), {
  ssr: false,
});

export default async function MyStockPage() {
  const session = await auth();

  const stocksDataResult = await getDetailInterestStocks();
  const stocksData: StockDataType[] = stocksDataResult.ok ? stocksDataResult.data : [];

  const isData = stocksData.length === 0;

  return (
    <>
      <MyStockHeader userName={session?.user.name ?? "김스팩"} />
      <MyStockBody dataList={stocksData} />
      <MyStockModalServer isData={isData} />
    </>
  );
}

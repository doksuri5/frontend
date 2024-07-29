import dynamic from "next/dynamic";
import { MyStockBodySkeleton, MyStockHeader } from "@/app/[lang]/(mystock)/mystock/_components";
import { getDetailInterestStocks } from "@/actions/stock";
import { StockDataType } from "@/types";
import { auth } from "@/auth";

const MyStockBody = dynamic(() => import("@/app/[lang]/(mystock)/mystock/_components/MyStockBody"), {
  ssr: true,
  loading: () => <MyStockBodySkeleton />,
});

const ModalContainer = dynamic(() => import("@/app/[lang]/(mystock)/mystock/_components/_modal/ModalContainer"), {
  ssr: false,
});

export default async function MyStockPage() {
  const session = await auth();

  const stocksDataResult = await getDetailInterestStocks();
  const stocksData: StockDataType[] = stocksDataResult.ok ? stocksDataResult.data : [];

  return (
    <>
      <MyStockHeader userName={session?.user.name ?? "김스팩"} />
      <MyStockBody dataList={stocksData} />
      <ModalContainer isData={stocksData.length === 0} />
    </>
  );
}

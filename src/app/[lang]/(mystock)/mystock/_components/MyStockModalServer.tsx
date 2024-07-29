import { getPopularSearches, getRecentSearchDetails } from "@/actions/stock";
import { StockDataType, StockPopularSearchDataType } from "@/types/StockDataType";
import ModalContainer from "./_modal/ModalContainer";

export default async function MyStockModalServer({ isData }: { isData: boolean }) {
  // const [popularDataResult, recentSearchedDataResult] = await Promise.allSettled([
  //   getPopularSearches(),
  //   getRecentSearchDetails(),
  // ]);

  // const popularData: StockPopularSearchDataType[] =
  //   popularDataResult.status === "fulfilled" && popularDataResult.value.ok ? popularDataResult.value.data : [];
  // const recentSearchedData: StockDataType[] =
  //   recentSearchedDataResult.status === "fulfilled" && recentSearchedDataResult.value.ok
  //     ? recentSearchedDataResult.value.data
  //     : [];

  return <ModalContainer isData={isData} />;
}

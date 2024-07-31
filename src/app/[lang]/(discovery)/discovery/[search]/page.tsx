import { DiscoveryNews, DiscoveryStocks } from "./_components";
import { DiscoverySection } from "../_components";
import { saveRecentSearch } from "@/actions/stock";
import { getSearchStocks } from "@/actions/search";
import { getSearchNews } from "@/actions/news";
import { StockDataType } from "@/types";
import { SearchStockNewsDataType } from "@/types/NewsDataType2";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function page({ params }: { params: { search: string; lang: string } }) {
  unstable_setRequestLocale(params.lang);
  const [stockListResult, newsListResult] = await Promise.allSettled([
    getSearchStocks(undefined, { params: decodeURIComponent(params.search) }),
    getSearchNews(undefined, { params: decodeURIComponent(params.search) }),
    saveRecentSearch({ stockName: decodeURIComponent(params.search) }),
  ]);

  const stockList: StockDataType[] =
    stockListResult.status === "fulfilled" && stockListResult.value.ok ? stockListResult.value.data : [];
  const newsList: SearchStockNewsDataType[] =
    newsListResult.status === "fulfilled" && newsListResult.value.ok ? newsListResult.value.data : [];

  return (
    <>
      <DiscoverySection
        titleKey="searchStockTitle"
        subTag={<span className={`body_5 font-medium text-grayscale-600`}>{`(${stockList.length})`}</span>}
        sectionStyle="min-h-[15rem]"
      >
        <DiscoveryStocks stockList={stockList} />
      </DiscoverySection>
      <DiscoverySection
        titleKey="searchNewsTitle"
        subTag={<span className={`body_5 font-medium text-grayscale-600`}>{`(${newsList.length})`}</span>}
        sectionStyle="min-h-[65rem]"
      >
        <DiscoveryNews newsList={newsList} />
      </DiscoverySection>
    </>
  );
}

import { publicFetchApi } from "@/lib/public-api";
import { SearchStockNewsSchema, SearchStockNewsDataType } from "@/types/NewsDataType2";

export const getSearchNews = publicFetchApi.get({
  endpoint: "/news/getSearchNews",
  responseSchema: SearchStockNewsSchema,
})<undefined, SearchStockNewsDataType>;

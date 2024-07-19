"use server";

import { api } from "@/lib/api";
import { SearchStockNewsSchema, SearchStockNewsDataType } from "@/types/NewsDataType2";

export const getSearchNews = api.get({
  endpoint: `/news/getSearchNews`,
  responseSchema: SearchStockNewsSchema,
})<undefined, SearchStockNewsDataType>;

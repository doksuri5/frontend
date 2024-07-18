"use server";

import { api } from "@/lib/api";
import { z } from "zod";

import { SearchTextSchema, SearchTextDataType } from "@/types/SearchDataType";
import { StockSchema, StockDataType } from "@/types/StockDataType";

export type TRecentTags = "/getRecentSearches";

export const getRecentSearches = api.get({
  endpoint: `/getRecentSearches`,
  responseSchema: SearchTextSchema,
})<undefined, SearchTextDataType>;

export const getSearchStocks = api.get({
  endpoint: `/getSearchStocks`,
  responseSchema: StockSchema,
})<undefined, StockDataType>;

"use server";

import { api } from "@/lib/api";
import { z } from "zod";

import {
  SearchTextSchema,
  SearchTextDataType,
  PopularSearchesNameSchema,
  PopularSearchesNameDataType,
} from "@/types/SearchDataType";
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

export const getPopularSearchesName = api.get({
  endpoint: `/getPopularSearchesName`,
  responseSchema: PopularSearchesNameSchema,
  baseOptions: {
    next: {
      revalidate: 60, // 1분 주기로 조회
    },
  },
})<undefined, PopularSearchesNameDataType>;

export const deleteRecentSearchTextList = api.delete({
  endpoint: "/deleteRecentSearchTextList",
  responseSchema: SearchTextSchema,
  baseOptions: {
    revalidateTags: ["/getRecentSearches"],
  },
})<undefined, SearchTextDataType>;

export const deleteRecentSearchTextItem = api.delete({
  endpoint: "/deleteRecentSearchTextItem",
  responseSchema: SearchTextSchema,
  baseOptions: {
    revalidateTags: ["/getRecentSearches"],
  },
})<undefined, SearchTextDataType>;

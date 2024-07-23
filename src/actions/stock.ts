"use server";

import { api } from "@/lib/api";
import { z } from "zod";

import {
  InterestStockItemDataType,
  InterestStockItemSchema,
  PopularSearchSchema,
  PostInterestStockSchema,
  PostRecentSearchSchema,
  StockChartDataSchema,
  StockChartDataType,
  StockDataType,
  StockPopularSearchDataType,
  StockSchema,
} from "@/types/StockDataType";

export type TStockTags =
  | "/interest/getDetailInterestStocks"
  | "/getRecentSearchDetails"
  | "/getPopularSearches"
  | "/saveRecentSearch"
  | "/deleteRecentSearches"
  | "/interest/insertInterestStock"
  | "/interest/deleteInterestStock"
  | "/news/getSearchNews"
  | "/getSearchStocks";

// 주식 종목 리스트 가져오기
export const getStocks = api.get({
  endpoint: "/stocks",
  responseSchema: StockSchema,
})<undefined, StockDataType, true>;

export const getStocksByReutersCode = api.get({
  endpoint: "/stocks",
  responseSchema: StockSchema,
  baseOptions: {
    isDataArray: false,
  },
})<undefined, StockDataType, false>;

// 주식 종목 전체 리스트 가져오기
export const getDetailInterestStocks = api.get({
  endpoint: "/interest/getDetailInterestStocks",
  responseSchema: StockSchema,
})<undefined, StockDataType>;

// 최근 검색 리스트 상세 가져오기
export const getRecentSearchDetails = api.get({
  endpoint: "/getRecentSearchDetails",
  responseSchema: StockSchema,
})<undefined, StockDataType>;

// 인기 검색어 리스트 가져오기
export const getPopularSearches = api.get({
  endpoint: "/getPopularSearches",
  responseSchema: PopularSearchSchema,
})<undefined, StockPopularSearchDataType>;

// 최근 검색어 추가
export const saveRecentSearch = api.patch({
  endpoint: "/saveRecentSearch",
  requestSchema: PostRecentSearchSchema,
  responseSchema: StockSchema,
  baseOptions: {
    revalidateTags: ["/getRecentSearchDetails", "/news/getSearchNews", "/getSearchStocks"],
  },
})<z.infer<typeof PostRecentSearchSchema>, StockDataType>;

// 최근 검색어 삭제
export const deleteRecentSearch = api.delete({
  endpoint: "/deleteRecentSearches",
  responseSchema: StockSchema,
  baseOptions: {
    revalidateTags: ["/getRecentSearchDetails"],
  },
})<undefined, StockDataType>;

// 관심 종목 추가
export const insertInterestStock = api.post({
  endpoint: "/interest/insertInterestStock",
  requestSchema: PostInterestStockSchema,
  responseSchema: InterestStockItemSchema,
  baseOptions: {
    revalidateTags: ["/interest/getDetailInterestStocks"],
  },
})<z.infer<typeof PostInterestStockSchema>, StockDataType>;

// 관심 종목 삭제
export const deleteInterestStock = api.delete({
  endpoint: "/interest/deleteInterestStock",
  requestSchema: PostInterestStockSchema,
  responseSchema: InterestStockItemSchema,
  baseOptions: {
    revalidateTags: ["/interest/getDetailInterestStocks"],
  },
})<z.infer<typeof PostInterestStockSchema>, InterestStockItemDataType>;

export const getStockChartData = api.get({
  endpoint: "/stocks",
  responseSchema: StockChartDataSchema,
  baseOptions: {
    isFetchFromRouteHandler: true,
    next: {
      revalidate: 60,
    },
  },
})<undefined, StockChartDataType>;

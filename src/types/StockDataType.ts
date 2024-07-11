import { z } from "zod";
import camelcaseKeys from "camelcase-keys";

import { REUTERS_CODES } from "@/constants/stockCodes";
export const StockSchema = z
  .object({
    _id: z.string(),
    reuters_code: z.enum(REUTERS_CODES),
    symbol_code: z.string(),
    stock_name: z.string(),
    stock_name_eng: z.string(),
    close_price: z.number().nonnegative("Close Price must be a positive number"),
    nation_type: z.string(),
    compare_to_previous_close_price: z
      .number()
      .nonnegative("Comparison to Previous Close Price must be a positive number"),
    fluctuations_ratio: z.number().nonnegative("Fluctuations Ratio must be a positive number"),
    market_price: z.number().nonnegative().default(0),
    investment_index: z.number().nonnegative().default(0),
    profitability: z.number().nonnegative().default(0),
    growth_rate: z.number().nonnegative().default(0),
    interest_rate: z.number().nonnegative().default(0),
  })
  .required({
    _id: true,
    reuters_code: true,
    symbol_code: true,
    stock_name: true,
    stock_name_eng: true,
    close_price: true,
    nation_type: true,
    compare_to_previous_close_price: true,
    fluctuations_ratio: true,
  })
  .transform((data) => camelcaseKeys(data, { deep: true }));

export type StockDataType = z.infer<typeof StockSchema>;

export interface StockDetailDataType extends StockDataType {
  stockCode: string;
  priceUSD: number;
  description: string;
  score: number;
  isMyStock: boolean;
  aiReport: string;
}
export interface StockAIReportDataType {
  investmentIndex: number;
  profitability: number;
  growthPercentage: number;
  interestPercentage: number;
  metrics: {
    companyName: string;
    ROE: number;
    PER: number;
    forwardPER: number;
    dividendYield: number;
    currentPriceRatio: number;
    currentPrice: number;
  };
}

import { z } from "zod";
import { REUTERS_CODES } from "@/constants/stockCodes";

export const StockSchema = z
  .object({
    id: z.string(),
    reutersCode: z.enum(REUTERS_CODES),
    symbolCode: z.string(),
    stockName: z.string(),
    stockNameEng: z.string(),
    closePrice: z.number().nonnegative("Close Price must be a positive number"),
    nationType: z.string(),
    compareToPreviousClosePrice: z.number(),
    fluctuationsRatio: z.number(),
    marketPrice: z.number().default(0),
    investmentIndex: z.number().default(0),
    profitability: z.number().default(0),
    growthRate: z.number().default(0),
    interestRate: z.number().default(0),
  })
  .required({
    id: true,
    reutersCode: true,
    symbolCode: true,
    stockName: true,
    stockNameEng: true,
    closePrice: true,
    nationType: true,
    compareToPreviousClosePrice: true,
    fluctuationsRatio: true,
  });

export const StockAIReportSchema = z.object({
  investmentIndex: z.number().default(0),
  profitability: z.number().default(0),
  growthPercentage: z.number().default(0),
  interestPercentage: z.number().default(0),
  metrics: z.object({
    companyName: z.string(),
    roe: z.number().default(0),
    per: z.number().default(0),
    forwardPer: z.number().default(0),
    dividendYield: z.number().default(0),
    currentPriceRatio: z.number().default(0),
    currentPrice: z.number().default(0),
  }),
});
export const InterestStockItemSchema = z.object({
  reutersCode: z.enum(REUTERS_CODES),
  order: z.number(),
  createdAt: z.string(),
  updatedAt: z.string().nullable().default(null),
});

export const InterestStockSchema = z.object({
  userSnsId: z.string(),
  userEmail: z.string(),
  isDelete: z.boolean().default(false),
  stockList: InterestStockItemSchema.array(),
});

export const RecentSearchBaseSchema = z.object({
  id: z.string(),
  stockName: z.string(),
  isDelete: z.boolean().default(false),
  searchDate: z.string(),
});

export const PostRecentSearchSchema = RecentSearchBaseSchema.pick({ stockName: true });
export const PostInterestStockSchema = StockSchema.pick({ reutersCode: true });
export const PopularSearchSchema = z.object({
  id: z.string(),
  stockName: z.string(),
  count: z.number().default(0),
  reutersCode: z.enum(REUTERS_CODES),
  closePrice: z.number().default(0),
  compareToPreviousClosePrice: z.number().default(0),
  fluctuationsRatio: z.number().default(0),
});

export type InterestStockDataType = z.infer<typeof InterestStockSchema>;
export type InterestStockItemDataType = z.infer<typeof InterestStockItemSchema>;

export type StockDataType = z.infer<typeof StockSchema>;
export type StockAIReportDataType = z.infer<typeof StockAIReportSchema>;
export type StockPopularSearchDataType = z.infer<typeof PopularSearchSchema>;

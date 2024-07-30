import { z } from "zod";
import { REUTERS_CODES } from "@/constants/stockCodes";

export const FetchedNaverStockSchema = z.object({
  stockEndType: z.literal("stock"),
  reutersCode: z.string(),
  stockName: z.string(),
  stockNameEng: z.string(),
  symbolCode: z.string(),
  tradeStopType: z.object({
    code: z.string(),
    text: z.string(),
    name: z.string(),
  }),
  stockExchangeType: z.object({
    code: z.string(),
    zoneId: z.string(),
    nationType: z.string(),
    delayTime: z.number(),
    startTime: z.string(),
    endTime: z.string(),
    closePriceSendTime: z.string(),
    nameKor: z.string(),
    nameEng: z.string(),
    name: z.string(),
    nationName: z.string(),
    stockType: z.string(),
    nationCode: z.string(),
  }),
  stockExchangeName: z.string(),
  industryCodeType: z.object({
    code: z.string(),
    industryGroupKor: z.string(),
    name: z.string(),
  }),
  delayTime: z.number(),
  delayTimeName: z.string(),
  compareToPreviousPrice: z.object({
    code: z.string(),
    text: z.string(),
    name: z.string(),
  }),
  closePrice: z.string(),
  compareToPreviousClosePrice: z.string(),
  fluctuationsRatio: z.string(),
  localTradedAt: z.string(),
  marketStatus: z.string(),
  overMarketPriceInfo: z.null(),
  imageCharts: z.object({
    areaYearThree: z.string(),
    areaMonthThree: z.string(),
    candleDay: z.string(),
    day: z.string(),
    day_up_tablet: z.string(),
    areaYear: z.string(),
    transparent: z.string(),
    day_up: z.string(),
    candleWeek: z.string(),
    candleMonth: z.string(),
    areaYearTen: z.string(),
  }),
  scriptChartTypes: z.array(z.string()),
  currencyType: z.object({
    code: z.string(),
    text: z.string(),
    name: z.string(),
  }),
  countOfListedStock: z.number(),
  indexOrEtfToolTip: z.null(),
  endUrl: z.string(),
  chartIqEndUrl: z.string(),
  stockItemTotalInfos: z.array(
    z.object({
      code: z.string(),
      key: z.string(),
      value: z.string(),
      keyDesc: z.string().optional(),
      compareToPreviousPrice: z
        .object({
          code: z.string(),
          text: z.string(),
          name: z.string(),
        })
        .optional(),
    }),
  ),
  etfThemaInfos: z.null(),
  isEtf: z.boolean(),
  isEtfAmerica: z.boolean(),
  isFinanceSummary: z.boolean(),
  hasNews: z.boolean(),
  researchs: z.array(z.unknown()),
  nationType: z.string(),
  nationName: z.string(),
  newlyListed: z.boolean(),
  stockEndUrl: z.string(),
  marketOperatingTimeInfo: z.object({
    zoneId: z.string(),
    zoneName: z.string(),
    isDst: z.boolean(),
    preMarketOpeningTime: z.string(),
    preMarketClosingTime: z.string(),
    regularMarketOpeningTime: z.string(),
    regularMarketClosingTime: z.string(),
    afterMarketOpeningTime: z.string(),
    afterMarketClosingTime: z.string(),
  }),
  exchangeOperatingTime: z.boolean(),
});

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

const translationsSchema = z.object({
  ko: z.string(),
  en: z.string(),
  jp: z.string(),
  ch: z.string(),
  fr: z.string(),
});

export const StockAIReportSchema = z.object({
  description: translationsSchema,
  investmentIndex: z.number().default(0),
  profitabilityPercentage: z.number().default(0),
  growthPercentage: z.number().default(0),
  interestPercentage: z.number().default(0),
  report: translationsSchema,
  metrics: z.object({
    stockName: z.string(),
    symbolCode: z.string(),
    fluctuationsRatio: z.number().default(0),
    closePriceChange: z.number().default(0),
    closePrice: z.number().default(0),
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

export const StockChartDataSchema = z.object({
  localDate: z.string(),
  closePrice: z.number(),
  openPrice: z.number(),
  highPrice: z.number(),
  lowPrice: z.number(),
  accumulatedTradingVolume: z.number(),
});

export const StockPriceSchema = z.object({
  symbolCode: z.string(),
  closePrice: z.number(),
  fluctuationsRatio: z.number(),
  compareToPreviousClosePrice: z.number(),
});

export const StockOverViewSchema = z.object({
  corporateOverview: z.string(),
  summaries: z.object({
    summary: z.string(),
    representativeName: z.string(),
    representativeId: z.string(),
    nation: z.string(),
    employees: z.number(),
    employeesLastUpdated: z.string(),
    city: z.string(),
    address: z.string(),
    url: z.string(),
  }),
});

export const StockCurrencyExchangeSchema = z.object({
  nation: z.enum(["KRW", "USD", "JPY(100)", "EUR", "CNH"]),
  rate: z.string(),
});

export type ExchangeDataType = {
  result: number;
  cur_unit: string;
  ttb: string;
  tts: string;
  deal_bas_r: string;
  bkpr: string;
  yy_efee_r: string;
  ten_dd_efee_r: string;
  kftc_bkpr: string;
  kftc_deal_bas_r: string;
  cur_nm: string;
};

export type FetchedNaverStockDataType = z.infer<typeof FetchedNaverStockSchema>;
export type InterestStockDataType = z.infer<typeof InterestStockSchema>;
export type InterestStockItemDataType = z.infer<typeof InterestStockItemSchema>;
export type StockChartDataType = z.infer<typeof StockChartDataSchema>;
export type StockPriceDataType = z.infer<typeof StockPriceSchema>;
export type StockOverViewDataType = z.infer<typeof StockOverViewSchema>;

export type StockDataType = z.infer<typeof StockSchema>;
export type StockAIReportDataType = z.infer<typeof StockAIReportSchema>;
export type StockPopularSearchDataType = z.infer<typeof PopularSearchSchema>;

export type StockCurrencyExchangeDataType = z.infer<typeof StockCurrencyExchangeSchema>;

"use server";

import { api } from "@/lib/api";
import { StockAIReportDataType, StockAIReportSchema } from "@/types/StockDataType";

export const getStockAnalysis = api.get({
  endpoint: "/report/stock-analysis",
  responseSchema: StockAIReportSchema,
  baseOptions: {
    isFetchFromRouteHandler: true,
    next: {
      revalidate: 3600 * 3,
    },
  },
})<undefined, StockAIReportDataType>;

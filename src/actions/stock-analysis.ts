"use server";

import { StockAIReportDataType } from "@/types/StockDataType";

const getStockAnalysis = async (code: string): Promise<StockAIReportDataType> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/report/stock-analysis/${code}`);
  const data = await response.json();

  return data;
};

export default getStockAnalysis;

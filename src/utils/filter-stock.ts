import { hangulIncludes } from "es-hangul";
import { STOCK_NAMES, TReutersCodes } from "@/constants/stockCodes";

const VARIOUS_STOCK_TO_REUTERS_CODE: { [key: string]: TReutersCodes } = {
  애플: "AAPL.O",
  마이크로소프트: "MSFT.O",
  구글: "GOOGL.O",
  알파벳: "GOOGL.O",
  아마존: "AMZN.O",
  테슬라: "TSLA.O",
  유니티: "U",
};

export const filterStocks = (query: string): { [key: string]: TReutersCodes } => {
  if (!query) return {};

  const lowerQuery = query.toLowerCase();
  const result: { [key: string]: TReutersCodes } = {};

  // 영어 검색 처리
  for (const code in STOCK_NAMES) {
    if (STOCK_NAMES[code as TReutersCodes].includes(lowerQuery)) {
      result[STOCK_NAMES[code as TReutersCodes]] = code as TReutersCodes;
    }
  }

  // 한글 초성 검색 처리
  for (const key in VARIOUS_STOCK_TO_REUTERS_CODE) {
    if (hangulIncludes(key, lowerQuery)) {
      const code = VARIOUS_STOCK_TO_REUTERS_CODE[key];
      const stockName = STOCK_NAMES[code as TReutersCodes];
      result[stockName] = code as TReutersCodes;
    }
  }

  if ("google".includes(lowerQuery)) {
    result["alphabet"] = "GOOGL.O";
  }

  return result;
};

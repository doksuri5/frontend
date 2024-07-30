import { TLanguages } from "@/types/AuthType";

export type TNations = "KRW" | "JPY(100)" | "USD" | "CNH" | "EUR";

// sessionCountryMapping은 세션의 국가 코드와 실제 환율 정보를 매핑하는 객체입니다.
export const localeMapToNation: {
  [key in TLanguages]: TNations;
} = {
  ko: "KRW",
  jp: "JPY(100)",
  en: "USD",
  ch: "CNH",
  fr: "EUR",
};

// 각 국가의 통화 기호를 매핑하는 객체입니다.
export const currencySymbols: {
  [key in TNations]: string;
} = {
  KRW: "₩",
  "JPY(100)": "¥",
  USD: "$",
  CNH: "¥",
  EUR: "€",
};

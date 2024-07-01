import { StockDataType } from "./StockDataType";

export interface SearchDataType {
  _id: string;
  user_id: string;
  stockName: string;
  symbolCode: string;
  created_at: string; // 추후에 date 값으로 변경 예정
}

export interface SearchDetailDataType extends StockDataType {
  _id: string;
  user_id: string;
  stockName: string;
  symbolCode: string;
  created_at: string; // 추후에 date 값으로 변경 예정
}

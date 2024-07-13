import { z } from "zod";
import { camelSchema } from "./ApiType";

export interface PopularDataType {
  _id: string;
  rank: number;
  stockName: string;
}

export interface PopularDetailDataType {
  _id: string;
  rank: number;
  stockName: string;
  icon: string;
  symbolCode: string;
  compareToPreviousClosePrice: number;
  fluctuationsRatio: number;
}

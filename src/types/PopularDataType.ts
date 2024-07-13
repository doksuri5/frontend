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

const PopularSearchSchema = camelSchema(
  z.object({
    stock_name: z.string(),
    count: z.number().int().default(0),
  }),
);

export type PopularSearchesDataType = z.infer<typeof PopularSearchSchema>;

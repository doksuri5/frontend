"use server";

import { api } from "@/lib/api";
import { z } from "zod";

import { NewsDataType, SearchStockNewsSchema, SearchStockNewsDataType } from "@/types/NewsDataType2";

export const getSearchNews = (params: string) =>
  api.get({
    endpoint: `/news/getSearchNews`,
    responseSchema: SearchStockNewsSchema,
  })<undefined, SearchStockNewsDataType>(undefined, { params });

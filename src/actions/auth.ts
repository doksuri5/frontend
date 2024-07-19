"use server";

import { api } from "@/lib/api";
import { AgreeDataType, AgreeSchema } from "@/types/AuthType";

// 약관 데이터 가져오기
export const getAgreeContent = api.get({
  endpoint: "/terms/getTerms",
  responseSchema: AgreeSchema,
  baseOptions: {
    isLoggedIn: false,
    isDataArray: false,
  },
})<undefined, AgreeDataType, false>;

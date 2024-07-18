"use server";

import { api } from "@/lib/api";
import { AgreeDataType, AgreeSchema } from "@/types/AuthType";

export const getAgreeContent = api.get({
  endpoint: "/terms/getTerms",
  responseSchema: AgreeSchema,
  baseOptions: {
    isLoggedIn: false,
    isDataArray: false,
  },
})<undefined, AgreeDataType, false>;

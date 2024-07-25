"use server";

import { api } from "@/lib/api";
import {
  AgreeDataType,
  AgreeSchema,
  userLoginSchema,
  userInfoSchema,
  UserLoginType,
  UserInfoDataType,
} from "@/types/AuthType";

// 약관 데이터 가져오기
export const getAgreeContent = api.get({
  endpoint: "/terms/getTerms",
  responseSchema: AgreeSchema,
  baseOptions: {
    isLoggedIn: false,
    isDataArray: false,
  },
})<undefined, AgreeDataType, false>;

// 로그인 일반 계정 유저 확인
export const userCheck = api.post({
  endpoint: "/auth/userCheck",
  requestSchema: userLoginSchema,
  responseSchema: userInfoSchema,
  baseOptions: {
    isLoggedIn: false,
    isDataArray: false,
    cache: "no-store",
  },
})<UserLoginType, UserInfoDataType, false>;

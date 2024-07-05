"use server";

import { signIn } from "@/auth";

import { TLoginSchema } from "@/types/AuthType";

import { MAIN_PATH, PROFILE_SETUP_PATH, REGISTER_PATH } from "@/routes/path";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function loginAction(data: TLoginSchema) {
  try {
    await signIn("credentials", {
      redirectTo: MAIN_PATH,
      email: data.email,
      password: data.password,
      autoLogin: data.authLogin,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "로그인 실패 : 이메일과 비밀번호를 확인해주세요!" };
        }
        default: {
          return { error: "이메일과 비밀번호를 확인해주세요!" };
        }
      }
    }

    throw error;
  }
}

export async function NaverLoginAction() {
  await signIn("naver", { redirectTo: PROFILE_SETUP_PATH });
}

export async function KakaoLoginAction() {
  await signIn("kakao", { redirectTo: REGISTER_PATH });
}

export async function GoogelLoginAction() {
  await signIn("google", { redirectTo: REGISTER_PATH });
}

"use server";

import { auth, signIn } from "@/auth";

import { TLoginSchema } from "@/types/AuthType";

import { MAIN_PATH } from "@/routes/path";

import { AuthError } from "next-auth";

export async function loginAction(data: TLoginSchema) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      autoLogin: data.authLogin,
      redirectTo: MAIN_PATH,
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

export async function SocialLoginAction(provider: string, redirectTo: string) {
  await signIn(provider, { redirectTo });
}

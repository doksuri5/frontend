"use server";

import { AuthError } from "next-auth";
import { cookies, headers } from "next/headers";

import { signIn, signOut } from "@/auth";

import { loginSchema, TLoginSchema } from "@/types/AuthType";

function getBasePath(path: string) {
  const regex = /^(\/[^\/]+)(\/.*)/;
  const match = path.match(regex);
  if (match) {
    return match[1];
  }
  return null;
}

export async function loginAction(data: TLoginSchema) {
  const validatedFields = loginSchema.safeParse(data);
  if (validatedFields) {
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        autoLogin: data.authLogin,
        redirect: false,
      });
      return response;
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
}

export async function SocialLoginAction(provider: string, redirectTo: string) {
  await signIn(provider, { redirectTo });
}

export async function logoutAction() {
  const headersList = headers();
  const headerPathname = headersList.get("x-pathname") || "";

  const url = getBasePath(headerPathname) + "";

  const cookieStore = cookies();
  const connectCookie = cookieStore.get("connect.sid");

  if (connectCookie !== undefined) {
    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`, {
      method: "GET",
      headers: {
        Cookie: `connect.sid=${connectCookie}`,
        credentials: "include",
      },
    });

    const response = await fetchResponse.json();

    if (response.ok) {
      cookieStore.delete("connect.sid");
      await signOut({ redirectTo: url, redirect: true });
    }
  }
}

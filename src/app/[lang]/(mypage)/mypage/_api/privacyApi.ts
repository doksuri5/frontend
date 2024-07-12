"use server";

import { cookies } from "next/headers";

// 개인정보 수정 - 비밀번호 인증 API
export async function passwordCert(email: string, password: string) {
  const cookieStore = cookies();
  const connectCookie = cookieStore.get("connect.sid")?.value;

  if (connectCookie !== undefined) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/passwordCert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `connect.sid=${connectCookie}`,
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    return data;
  }
}

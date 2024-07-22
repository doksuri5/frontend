"use server";

import { cookies } from "next/headers";

// 언어 설정 수정
export async function languageSetting(lang: string) {
  const cookieStore = cookies();
  const connectCookie = cookieStore.get("connect.sid")?.value;

  if (connectCookie !== undefined) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/language`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `connect.sid=${connectCookie}`,
      },
      credentials: "include",
      body: JSON.stringify({ language: lang }),
    });

    const data = await response.json();
    return data;
  }
}

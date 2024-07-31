"use server";

import { cookies } from "next/headers";

const loginCookie = async (sns_id: string, email: string, autoLoginCheck: boolean, login_type: string) => {
  // 로그인 완료 시 백엔드 통신 (쿠키 저장)
  const body = { sns_id, email, autoLoginCheck, login_type };
  const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const responseData = await fetchResponse.json();

  if (responseData.ok) {
    // 백엔드에서 response로 넘겨준 쿠키를 next 서버에서 클라이언트로 저장하는 방법
    fetchResponse.headers.getSetCookie().forEach((items: string) => {
      const [key, str] = items.split("=");
      ("use server");
      const [value] = str.split("; ");
      cookies().set(key, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: autoLoginCheck ? 604800 : undefined, // s 단위
        // maxAge: autoLoginCheck ? 30 : undefined, // s 단위
      });
    });
  }
};

export default loginCookie;

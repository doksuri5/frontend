"use server";

import { cookies } from "next/headers";
import { FormData } from "../_components/EditPrivacyForm";

export async function updateUserInfo(formData: FormData) {
  const cookieStore = cookies();
  const connectCookie = cookieStore.get("connect.sid")?.value;

  if (connectCookie !== undefined) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/updateUserInfo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `connect.sid=${connectCookie}`,
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  }
}

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

// 개인정보 수정 - 이메일 인증 코드 발송 API
export async function emailCert(email: string) {
  const cookieStore = cookies();
  const connectCookie = cookieStore.get("connect.sid")?.value;

  if (connectCookie !== undefined) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/emailCert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `connect.sid=${connectCookie}`,
      },
      credentials: "include",
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();
    return data;
  }
}

// 개인정보 수정 - 이메일 인증 확인 API
export async function verifyCode(email: string, code: string) {
  const cookieStore = cookies();
  const connectCookie = cookieStore.get("connect.sid")?.value;

  if (connectCookie !== undefined) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verifyCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `connect.sid=${connectCookie}`,
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        code,
      }),
    });

    const data = await response.json();
    return data;
  }
}

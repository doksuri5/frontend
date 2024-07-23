"use server";

import { auth } from "@/auth";
import { cookies } from "next/headers";
import { IWithdrawForm } from "../_components/WithdrawModal";

// 회원탈퇴
export async function withdraw(formData: IWithdrawForm) {
  const cookieStore = cookies();
  const connectCookie = cookieStore.get("connect.sid")?.value;

  if (connectCookie !== undefined) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/withdraw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `connect.sid=${connectCookie}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.ok) {
      cookieStore.delete("connect.sid")
    }
    return data;
  }
}

// 구글
export const deleteGoogleUserAccount = async () => {
  const session = await auth();
  if (!session) return;

  const unlinkResponse = await fetch(`https://oauth2.googleapis.com/revoke?token=${session.accessToken}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (unlinkResponse.ok) {
    return true;
  } else {
    return false;
  }
};

// 카카오
export const deleteKakaoUserAccount = async () => {
  const session = await auth();
  if (!session) return;

  const unlinkResponse = await fetch(`https://kapi.kakao.com/v1/user/unlink`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (unlinkResponse.ok) {
    return true;
  } else {
    return false;
  }
};

// 네이버
export const deleteNaverUserAccount = async () => {
  const session = await auth();
  if (!session) return;

  const unlinkResponse = await fetch(
    `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&access_token=${session.accessToken}`,
    {
      method: "POST",
    },
  );

  if (unlinkResponse.ok) {
    return true;
  } else {
    return false;
  }
};

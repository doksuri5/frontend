import React from "react";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { MyPageMain } from "./_components";

const fetchUserData = async () => {
  const cookieStore = cookies();
  const connectCookie = cookieStore.get("connect.sid")?.value;

  const session = await auth();

  try {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getUser/${session?.user.email}`, {
        headers: {
          "Content-Type": "application/json",
          Cookie: `connect.sid=${connectCookie}`,
        },
        credentials: "include",
        cache: "no-cache",
        next: { tags: ["investPropensity"] },
      })
    ).json();

    if (response.ok) {
      const userData = response.data;

      // invest_propensity를 파싱
      if (userData.user_propensity && typeof userData.user_propensity.invest_propensity === "string") {
        userData.user_propensity.invest_propensity = JSON.parse(userData.user_propensity.invest_propensity);
      }
      return response.data;
    }
  } catch (err) {
    console.error("유저 데이터를 가져오는 데 실패했습니다.");
  }
};

export default async function MyPage() {
  const userData = await fetchUserData();
  return <MyPageMain userData={userData} />;
}

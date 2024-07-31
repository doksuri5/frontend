import React from "react";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { MyPageMain } from "./_components";
import { unstable_setRequestLocale } from "next-intl/server";

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
      // invest_propensity를 파싱해서 반환
      let { invest_propensity } = response.data.user_propensity;

      // 투자성향데이터를 등록하지 않아서 undefined로 넘어올 경우
      if (invest_propensity === "undefined") invest_propensity = { 1: "", 2: "", 3: "", 4: "", 5: [] };
      // 투자성향데이터가 있을 경우
      else invest_propensity = JSON.parse(invest_propensity);

      response.data.user_propensity.invest_propensity = invest_propensity;

      return response.data;
    }
  } catch (err) {
    console.error("유저 데이터를 가져오는 데 실패했습니다.");
  }
};

export default async function MyPage({ params }: { params: { lang: string } }) {
  unstable_setRequestLocale(params.lang);
  const userData = await fetchUserData();
  return <MyPageMain userData={userData} />;
}

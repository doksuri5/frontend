import React from "react";
import MyPageMain from "./_components/MyPageMain";
import { auth } from "@/auth";

// TODO: 백엔드와 연결 시 삭제할 것
const email = "abcde@test.com";

const fetchUserData = async () => {
  const session = await auth();

  try {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getUser/${session?.user.email}`, { cache: "no-cache" })
    ).json();
    // const response = await (
    //   await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getUser/${email}`, { cache: "no-cache" })
    // ).json();

    if (response.ok) {
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

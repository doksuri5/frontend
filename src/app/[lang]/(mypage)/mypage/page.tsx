import React from "react";
import MyPageMain from "./_components/MyPageMain";

// TODO: 추후 실제 유저 이메일 가져오도록 로직 수정 예정
const email = "abcde@test.com";

const fetchUserData = async () => {
  try {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getUser/${email}`, { cache: "no-cache" })
    ).json();

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

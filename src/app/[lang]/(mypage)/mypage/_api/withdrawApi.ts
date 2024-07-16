"use server";

import { auth } from "@/auth";

// 구글
export const deleteGoogleUserAccount = async () => {
  const session = await auth();
  if (!session) return;

  const response = await fetch(`https://oauth2.googleapis.com/revoke?token=${session.accessToken}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  console.log(response);
  if (response.ok) {
    console.log("구글 회원탈퇴 성공");
    return true;
  } else {
    console.error("구글 회원탈퇴 실패");
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
    console.log(unlinkResponse);
    console.log("카카오 회원탈퇴 성공");
    return true;
  } else {
    console.log(unlinkResponse);
    console.error("카카오 회원탈퇴 실패");
    return false;
  }

  // 출력 결과
  // id(Long): 연결 끊기에 성공한 사용자의 회원번호
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

  console.log(unlinkResponse);
  if (unlinkResponse.ok) {
    console.log("네이버 회원탈퇴 성공");
    return true;
  } else {
    console.error("네이버 회원탈퇴 실패");
    return false;
  }

  // 출력 결과
  // access_token(string): 삭제처리된 접근토큰
  // result(string): 처리결과 (success)
};

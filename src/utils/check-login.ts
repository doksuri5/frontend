import { cookies } from "next/headers";

// 로그인 세션 확인 여부 체크
const checkLogin = () => {
  const cookieStore = cookies();
  const connectId = cookieStore.get("connect.sid")?.value;
  return !!connectId; // 세션이 있으면 true, 없으면 false 반환
};

export default checkLogin;

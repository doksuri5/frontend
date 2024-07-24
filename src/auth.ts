import { cookies } from "next/headers";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";

import { EXIST_PATH, LOGIN_PATH, MAIN_PATH, LOGIN_ERROR_PATH } from "./routes/path";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: LOGIN_PATH,
    signOut: MAIN_PATH,
    error: LOGIN_ERROR_PATH,
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
        autoLogin: { label: "AutoLogin", type: "checkbox" },
      },
      async authorize(credentials) {
        const { email, password, autoLogin } = credentials;

        try {
          const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/userCheck`, {
            method: "POST",
            body: JSON.stringify({ email, pw: password }),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          const responseData = await fetchResponse.json();
          if (!responseData.ok) {
            return null;
          }

          const user = responseData.data;

          const autoLoginCheck = autoLogin === "true" ? true : false;
          await loginCookie(user.sns_id, user.email, autoLoginCheck, "local"); // 로그인 시 쿠키 발급

          return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: "user",
            language: user.language,
            login_type: user.login_type,
          };
        } catch (error) {
          console.log("Credentials DB 연결 오류:", error);
          return null;
        }
      },
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      async profile(profile) {
        return {
          id: profile.response.id,
          name: profile.response.name,
          email: profile.response.email,
          phone: profile.response.mobile,
          birth: profile.response.birthyear + profile.response.birthday,
          role: "user",
          language: "ko",
          login_type: "naver",
        };
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      async profile(profile) {
        return {
          ...profile,
          role: "user",
          language: "ko",
          login_type: "kakao",
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        return {
          name: profile.name,
          email: profile.email,
          role: "user",
          id: profile.sub,
          language: "ko",
          login_type: "google",
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt", // JWT 세션 전략 사용
    maxAge: 24 * 60 * 60, // 세션 쿠키
    // updateAge: 24 * 60 * 60, // 매일 세션 갱신
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        let socialUserOption;

        if (account?.provider === "credentials") {
          user.role = "user";
        } else if (account?.provider === "naver" || account?.provider === "google") {
          socialUserOption = {
            email: user.email as string,
            sns_id: account.providerAccountId,
            login_type: account.provider,
            is_delete: false,
          };
        } else if (account?.provider === "kakao") {
          socialUserOption = {
            sns_id: account.providerAccountId,
            login_type: account.provider,
            is_delete: false,
          };
        }

        // 기존 사용자 확인
        const existingUserData = await fetchApi(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/getUser`, {
          email: user.email as string,
          is_delete: false,
        });
        const existingUser = existingUserData.data;

        // 소셜 사용자 확인
        const socialUserData =
          socialUserOption &&
          (await fetchApi(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/getSocialUser`, socialUserOption));
        const socialUser = socialUserData?.data;

        if (socialUser) {
          // SNS 로그인
          user.role = "user";
          if (account && account?.provider !== "credentials") {
            user.email = socialUser.email;
            user.language = socialUser.language;
            await loginCookie(account.providerAccountId, socialUser.email, false, account.provider); // 로그인 시 쿠키 발급
          }
        } else {
          // SNS 회원가입
          if (existingUser) {
            return EXIST_PATH;
          }
          user.role = (account && account.provider) || "user";
        }
        user.id = (account && account.providerAccountId) || user.id;
        return true;
      } catch (error) {
        console.error("SNS DB 연결 오류:", error);
        return false;
      }
    },
    async jwt({ token, user, account, trigger, session }) {
      // console.log("JWT-token", token, "JWT-user", user);

      if (user && account) {
        token.sub = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.phone = user.phone;
        token.birth = user.birth;
        token.language = user.language;
        token.login_type = user.login_type;
        token.accessToken = account.access_token;
      }

      // 언어 설정 변경 시 서버 세션 정보 업데이트
      if (trigger === "update" && session !== null) {
        const { language } = session;
        token.language = language;
      }

      return token;
    },
    async session({ session, token }) {
      // console.log("session-session", session, "session-token", token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
        session.user.phone = token.phone as string;
        session.user.birth = token.birth as string;
        session.user.language = token.language as "ko" | "en" | "ch" | "jp" | "fr";
        session.user.login_type = token.login_type as "local" | "naver" | "kakao" | "google";
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
});

interface IbodyType {
  sns_id?: string;
  email?: string;
  autoLoginCheck?: boolean;
  login_type?: string;
  is_delete?: boolean;
}
const fetchApi = async (url: string, body: IbodyType) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response.json();
};

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

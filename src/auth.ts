import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";

import connectDB from "./lib/db";
import { User } from "./lib/schema";
import { compare } from "bcryptjs";

import { LOGIN_PATH, MAIN_PATH } from "./routes/path";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: LOGIN_PATH,
    signOut: MAIN_PATH,
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
        console.log("credentials", credentials);

        const { email, password, autoLogin } = credentials;

        try {
          await connectDB();
        } catch (error) {
          console.log("DB 연결 오류:", error);
          return null;
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
          console.log("Login Fail : 가입되지 않은 회원");
          return null;
        }

        const isMatched = await compare(String(password), user.password);
        if (!isMatched) {
          console.log("Login Fail : 비밀번호 불일치");
          return null;
        }

        return {
          name: user.name,
          email: user.email,
          id: user._id,
          role: "user",
        };
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
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      async profile(profile) {
        return {
          name: profile.name,
          email: profile.email,
          email_verified: profile.email_verified,
          role: "user",
          id: profile.sub,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt", // JWT 세션 전략 사용
    maxAge: 24 * 60 * 60, // 기본 세션 만료 시간 1일
    updateAge: 24 * 60 * 60, // 매일 세션 갱신
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log("--------------------- Credentials signIn 영역 --------------------- ");
      // console.log("user:", user, "account:", account, "profile:", profile);

      if (account?.provider === "naver") {
        console.log("--------------------- 네이버 signIn 영역 --------------------- ");
        console.log("user:", user, "account:", account, "profile:", profile);

        try {
          await connectDB();
        } catch (error) {
          console.error("Google DB 연결 오류:", error);
          return false;
        }

        const existingUser = await User.findOne({
          email: user.email,
          sns_id: user.id,
          login_type: account.provider,
        });

        if (!existingUser) {
          user.role = account.provider;
          user.phone = user.phone;
          user.birth = user.birth;
        } else {
          user.role = "user";
        }
        return true;
      } else if (account?.provider === "kakao") {
        console.log("--------------------- 카카오 signIn 영역 --------------------- ");
        console.log("user:", user, "account:", account, "profile:", profile);

        try {
          await connectDB();
        } catch (error) {
          console.error("Kakao DB 연결 오류:", error);
          return false;
        }

        const existingUser = await User.findOne({
          name: user.name,
          sns_id: account.provider,
        });

        if (!existingUser) {
          user.role = account.provider;
        } else {
          user.role = "user";
        }

        user.id = account.providerAccountId;
        return true;
      } else if (account?.provider === "google") {
        console.log("--------------------- 구글 signIn 영역 --------------------- ");
        console.log("user:", user, "account:", account, "profile:", profile);

        // DB에서 조회 유저정보 조회
        try {
          await connectDB();
        } catch (error) {
          console.error("Google DB 연결 오류:", error);
          return false;
        }

        // DB에서 고유한 이메일 확인
        const existingUser = await User.findOne({
          email: user.email,
        });

        // 동일한 이메일이 있다면 소셜로그인 실패 안내페이지 이동
        if (existingUser) {
          return "/exist";
        }

        const socialUser = await User.findOne({
          email: user.email,
          login_type: account.provider,
          sns_id: account.providerAccountId,
          // login_type: account.provider,
        });

        // 조회한 유저정보 통해, role check
        if (!socialUser) {
          user.role = account.provider;
        } else {
          user.role = "user";
        }

        user.id = user.id;

        return true;
      } else if (account?.provider === "credentials") {
        user.role = "user";
        return true;
      } else {
        return true;
      }
    },
    async jwt({ token, user, account }) {
      console.log("--------------------- 토큰 영역 --------------------- ");
      console.log("JWT-token", token, "JWT-user", user);

      if (user && account) {
        token.sub = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.phone = user.phone;
        token.birth = user.birth;

        // if (user.role === "goole") {
        //   token.accessToken = account.id_token;
        // }
      }

      return token;
    },
    async session({ session, token }) {
      console.log("--------------------- 세션 영역 --------------------- ");
      console.log("session-session", session, "session-token", token);

      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
        session.user.phone = token.phone as string;
        session.user.birth = token.birth as string;
        // session.accessToken = token.accessToken as string;
      }

      return session;
    },
  },
});

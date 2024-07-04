import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";

import connectDB from "./lib/db";
import { User } from "./lib/schema";
import { compare } from "bcryptjs";

import { LOGIN_PATH } from "./routes/path";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: LOGIN_PATH,
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
          console.log("가입되지 않은 회원입니다.");
          return null;
        }

        const isMatched = await compare(String(password), user.password);
        if (!isMatched) {
          console.log("비밀번호가 일치하지 않습니다.");
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
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      async profile(profile) {
        const email = profile.email;
        const name = profile.name;
        return {
          email,
          name,
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
        const email = profile.email;
        const name = profile.name;
        return {
          email,
          name,
          role: "user",
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
      console.log("signIn", user, account);

      if (account?.provider === "naver") {
        console.log("Naver signIn", user, account, profile);
        const { name, email } = user;
        await connectDB();

        const existingUser = await User.findOne({
          email,
          authProviderId: "naver",
        });

        if (!existingUser) {
          // 소셜 가입
          await new User({
            name,
            email,
            authProviderId: "naver",
          }).save();
        }

        const socialUser = await User.findOne({
          name,
          authProviderId: "naver",
        });

        user.id = socialUser?._id || null;

        return true;
      } else if (account?.provider === "kakao") {
        console.log("Kakao signIn", user, account, profile);
        const { name, email } = user;

        // 유저 정보를 가지고 DB에 정보가 있는지 확인
        // 이름이랑, providerId로 조회
        // → API를 통해서 조회 (이메일로)
        await connectDB();
        const existingUser = await User.findOne({
          name,
          authProviderId: "kakao",
        });

        if (!existingUser) {
          user.role = account.provider;
          // await new User({
          //   name,
          //   email,
          //   authProviderId: "google",
          // }).save();
        } else {
          user.role = "user";
        }

        const socialUser = await User.findOne({
          name,
          authProviderId: "kakao",
        });

        user.id = socialUser?._id || null;

        return true;
      } else if (account?.provider === "google") {
        console.log("Googel signIn", user, account, profile);

        const { name, email } = user;

        try {
          await connectDB();
        } catch (error) {
          console.error("Google DB 연결 오류:", error);
          return false;
        }

        // DB에서 조회 유저정보 조회
        const existingUser = await User.findOne({
          email,
          authProviderId: account.provider,
        });

        if (!existingUser) {
          user.role = account.provider;
          // await new User({
          //   name,
          //   email,
          //   authProviderId: "google",
          // }).save();
        } else {
          user.role = "user";
        }

        const socialUser = await User.findOne({
          name,
          authProviderId: account.provider,
        });
        user.id = socialUser?._id || null;

        return true;
      } else {
        return true;
      }
    },
    async jwt({ token, user, account }) {
      console.log("jwt", token, user);
      if (user && account) {
        token.sub = user.id;
        token.role = user.role;
        token.accessToken = account.access_token;
      }

      return { ...token, ...user };
    },
    async session({ session, token }) {
      console.log("session", session, token);
      if (token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});

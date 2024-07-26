import NextAuth, { type DefaultSession } from "next-auth";
import { JWT as BaseJWT } from "next-auth/jwt";

// 공통 인터페이스 정의
interface UserAttributes {
  role: string;
  phone?: string;
  birth?: string;
  language: "ko" | "en" | "ch" | "jp" | "fr";
  login_type: "local" | "naver" | "kakao" | "google";
  nickname?: string;
}

export type ExtendedUser = DefaultSession["user"] & UserAttributes;

declare module "next-auth/jwt" {
  interface JWT extends UserAttributes {
    accessToken?: string;
    email: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
    accessToken?: string;
  }
  interface User extends UserAttributes {}
}

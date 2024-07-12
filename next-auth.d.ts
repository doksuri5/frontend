import NextAuth, { type DefaultSession } from "next-auth";

import { JWT } from "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  role: string;
  phone?: string;
  birth?: string;
  language: "ko" | "en" | "ch" | "jp" | "fr";
  login_type: "local" | "naver" | "kakao" | "google";
};

export declare module "next-auth/jwt" {
  interface JWT {
    user: ExtendedUser;
    accessToken?: string;
  }

  interface User {
    role: string;
    phone?: string;
    birth?: string;
    language: "ko" | "en" | "ch" | "jp" | "fr";
    login_type: "local" | "naver" | "kakao" | "google";
  }
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
    accessToken?: string;
  }

  interface User {
    role: string;
    phone?: string;
    birth?: string;
    language: "ko" | "en" | "ch" | "jp" | "fr";
    login_type: "local" | "naver" | "kakao" | "google";
  }
}

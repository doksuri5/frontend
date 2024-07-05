import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: string;
  phone?: string;
  birth?: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
    accessToken?: string;
  }

  interface User {
    role: string;
    phone?: string;
    birth?: string;
  }
}

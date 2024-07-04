import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
  interface User {
    role: string;
  }
}

import { JWT } from "@auth/core/jwt";

declare module "@auth/core/jwt" {
  interface JWT {
    user: {
      role: string;
    } & DefaultJWT["user"];
  }

  interface User {
    role: string;
  }
}

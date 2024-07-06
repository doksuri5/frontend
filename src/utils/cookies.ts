import { NextRequest } from "next/server";
import { setCookie } from "nookies";

export const setLanguageCookie = (lang: string) => {
  setCookie(null, "NEXT_LOCALE", lang, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

export const getLanguageCookie = (req?: NextRequest): string | undefined => {
  const cookieString = typeof document !== "undefined" ? document.cookie : req?.headers.get("cookie");

  if (!cookieString) return undefined;

  const cookies = Object.fromEntries(
    cookieString.split(";").map((cookie) => {
      const [name, ...rest] = cookie.split("=");
      return [name.trim(), rest.join("=").trim()];
    }),
  );

  return cookies["NEXT_LOCALE"];
};

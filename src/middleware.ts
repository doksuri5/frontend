import { match } from "path-to-regexp";
import { NextRequest, NextResponse } from "next/server";
import { i18n } from "./i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { auth } from "./auth";

// 권한을 가진 사용자만 접근 가능한 경로
const matchersForAuth = ["/home", "/mypage/:path*"];
// 권한이 없는 사용자만 접근 가능한 경로
const matchersForNoAuth = [
  "/",
  "/*login",
  "/*account",
  "/*account/register",
  "/*account/profile-setup",
  "/*find-id",
  "/*find-password",
  "/*register-complete",
  "/*withdraw",
  "/*exist",
];

// 로그인 세션 확인 여부 체크
async function checkLogin() {
  const session = await auth();
  if (session?.user.role === "user") {
    return true;
  }
  return false;
}

// 로그인이 필요한지에 대한 경로 체크
function requiresAuth(pathname: string): boolean {
  // 로그인이 필요 없는 경로라면 false 반환
  if (matchersForNoAuth.some((pattern) => match(pattern)(pathname))) {
    return false;
  }
  // 그 외의 경우 로그인 필요
  return true;
}

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const url = req.nextUrl.clone();

  // Check if there is any supported locale in the pathname
  const locale = getLocale(req) || i18n.defaultLocale;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
  }

  // 로그인 필요 여부 체크
  if (requiresAuth(pathname) && !(await checkLogin())) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url)); // 로그인 페이지로 리다이렉트, 로케일이 있는 URL을 사용
  }
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|icons/.*).*)",
  ],
};

// function isMatch(pathname: string, urls: string[]) {
//   return urls.some((url) => !!match(url)(pathname));
// }

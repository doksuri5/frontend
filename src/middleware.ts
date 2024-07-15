import { match } from "path-to-regexp";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { i18n } from "./i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

// 로그인 세션 확인 여부 체크
async function checkLogin() {
  const cookieStore = cookies();
  const session = cookieStore.get("connect.sid")?.value;
  return !!session; // 세션이 있으면 true, 없으면 false 반환
}

// 로그인이 필요한 경로인지 체크
function requiresAuth(pathname: string, urls: string[]) {
  return urls.some((url) => !!match(url)(pathname));
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

  const isAuthenticated = await checkLogin();

  const isAuthPath = requiresAuth(pathname, [
    `/${locale}`,
    `/${locale}/login`,
    `/${locale}/login/error`,
    `/${locale}/account`,
    `/${locale}/account/register`,
    `/${locale}/account/profile-setup`,
    `/${locale}/account/verify-user`,
    `/${locale}/register-complete`,
    `/${locale}/find-email`,
    `/${locale}/find-password`,
    `/${locale}/exist`,
  ]);

  // 로그인이 필요한 경로이고 유저가 로그인 하지 않은 경우 로그인 페이지로 넘기기
  if (!isAuthPath && !isAuthenticated) {
    const response = NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    response.cookies.delete("authjs.session-token");

    return response;
  }

  // 로그인이 필요한 경로와 유저가 로그인 한 경우 Home 페이지로 넘기기
  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL(`/${locale}/home`, req.url));
  }

  // header에 pathname 추가
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icons/.*|images/.*).*)"],
};

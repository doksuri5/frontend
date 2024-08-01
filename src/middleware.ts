import { match } from "path-to-regexp";
import { NextRequest, NextResponse } from "next/server";
import { i18n } from "./i18n";
import checkLogin from "./utils/check-login";
import createMiddleware from "next-intl/middleware";
import { auth } from "@/auth";
import { TLanguages } from "./types/AuthType";
import { Session } from "next-auth";

// 로그인이 필요한 경로인지 체크
function isMatch(pathname: string, urls: string[]) {
  return urls.some((url) => !!match(url)(pathname));
}

const getLocale = async (request: NextRequest, session: Session | null) => {
  // 세션이 있으면, 세션 안에 있는 언어 정보 가져오기
  if (session && session.user.language && i18n.locales.includes(session.user.language)) {
    return session.user.language;
  }
  // 쿠키에서 언어 정보 가져오기
  const cookieLocale = request.cookies.get("NEXT_LOCALE");
  if (cookieLocale) {
    return cookieLocale.value as TLanguages;
  }

  // 기본 로케일 설정
  return i18n.defaultLocale;
};

export const middleware = async (req: NextRequest) => {
  const session = await auth();
  const pathname = req.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const locale = await getLocale(req, session);

  const intlMiddleware = createMiddleware({
    locales: i18n.locales,
    defaultLocale: locale,
  });

  const response = intlMiddleware(req);

  response.cookies.set("NEXT_LOCALE", locale, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  const isAuthenticated = await checkLogin();

  const nonRequiredAuthPaths = [
    `{/:locale(ko|en|fr|ch|jp)}?`,
    `{/:${locale}}?/login`,
    `{/:${locale}}?/login/:path`,
    `{/:${locale}}?/account`,
    `{/:${locale}}?/account/:path`,
    `{/:${locale}}?/register-complete`,
    `{/:${locale}}?/find-email`,
    `{/:${locale}}?/find-password`,
    `{/:${locale}}?/exist`,
    `{/:${locale}}?/withdraw`,
    `/sitemap.xml`,
    `/robots.txt`,
  ];

  // 인증이 필요없는 페이지에 현재 경로가 포함되어 있는지 체크
  const isAuthNotRequiredRoute = isMatch(pathname, nonRequiredAuthPaths);

  // 인증이 필요한 페이지에 비로그인 유저가 접근하려고 할 때 로그인 페이지로 리다이렉트
  if (!isAuthNotRequiredRoute && !isAuthenticated) {
    const response = NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    response.cookies.delete("authjs.session-token");

    return response;
  }

  // 로그인한 유저가 비로그인 페이지에 접근하려고 할 때 홈으로 리다이렉트
  if (isAuthNotRequiredRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(`/${locale}/home`, req.url));
  }

  return response;
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icons/.*|images/.*|sitemap.xml|robots.txt).*)"],
};

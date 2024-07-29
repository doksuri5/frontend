import { match } from "path-to-regexp";
import { NextRequest, NextResponse } from "next/server";
import { i18n } from "./i18n";
import checkLogin from "./utils/check-login";
import createMiddleware from "next-intl/middleware";
import { auth } from "@/auth";

// 로그인이 필요한 경로인지 체크
function requiresAuth(pathname: string, urls: string[]) {
  return urls.some((url) => !!match(url)(pathname));
}

const intlMiddleware = createMiddleware({
  locales: i18n.locales,
  defaultLocale: "ko",
});

const getLocale = async (request: NextRequest) => {
  // 세션에서 언어 정보 가져오기
  const session = await auth();
  if (session?.user.language && i18n.locales.includes(session.user.language)) {
    request.cookies.set('NEXT_LOCALE', session.user.language);
    return session.user.language;
  }

  // 쿠키에서 언어 정보 가져오기
  const cookieLang = request.cookies.get('NEXT_LOCALE');
  if (cookieLang) {
    return cookieLang.value;
  }

  // 기본 로케일 설정
  return i18n.defaultLocale;
};

export const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const locale = (await getLocale(req)) || i18n.defaultLocale;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
  }

  const isAuthenticated = checkLogin();

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
    `/${locale}/withdraw`,
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

  const response = intlMiddleware(req);
  response.headers.set('x-pathname', pathname);

  return response;
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icons/.*|images/.*).*)"],
};

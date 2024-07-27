import { match } from "path-to-regexp";
import { NextRequest, NextResponse } from "next/server";
import { i18n } from "./i18n";
import checkLogin from "./utils/check-login";
import createMiddleware from "next-intl/middleware";
import { auth } from "./auth";
// 로그인이 필요한 경로인지 체크
function requiresAuth(pathname: string, urls: string[]) {
  return urls.some((url) => !!match(url)(pathname));
}

const intlMiddleware = createMiddleware({
  locales: i18n.locales,
  defaultLocale: "ko",
});

const getLocale = async () => {
  const session = await auth();
  if (session?.user.language && i18n.locales.includes(session.user.language)) {
    return session.user.language;
  }

  return i18n.defaultLocale;
};

export const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const locale = await getLocale();
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
  response.headers.set("x-pathname", pathname);

  return response;
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icons/.*|images/.*).*)"],
};

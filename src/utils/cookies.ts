import { setCookie } from "nookies";

export const setLanguageCookie = (lang: string) => {
    setCookie(null, "NEXT_LOCALE", lang, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
    });
};
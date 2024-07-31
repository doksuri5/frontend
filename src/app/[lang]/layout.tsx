import { pretendard } from "@/fonts";
import { ToastContainer } from "react-toastify";

import "react-toastify/ReactToastify.min.css";
import "../globals.css";

import Header from "@/components/layout/Header";
import QueryProvider from "@/providers/QueryProvider";
import { i18n, type Locale } from "../../i18n";
import { ChatBot } from "@/components/common";
import { NextIntlClientProvider } from "next-intl";

import AuthSession from "@/providers/AuthSession";
import { getMessages, getTranslations, unstable_setRequestLocale } from "next-intl/server";
import checkLogin from "@/utils/check-login";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
  const t = await getTranslations({ lang: params.lang, namespace: "metadata" });
  const siteName = t("root.siteName");

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      template: `%s | ${siteName}`,
      default: t("root.title"),
    },
    description: t("root.description"),
    keywords: t("root.keywords"),
    authors: [{ name: t("root.authors"), url: "https://github.com/doksuri5/frontend" }],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: {
        template: `%s | ${siteName}`,
        default: t("root.openGraph.title"),
      },
      description: t("root.openGraph.description"),
      url: BASE_URL,
      siteName: siteName,
      type: "website",
      locale: params.lang,
      images: [
        {
          url: "images/intro_content.png",
          width: 800,
          height: 600,
          alt: "intro content image",
        },
      ],
    },
    twitter: {
      title: {
        template: `%s | ${siteName}`,
        default: t("root.twitter.title"),
      },
      description: t("root.twitter.description"),
      images: [
        {
          url: "images/intro_content.png",
          width: 800,
          height: 600,
          alt: "intro content image",
        },
      ],
    },
    other: {
      "google-site-verification": "BwEx6X7Gd_C-1nVsecNxXI2OYVDZ5ol1_IqEWv3G6xY",
      "naver-site-verification": "bfebfd50d9d110dbf2efb7ea26f951ab6233c1fa",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  unstable_setRequestLocale(params.lang);
  const isLoggedIn = await checkLogin();
  const messages = await getMessages();

  return (
    <html lang={params.lang} className={pretendard.className}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AuthSession>
            <Header isLoggedIn={isLoggedIn} />
            <main className="relative m-auto min-h-[100vh] max-w-[120rem] pt-[8rem]">
              <ToastContainer position="top-center" limit={1} />
              <QueryProvider>{children}</QueryProvider>
            </main>
            {isLoggedIn && <ChatBot />}
          </AuthSession>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

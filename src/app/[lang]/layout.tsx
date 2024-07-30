import { cookies } from "next/headers";
import { pretendard } from "@/fonts";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "../globals.css";

import Header from "@/components/layout/Header";
import QueryProvider from "@/providers/QueryProvider";

import { i18n, type Locale } from "../../i18n";

import { ChatBot } from "@/components/common";
import { NextIntlClientProvider } from "next-intl";

import AuthSession from "@/providers/AuthSession";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import Head from "next/head";

export interface IRootMetadata {
  title: {
    template: string;
    default: string;
  };
  description: string;
  keywords: string;
  authors: {
    name: string;
    url: string;
  }[];
  robots: {
    index: boolean;
    follow: boolean;
  };
  metadataBase: URL;
  openGraph: {
    title: {
      template: string;
      default: string;
    };
    description: string;
    url: string | undefined;
    siteName: string;
    type: string;
    locale: string;
    images: {
      url: string;
      alt: string;
    }[];
  };
  twitter: {
    card: string;
    title: {
      template: string;
      default: string;
    };
    description: string;
    images: {
      url: string;
      alt: string;
    }[];
  };
}


export const metadata: IRootMetadata = {
  title: {
    template: '%s | 아잇나우',
    default: 'AI기반 주식 분석 플랫폼 | 아잇나우',
  },
  description:
    '실시간 미국 기업 공시 정보와 데일리 뉴스 데이터 분석 자료를 결합하여, 다양한 국가 언어로 전 세계 사용자를 위해 맞춤화된 실시간 기업 분석 리포트를 제공하는 차세대 AI 애널리스트 플랫폼',
  keywords:
    '증권, 주식, 분석, 주식분석, 주식 분석, AI, ai, 아잇나우, aightnow, AIGHTNOW, 해외주식, 해외 주식, 뉴스, 증권 뉴스',
  authors: [
    { name: '독수리오형제', url: 'https://github.com/doksuri5/frontend' },
  ],
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}`),
  openGraph: {
    title: {
      template: '%s | 아잇나우',
      default: 'AI기반 주식 분석 플랫폼 | 아잇나우',
    },
    description:
      '실시간 기업 분석 리포트를 제공하는 차세대 AI 애널리스트 플랫폼',
    url: process.env.NEXT_PUBLIC_API_BASE_URL,
    siteName: '아잇나우',
    type: 'website',
    locale: 'ko',
    images: [
      {
        url: '/opengraph-image.png',
        alt: '아잇나우 로고',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      template: '%s | 아잇나우',
      default: 'AI기반 주식 분석 플랫폼 | 아잇나우',
    },
    description:
      '실시간 기업 분석 리포트를 제공하는 차세대 AI 애널리스트 플랫폼',
    images: [
      {
        url: '/opengraph-image.png',
        alt: '아잇나우 로고',
      },
    ],
  },
};



export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  unstable_setRequestLocale(params.lang);
  const cookieStore = cookies();
  const connectCookie = cookieStore.get("connect.sid")?.value;
  const isLoggedIn = connectCookie ? true : false;

  const messages = await getMessages();

  return (
    <html lang={params.lang} className={pretendard.className}>
      <Head>
        <title>{metadata.title.default}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.authors.map(author => author.name).join(', ')} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={metadata.openGraph.title.default} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.metadataBase.href} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:image" content={`${metadata.metadataBase.href}${metadata.openGraph.images[0].url}`} />
        <meta property="og:image:alt" content={metadata.openGraph.images[0].alt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.twitter.title.default} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={`${metadata.metadataBase.href}${metadata.twitter.images[0].url}`} />
        <meta name="twitter:image:alt" content={metadata.twitter.images[0].alt} />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-toastify/dist/ReactToastify.min.css" />
        <link rel="stylesheet" href="../globals.css" />
      </Head>
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

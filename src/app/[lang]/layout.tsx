import { cookies } from "next/headers";
import { pretendard } from "@/fonts";

import "../globals.css";
import Header from "@/components/layout/Header";
import QueryProvider from "@/providers/QueryProvider";
import { i18n, type Locale } from "../../i18n-config";
import { ChatBot } from "@/components/common";

import AuthSession from "@/providers/AuthSession";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const cookieStore = cookies();
  const connectCookie = cookieStore.get("connect.sid")?.value;
  const isLoggedIn = connectCookie ? true : false;

  return (
    <html lang={params.lang} className={pretendard.className}>
      <body className="bg-background-100">
        <AuthSession>
          <Header isLoggedIn={isLoggedIn} />
          <main className="relative m-auto max-w-[120rem] pt-[8rem]">
            <QueryProvider>{children}</QueryProvider>
          </main>
          <ChatBot />
        </AuthSession>
      </body>
    </html>
  );
}

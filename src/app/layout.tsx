import { pretendard } from "@/fonts";
import { i18n, type Locale } from "../i18n-config";

import "./globals.css";
import Header from "@/components/layout/Header";
import { ChatBot } from "@/components/common";
import QueryProvider from "@/providers/QueryProvider";

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
  return (
    <html lang={params.lang} className={pretendard.className}>
      <body className="h-[calc(100vh-8rem)] bg-background-100">
        <Header />
        <main className="relative top-[8rem] m-auto min-h-full max-w-[120rem]">
          <QueryProvider>{children}</QueryProvider>
        </main>
        <ChatBot />
      </body>
    </html>
  );
}

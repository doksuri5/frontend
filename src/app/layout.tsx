import { pretendard } from "@/fonts";

import "./globals.css";
import Header from "@/components/layout/Header";
import { ChatBot } from "@/components/common";
import QueryProvider from "@/providers/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
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

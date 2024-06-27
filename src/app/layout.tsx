import { pretendard } from "@/fonts";

import "./globals.css";
import Header from "@/components/layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body className="h-[calc(100vh-8rem)]">
        <Header />
        <main className="relative top-[8rem] m-auto min-h-full w-full bg-background-100 px-[12rem]">{children}</main>
      </body>
    </html>
  );
}

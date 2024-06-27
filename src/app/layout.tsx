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
      <body>
        <Header />
        <main className="m-auto min-h-[calc(100vh-8rem)] bg-background-100 px-[12rem]">{children}</main>
      </body>
    </html>
  );
}

import { pretendard } from "@/fonts";

import "./globals.css";
import Header from "@/components/layout/Header";
import QueryProvider from "@/providers/QueryProvider";

import { Button, ChatBot } from "@/components/common";

import Image from "next/image";

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  // TODO : 추후 해당 코드 변경 예정
  const isLoggedIn = true;

  return (
    <html lang={params.lang} className={pretendard.className}>
      <body
        className={`${isLoggedIn ? "bg-background-100" : "bg-[url('/images/intro_bg.png')] bg-cover bg-center bg-no-repeat"}`}
      >
        <Header isLoggedIn={isLoggedIn} />
        <main className="relative m-auto max-w-[120rem] pt-[8rem]">
          {isLoggedIn ? (
            <QueryProvider>{children}</QueryProvider>
          ) : (
            <div className="flex flex-col items-center justify-between pt-[8rem]">
              <dl className="flex_col_center fadeInUp-animation mb-[5.8rem] mt-[7rem] text-white">
                <dt className="heading_1 font-medium">
                  해외주식은 <em className="font-extrabold not-italic">아잇나우</em>와 함께!
                </dt>
                <dd className="heading_4 mb-[5.6rem] mt-[2.4rem] text-center font-medium">
                  해외 주식 뉴스 실시간 번역과
                  <br /> AI 애널리스트가 알려주는 어려운 해외주식 리포트
                </dd>
                <dd>
                  <Button variant="textButton" size="lg" bgColor="bg-navy-900" className="w-[38.6rem]">
                    로그인
                  </Button>
                </dd>
              </dl>
              <Image src={"/images/intro_content.png"} alt="아잇나우" width={1038} height={526} />
            </div>
          )}
        </main>
        <ChatBot />
      </body>
    </html>
  );
}

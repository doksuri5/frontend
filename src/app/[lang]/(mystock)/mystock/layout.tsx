import type { Metadata } from "next";
import { Suspense } from "react";
import { MyStockStoreProvider } from "@/providers/MyStockProvider";
import BodyLoading from "@/app/[lang]/body-loading";

export const metadata: Metadata = {
  title: "관심 주식",
  description: "내가 관심 있는 종목을 관리하고 분석 리포트로 이동할 수 있는 페이지입니다.",
  keywords: "관심 주식, 주식 찜하기, 주식 분석, AI 주식 분석, 종목 관리",
  openGraph: {
    title: "관심 주식",
    description: "내가 관심 있는 종목을 관리하고 분석 리포트로 이동할 수 있는 페이지입니다.",
  },
  twitter: {
    title: "관심 주식",
    description: "내가 관심 있는 종목을 관리하고 분석 리포트로 이동할 수 있는 페이지입니다.",
  },
};

export default function MyStockLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<BodyLoading />}>
      <MyStockStoreProvider>{children}</MyStockStoreProvider>
    </Suspense>
  );
}

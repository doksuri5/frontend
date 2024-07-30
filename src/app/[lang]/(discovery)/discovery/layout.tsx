import { Metadata } from "next";
import { Suspense } from "react";
import { DiscoveryInput } from "./_components";
import BodyLoading from "@/app/[lang]/body-loading";

export const metadata: Metadata = {
  title: "종목 검색",
  description:
    "다양한 주식 종목을 실시간으로 검색하고 분석할 수 있는 AI 기반 주식 분석 플랫폼, 아잇나우의 발견 페이지입니다.",
  keywords: "주식 검색, 주식 분석, 실시간 주식 뉴스, AI 주식 분석, 주식 종목 검색, 아잇나우, aightnow, AIGHTNOW",
  openGraph: {
    title: "종목 검색",
    description:
      "다양한 주식 종목을 실시간으로 검색하고 분석할 수 있는 AI 기반 주식 분석 플랫폼, 아잇나우의 발견 페이지입니다.",
  },
  twitter: {
    title: "종목 검색",
    description:
      "다양한 주식 종목을 실시간으로 검색하고 분석할 수 있는 AI 기반 주식 분석 플랫폼, 아잇나우의 발견 페이지입니다.",
  },
};

export default function DiscoveryLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<BodyLoading />}>
      <article className="flex_col m-auto max-w-[59rem] gap-[3.2rem] py-[5.6rem]">
        <DiscoveryInput />
        {children}
      </article>
    </Suspense>
  );
}

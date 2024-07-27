import { ReportStoreProvider } from "@/providers/ReportProvider";
import type { Metadata } from "next";

const TITLE = "리포트";
// 주식 종목에 대한 주식 가격, 주식 변동률 표시
export const metadata: Metadata = {
  title: `아잇나우 - ${TITLE}`,
  description: "아잇나우는 해외 주식 정보를 제공하는 서비스입니다.",
};

export default function HomeRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <ReportStoreProvider>{children}</ReportStoreProvider>
    </section>
  );
}

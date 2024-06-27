import type { Metadata } from "next";

const TITLE = "마이페이지";

export const metadata: Metadata = {
  title: `거점 오피스 서비스 마일 - ${TITLE}`,
  description: "마일은 거점 오피스 좌석 예약 서비스입니다.",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

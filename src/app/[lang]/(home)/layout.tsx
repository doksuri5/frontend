import type { Metadata } from "next";

const TITLE = "홈";

export const metadata: Metadata = {
  title: `아잇나우 - ${TITLE}`,
  description: "아잇나우는 해외 주식 정보를 제공하는 서비스입니다.",
};

export default function HomeRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="m-auto max-w-[120rem]">{children}</section>;
}

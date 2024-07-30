import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

const TITLE = "홈";

export const metadata: Metadata = {
  title: `아잇나우 - ${TITLE}`,
  description: "아잇나우는 해외 주식 정보를 제공하는 서비스입니다.",
};

export default function HomeRootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  unstable_setRequestLocale(params.lang);
  return <section>{children}</section>;
}

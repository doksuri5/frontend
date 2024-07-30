import type { Metadata } from "next";
import { Suspense } from "react";
import { MyStockStoreProvider } from "@/providers/MyStockProvider";
import Loading from "@/app/[lang]/loading";

export const metadata: Metadata = {
  title: `관심 주식`,
  description: "관심 종목 리스트를 보여주는 페이지",
};

export default function MyStockLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Loading />}>
      <MyStockStoreProvider>{children}</MyStockStoreProvider>
    </Suspense>
  );
}

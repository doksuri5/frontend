import { MyStockStoreProvider } from "@/providers/MyStockProvider";
import type { Metadata } from "next";

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
    <>
      <MyStockStoreProvider>{children}</MyStockStoreProvider>
    </>
  );
}

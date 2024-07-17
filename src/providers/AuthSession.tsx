"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

import { filterMainPath } from "@/utils/filter-mainpath";

type Props = {
  children: React.ReactNode;
};

export default function AuthSession({ children }: Props) {
  const pathname = usePathname();

  return (
    <SessionProvider>
      <div
        className={`${filterMainPath(pathname) ? "bg-[url('/images/intro_bg.png')] bg-cover bg-center bg-no-repeat" : "bg-background-100"}`}
      >
        {children}
      </div>
    </SessionProvider>
  );
}

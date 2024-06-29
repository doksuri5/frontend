"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/common";

import { cn } from "@/utils/cn";

type TCommonLoginBtnProps = {
  className?: string;
};

export default function CommonLoginBtn({ className }: TCommonLoginBtnProps) {
  const router = useRouter();

  const onClickHandler = () => {
    router.push("/login");
  };

  return (
    <Button type="button" size="lg" className={cn("text-white", className)} onClick={onClickHandler}>
      로그인하기
    </Button>
  );
}

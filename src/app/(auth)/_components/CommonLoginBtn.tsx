"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/common";

import { cn } from "@/utils/cn";

import { LOGIN_PATH } from "@/routes/path";

type TCommonLoginBtnProps = {
  className?: string;
};

export default function CommonLoginBtn({ className }: TCommonLoginBtnProps) {
  const router = useRouter();

  const onClickHandler = () => {
    router.push(LOGIN_PATH);
  };

  return (
    <Button type="button" size="lg" className={cn("text-white", className)} onClick={onClickHandler}>
      로그인하기
    </Button>
  );
}

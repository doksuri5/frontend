"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/common";

import { cn } from "@/utils/cn";

import { LOGIN_PATH } from "@/routes/path";

type TCommonLoginBtnProps = {
  className?: string;
  text?: string;
  path?: string;
};

export default function CommonLoginBtn({ className, text = "로그인", path = LOGIN_PATH }: TCommonLoginBtnProps) {
  const router = useRouter();

  const onClickHandler = () => {
    router.push(path);
  };

  return (
    <Button type="button" size="lg" className={cn("text-white", className)} onClick={onClickHandler}>
      {text}
    </Button>
  );
}

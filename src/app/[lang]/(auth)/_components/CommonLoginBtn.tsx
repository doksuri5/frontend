"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { Button } from "@/components/common";

import { cn } from "@/utils/cn";

import { LOGIN_PATH } from "@/routes/path";

type TCommonLoginBtnProps = {
  className?: string;
  text?: string;
  path?: string;
};

export default function CommonLoginBtn({ className, text, path = LOGIN_PATH }: TCommonLoginBtnProps) {
  const t = useTranslations("auth.title");
  const router = useRouter();

  const onClickHandler = () => {
    router.push(path);
  };

  return (
    <Button type="button" size="lg" className={cn("text-white", className)} onClick={onClickHandler}>
      {text || t("login", { defaultMessage: "로그인" })}
    </Button>
  );
}

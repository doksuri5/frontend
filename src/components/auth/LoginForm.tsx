"use client";

import { useState } from "react";

import Link from "next/link";

import { Button, CheckBox, Input } from "../common";

import { cn } from "@/utils/cn";

const cssConfig = {
  link: "relative body_5",
  line: "before:absolute before:left-[-1.2rem] before:top-[50%] before:block before:text-grayscale-400 before:content-['|'] before:translate-y-[-50%]",
};

export default function LoginForm() {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <form action="" className={cn("flex flex-col")}>
        <Input
          id="id"
          name="id"
          placeholder="아이디를 입력해주세요."
          labelClass="[&>div]:min-h-[5.6rem]"
          inputClass="h-[5.6rem] placeholder:text-gray-400"
        />
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          inputGroupClass="mt-[1.6rem]"
          labelClass="[&>div]:min-h-[5.6rem]"
          inputClass="h-[5.6rem] [&+button]:top-[50%] [&+button]:translate-y-[-50%] placeholder:text-gray-400"
        />
        <div className="flex_row">
          <CheckBox label="자동로그인" checked={checked} setChecked={setChecked} />
          <div className={cn("flex_row_center ml-auto")}>
            <p className={cn(cssConfig.link, "py-[1.6rem]")}>
              <Link href="/find-id">아이디 찾기</Link>
            </p>
            <p className={cn(cssConfig.link, "relative ml-[2rem]", cssConfig.line)}>
              <Link href="/find-password">비밀번호 찾기</Link>
            </p>
          </div>
        </div>
        <Button variant="textButton" size="lg" bgColor="bg-grayscale-200" className="w-[38.6rem] text-gray-300">
          로그인
        </Button>
      </form>
    </>
  );
}

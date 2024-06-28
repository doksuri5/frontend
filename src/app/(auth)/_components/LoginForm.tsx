"use client";

import { useState } from "react";

import { Button, CheckBox, Input } from "@/components/common";

import Link from "next/link";

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
          variant="default"
          placeholder="아이디를 입력해주세요."
          // caption="cation"
        />
        <Input
          id="password"
          name="password"
          type="password"
          variant="default"
          placeholder="비밀번호를 입력해주세요."
          inputGroupClass="mt-[1.6rem]"
          // caption="cation"
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
        <Button
          type="button"
          variant="textButton"
          size="lg"
          bgColor="bg-grayscale-200"
          className="w-[38.6rem] text-gray-300"
          disabled
        >
          로그인
        </Button>
      </form>
    </>
  );
}

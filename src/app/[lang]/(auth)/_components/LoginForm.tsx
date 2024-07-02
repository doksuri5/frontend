"use client";

import Link from "next/link";

import { useState } from "react";

import { Button, CheckBox, Input } from "@/components/common";

import useZodSchemaForm from "@/hooks/useZodSchemaForm";

import { TLoginSchema, loginSchema } from "@/types/AuthType";

import { cn } from "@/utils/cn";

const cssConfig = {
  link: "relative body_5",
  line: "before:absolute before:left-[-1.2rem] before:top-[50%] before:block before:text-grayscale-400 before:content-['|'] before:translate-y-[-50%]",
};

export default function LoginForm() {
  const [checked, setChecked] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useZodSchemaForm<TLoginSchema>(loginSchema);

  const onLoginSubmit = (data: TLoginSchema) => {
    // TODO : 로그인 로직
  };

  return (
    <>
      <form action="" className={cn("flex flex-col")} onSubmit={handleSubmit(onLoginSubmit)}>
        <Input
          id="email"
          type="email"
          // variant={errors.email ? "error" : "default"}
          placeholder="이메일을 입력해주세요."
          {...control.register("email")}
        />
        <Input
          id="password"
          type="password"
          // variant={errors.password?.message ? "error" : "default"}
          placeholder="비밀번호를 입력해주세요."
          inputGroupClass="mt-[1.6rem]"
          {...control.register("password")}
        />
        <div className="flex_row">
          <CheckBox label="자동로그인" checked={checked} setChecked={setChecked} name="autoLogin" />
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
          size="lg"
          bgColor={isValid ? "bg-navy-900" : "bg-grayscale-200"}
          className={isValid ? "text-white" : "text-gray-300"}
          disabled={!isValid}
        >
          로그인
        </Button>
      </form>
    </>
  );
}

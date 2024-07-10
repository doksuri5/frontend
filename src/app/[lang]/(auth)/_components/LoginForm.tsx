"use client";

import { useState } from "react";
import { Controller } from "react-hook-form";
import Link from "next/link";

import { Button, CheckBox, Input } from "@/components/common";

import useZodSchemaForm from "@/hooks/useZodSchemaForm";

import { TLoginSchema, loginSchema } from "@/types/AuthType";

import { cn } from "@/utils/cn";

import { loginAction } from "@/lib/auth-action";

import { FIND_EMAIL_PATH, FIND_PASSWORD_PATH } from "@/routes/path";

const cssConfig = {
  link: "relative body_5",
  line: "before:absolute before:left-[-1.2rem] before:top-[50%] before:block before:text-grayscale-400 before:content-['|'] before:translate-y-[-50%]",
};

export default function LoginForm() {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<string | undefined>("");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useZodSchemaForm<TLoginSchema>(loginSchema);

  const onLoginSubmit = (values: TLoginSchema) => {
    if (isValid) {
      loginAction(values).then((data) => {
        setError(data?.error);
      });
    }
  };

  return (
    <>
      <form className={cn("flex flex-col")} onSubmit={handleSubmit(onLoginSubmit)}>
        <Input
          id="email"
          type="email"
          placeholder="이메일을 입력해주세요."
          {...control.register("email")}
          variant={error ? "error" : "default"}
        />
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          inputGroupClass="mt-[1.6rem]"
          {...control.register("password")}
          variant={error ? "error" : "default"}
          caption={error}
        />
        <div className="flex_row">
          <Controller
            name="authLogin"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CheckBox
                label="자동로그인"
                checked={!!value}
                setChecked={(checked) => {
                  setChecked(checked);
                  onChange(checked);
                }}
                name="autoLogin"
              />
            )}
          />
          <div className={cn("flex_row_center ml-auto")}>
            <p className={cn(cssConfig.link, "py-[1.6rem]")}>
              <Link href={FIND_EMAIL_PATH}>아이디 찾기</Link>
            </p>
            <p className={cn(cssConfig.link, "relative ml-[2rem]", cssConfig.line)}>
              <Link href={FIND_PASSWORD_PATH}>비밀번호 찾기</Link>
            </p>
          </div>
        </div>
        <Button
          type="submit"
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

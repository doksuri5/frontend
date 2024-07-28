"use client";

import { useState, useTransition } from "react";
import { Controller } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button, CheckBox, Input, FormResultError } from "@/components/common";

import useZodSchemaForm from "@/hooks/useZodSchemaForm";
import useFormResultError from "@/hooks/useFormResultError";
import useToast from "@/hooks/use-toast";

import { TLoginSchema, loginSchema } from "@/types/AuthType";

import { cn } from "@/utils/cn";

import { loginAction } from "@/actions/auth-action";

import { HOME_PATH, FIND_EMAIL_PATH, FIND_PASSWORD_PATH } from "@/routes/path";

const cssConfig = {
  link: "relative body_5",
  line: "before:absolute before:left-[-1.2rem] before:top-[50%] before:block before:text-grayscale-400 before:content-['|'] before:translate-y-[-50%]",
};

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useZodSchemaForm<TLoginSchema>(loginSchema);

  const [_, setChecked] = useState(false);
  const { formResultError, setFormResultError } = useFormResultError(isValid);
  const [isPending, startTransition] = useTransition();
  const { showLoadingToast, updateToast } = useToast();
  const router = useRouter();

  const onLoginSubmit = async (values: TLoginSchema) => {
    if (isValid) {
      const toast = showLoadingToast("로그인 중입니다.");
      setFormResultError("");
      try {
        startTransition(async () => {
          const response = await loginAction(values);
          if (!!response.error) {
            updateToast(toast, "로그인 실패하였습니다.", "error");
            setFormResultError("이메일 또는 비밀번호를 다시 한번 확인해주세요.");
          } else {
            updateToast(toast, "로그인 성공하였습니다.", "success");
            router.replace(HOME_PATH);
          }
        });
      } catch (e) {
        console.error("Login Submit Error", e);
      }
    }
  };

  return (
    <>
      <form className={cn("flex flex-col")} onSubmit={handleSubmit(onLoginSubmit)}>
        <Input
          id="email"
          type="text"
          placeholder="이메일을 입력해주세요."
          disabled={isPending}
          {...control.register("email")}
          variant={errors.email || formResultError ? "error" : "default"}
          caption={errors.email?.message}
        />
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          disabled={isPending}
          inputGroupClass="mt-[1.6rem]"
          {...control.register("password")}
          variant={errors.password || formResultError ? "error" : "default"}
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
              <Link href={FIND_EMAIL_PATH}>이메일 찾기</Link>
            </p>
            <p className={cn(cssConfig.link, "relative ml-[2rem]", cssConfig.line)}>
              <Link href={FIND_PASSWORD_PATH}>비밀번호 찾기</Link>
            </p>
          </div>
        </div>
        {formResultError && <FormResultError message={formResultError} />}
        <Button
          type="submit"
          size="lg"
          bgColor={isValid && !isPending ? "bg-navy-900" : "bg-grayscale-200"}
          className={isValid && !isPending ? "text-white" : "text-gray-300"}
          disabled={!isValid || isPending}
        >
          로그인
        </Button>
      </form>
    </>
  );
}

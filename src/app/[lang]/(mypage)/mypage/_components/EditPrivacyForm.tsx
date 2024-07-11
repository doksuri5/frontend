"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "@/components/common";
import { cn } from "@/utils/cn";
import useUserStore from "@/stores/useUserStore";

type TEditPrivacyFormProps = {
  closeModal: () => void;
};
interface FormData {
  email: string;
  password: string;
  passwordChk: string;
  phone: string;
  birth: string;
}

export default function EditPrivacyForm({ closeModal }: TEditPrivacyFormProps) {
  const { userStoreData } = useUserStore();
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      email: userStoreData?.email,
      password: "",
      passwordChk: "",
      phone: userStoreData?.phone,
      birth: userStoreData?.birth,
    },
  });

  const watchRegister = watch();
  //실제 값이 입력된 필드만을 고려하여 폼의 유효성을 검사
  const hasValues = Object.values(watchRegister).every((value) => value !== undefined && value !== "");
  const isFormValid = !Object.keys(errors).length && hasValues && isIdAvailable;

  //Form 전송 함수
  const onSubmit = async (data: FormData) => {
    if (isValid && isDirty) {
      console.log(data);
      //유저 정보 수정 API
      closeModal();
    }
  };

  const password = watch("password");
  const passwordChk = watch("passwordChk");
  const phone = watch("phone");
  const birth = watch("birth");

  useEffect(() => {
    if (password !== passwordChk) {
      setError("passwordChk", { type: "manual", message: "비밀번호가 일치하지 않습니다." });
    } else {
      clearErrors("passwordChk");
    }
  }, [password, passwordChk, setError, clearErrors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex w-full flex-col gap-[1.6rem]")}>
      <Input id="email" labelName="이메일" value={userStoreData?.email} disabled />
      <div>
        <Input
          type="password"
          id="password"
          labelName="새 비밀번호 입력"
          placeholder="변경할 비밀번호를 입력해주세요."
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 8,
              message: "비밀번호는 최소 8자리 이상이어야 합니다.",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message: "숫자, 영문자, 특수문자를 포함해야 합니다.",
            },
          })}
          variant={errors.password ? "error" : "default"}
          caption={
            errors.password ? errors.password.message : "* 8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합"
          }
        />
        {errors.password && <span className="text-warning-100">{errors.password.message}</span>}
      </div>

      <div>
        <Input
          type="password"
          id="passwordChk"
          labelName="새 비밀번호 확인"
          placeholder="비밀번호를 다시 한번 입력해주세요."
          {...register("passwordChk", {
            required: "비밀번호 확인을 입력해주세요.",
          })}
          variant={errors.passwordChk ? "error" : "default"}
        />
        {errors.passwordChk && <span className="text-warning-100">{errors.passwordChk.message}</span>}
      </div>

      <div>
        <Input
          id="phone"
          labelName="휴대폰번호"
          placeholder="-를 제외한 휴대폰번호를 입력해주세요."
          {...register("phone", {
            required: "휴대폰 번호를 입력해주세요.",
            pattern: {
              value: /^\d{10,11}$/,
              message: "유효한 휴대폰 번호를 입력해주세요.",
            },
          })}
          variant={errors.phone ? "error" : "default"}
        />
        {errors.phone && <span className="text-warning-100">{errors.phone.message}</span>}
      </div>

      <div>
        <Input
          id="birth"
          labelName="생년월일"
          placeholder="생년월일 6자리를 입력해주세요.(예시 : 991231)"
          {...register("birth", {
            required: "생년월일을 입력해주세요.",
            pattern: {
              value: /^\d{6}$/,
              message: "생년월일은 6자리 숫자여야 합니다.",
            },
          })}
          variant={errors.birth ? "error" : "default"}
        />
        {errors.birth && <span className="text-warning-100">{errors.birth.message}</span>}
      </div>

      <Button
        type="submit"
        size="lg"
        bgColor={isValid && isDirty ? "bg-navy-900" : "bg-grayscale-200"}
        className={cn(`mt-[4rem] ${isValid && isDirty ? "text-white" : "text-gray-300"}`)}
        disabled={!isValid || !isDirty}
      >
        수정하기
      </Button>
    </form>
  );
}

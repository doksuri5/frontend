"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/components/common";
import { cn } from "@/utils/cn";
import { registerSchema, TRegisterSchemaType } from "@/types/AuthType";

type TEditPrivacyFormProps = {
  closeModal: () => void;
};

export default function EditPrivacyForm({ closeModal }: TEditPrivacyFormProps) {
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<TRegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const watchRegister = watch();
  //실제 값이 입력된 필드만을 고려하여 폼의 유효성을 검사
  const hasValues = Object.values(watchRegister).every((value) => value !== undefined && value !== "");
  const isFormValid = !Object.keys(errors).length && hasValues && isIdAvailable;

  //Form 전송 함수
  const onSubmit = async (data: TRegisterSchemaType) => {
    if (!isFormValid) return;
    console.log(data);
    //유저 정보 수정 API 추가
    closeModal();
  };

  //변경할 ID 중복 체크 함수
  const handleDuplicateCheck = async () => {
    if (isIdAvailable) {
      return;
    }

    const id = watchRegister.id;
    if (!id) {
      setError("id", { type: "manual", message: "아이디를 입력해주세요." });
      return;
    }

    //중복 확인 API가 들어갈 자리
    const isDuplicate = false;

    if (isDuplicate) {
      setError("id", { type: "manual", message: "이미 사용 중인 아이디입니다." });
      setIsIdAvailable(false);
    } else {
      clearErrors("id");
      setIsIdAvailable(true);
      alert("사용 가능한 아이디입니다.");
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "id") {
        setIsIdAvailable(false); //ID 입력 변경 시, ID 중복 재확인 필요
      }
      trigger(name); //실시간 유효성 검사 트리거
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex w-full flex-col gap-[1.6rem]")}>
      <div>
        <Input
          id="id"
          labelName="아이디"
          placeholder="아이디를 입력해주세요."
          {...register("id")}
          variant={errors.id ? "error" : "default"}
          caption={errors.id ? errors.id.message : "* 6~12자의 영문, 숫자, _,을 이용한 조합"}
          suffix={
            <Button
              type="button"
              variant="textButton"
              size="sm"
              bgColor={!errors.id && !isIdAvailable ? "bg-navy-900" : "bg-grayscale-200"}
              className={cn(`w-[12rem] ${!errors.id && !isIdAvailable ? "text-white" : "text-gray-300"}`)}
              disabled={isIdAvailable}
              onClick={handleDuplicateCheck}
            >
              중복 확인
            </Button>
          }
        />
      </div>
      <Input
        type="password"
        id="password"
        labelName="새 비밀번호 입력"
        placeholder="변경할 비밀번호를 입력해주세요."
        {...register("password")}
        variant={errors.password ? "error" : "default"}
        caption={
          errors.password ? errors.password.message : "* 8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합"
        }
      />
      <Input
        type="password"
        id="passwordChk"
        labelName="새 비밀번호 확인"
        placeholder="비밀번호를 다시 한번 입력해주세요."
        {...register("passwordChk")}
        variant={errors.passwordChk ? "error" : "default"}
        caption={errors.passwordChk ? errors.passwordChk.message : ""}
      />
      <div>
        <Input
          id="phone"
          labelName="휴대폰번호"
          placeholder="-를 제외한 휴대폰번호를 입력해주세요."
          {...register("phone")}
          variant={errors.phone ? "error" : "default"}
          caption={errors.phone ? errors.phone.message : ""}
        />
      </div>
      <Input
        id="birth"
        labelName="생년월일"
        placeholder="생년월일 6자리를 입력해주세요.(예시 : 991231)"
        {...register("birth")}
        variant={errors.birth ? "error" : "default"}
        caption={errors.birth ? errors.birth.message : ""}
      />
      <Button
        type="submit"
        size="lg"
        bgColor={isFormValid ? "bg-navy-900" : "bg-grayscale-200"}
        className={cn(`mt-[4rem] ${isFormValid ? "text-white" : "text-gray-300"}`)}
        disabled={!isFormValid}
      >
        수정하기
      </Button>
    </form>
  );
}

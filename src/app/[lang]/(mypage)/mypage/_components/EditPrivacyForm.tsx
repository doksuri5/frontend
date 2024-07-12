"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "@/components/common";
import { cn } from "@/utils/cn";
import useUserStore from "@/stores/useUserStore";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
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

  const password = watch("password");
  const passwordChk = watch("passwordChk");
  const formValid = Boolean(isValid && isDirty && (!password || password === passwordChk));

  // Form 전송 함수
  const onSubmit = async (data: FormData) => {
    if (!formValid) return;
    console.log(data);

    const formData = {
      email: data.email,
      password: data.password,
      phone: data.phone,
      birth: data.birth,
    };

    try {
      const response = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/updateUserInfo`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
      ).json();

      if (response.ok) {
        alert("회원정보가 수정되었습니다.");
        closeModal();
        router.refresh();
      }
    } catch (err) {
      alert("프로필 업데이트 실패: " + err);
    }
  };

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
            minLength: {
              value: 8,
              message: "비밀번호는 최소 8자리 이상이어야 합니다.",
            },
            maxLength: {
              value: 16,
              message: "비밀번호는 최대 16자리까지 입력 가능합니다.",
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
      </div>

      <div>
        <Input
          type="password"
          id="passwordChk"
          labelName="새 비밀번호 확인"
          placeholder="비밀번호를 다시 한번 입력해주세요."
          {...register("passwordChk", {
            validate: (value) => value === password || "비밀번호가 일치하지 않습니다.",
          })}
          variant={errors.passwordChk ? "error" : "default"}
          caption={errors.passwordChk ? errors.passwordChk.message : ""}
        />
      </div>

      <div>
        <Input
          id="phone"
          labelName="휴대폰번호"
          placeholder="-를 제외한 휴대폰번호를 입력해주세요."
          {...register("phone", {
            required: "휴대폰 번호를 입력해주세요.",
            validate: {
              containsHyphen: (value) => !/-/.test(value) || "-를 제외한 휴대폰번호를 입력해주세요.",
              correctLength: (value) => /^\d{10,11}$/.test(value) || "유효한 휴대폰 번호를 입력해주세요.",
            },
          })}
          variant={errors.phone ? "error" : "default"}
          caption={errors.phone ? errors.phone.message : ""}
        />
      </div>

      <div>
        <Input
          id="birth"
          labelName="생년월일"
          placeholder="생년월일 6자리를 입력해주세요.(예시 : 991231)"
          {...register("birth", {
            required: "생년월일을 입력해주세요.",
            validate: {
              correctLength: (value) => value.length === 6 || "생년월일은 반드시 6자리 숫자여야 합니다.",
              validFormat: (value) =>
                /^[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/.test(value) || "생년월일 형식이 올바르지 않습니다.",
            },
          })}
          variant={errors.birth ? "error" : "default"}
          caption={errors.birth ? errors.birth.message : ""}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        bgColor={formValid ? "bg-navy-900" : "bg-grayscale-200"}
        className={cn(`mt-[4rem] ${formValid ? "text-white" : "text-gray-300"}`)}
        disabled={!formValid}
      >
        수정하기
      </Button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Input, Button, Modal } from "@/components/common";

import useZodSchemaForm from "@/hooks/useZodSchemaForm";

import { cn } from "@/utils/cn";

import { TRegisterSchemaType, registerSchema } from "@/types/AuthType";

import { useRegisterStore } from "@/providers/RegisterProvider";

import { PROFILE_SETUP_PATH } from "@/routes/path";

export default function RegisterForm() {
  const { setForm } = useRegisterStore((state) => ({
    setForm: state.setForm,
  }));

  const router = useRouter();

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const {
    control: registerControl,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors, isValid: isRegisterValid },
    trigger: triggerRegister,
    watch: watchRegister,
  } = useZodSchemaForm<TRegisterSchemaType>(registerSchema);

  const emailVerificationHandler = async () => {
    const valid = await triggerRegister("email");
    if (valid) {
      setIsEmailVerified(true);
      setIsOpen(true);
    }
  };

  const handleSubmit = (data: TRegisterSchemaType) => {
    if (isRegisterValid) {
      const form = {
        name: data.name,
        email: data.email,
        password: data.password,
        birth: data.birth,
        phone: data.phone,
      };
      setForm({ form });
      // console.log(form);
      router.push(PROFILE_SETUP_PATH);
    }
  };

  return (
    <form onSubmit={handleRegisterSubmit(handleSubmit)}>
      {/* 회원가입 */}
      <div className={cn("flex flex-col gap-[1.6rem]")}>
        <Input id="name" labelName="이름" placeholder="이름을 입력해주세요." {...registerControl.register("name")} />
        <div>
          <Input
            id="email"
            labelName="이메일 주소"
            placeholder="이메일 주소를 입력해주세요."
            variant={registerErrors.email ? "error" : "default"}
            caption={registerErrors.email?.message}
            {...registerControl.register("email")}
            suffix={
              <Button
                type="button"
                variant="textButton"
                size="sm"
                bgColor={!registerErrors.email && watchRegister("email") ? "bg-navy-900" : "bg-grayscale-200"}
                className={cn(
                  `w-[12rem] ${!registerErrors.email && watchRegister("email") ? "text-white" : "text-gray-300"}`,
                )}
                disabled={!watchRegister("email")}
                onClick={emailVerificationHandler}
              >
                이메일 인증
              </Button>
            }
          />
          {isEmailVerified && (
            <Input
              id="emailCertification"
              placeholder="이메일 인증 코드 6자리 입력"
              {...registerControl.register("emailCertification")}
              inputGroupClass="mt-[.8rem]"
              variant={registerErrors.emailCertification ? "error" : "default"}
            />
          )}
        </div>
        <Input
          type="password"
          id="password"
          labelName="비밀번호 입력"
          placeholder="비밀번호를 입력해주세요."
          caption="*  8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합"
          {...registerControl.register("password")}
          variant={registerErrors.password ? "error" : "default"}
        />
        <Input
          type="password"
          id="passwordChk"
          labelName="비밀번호 확인"
          placeholder="비밀번호를 다시 한번 입력해주세요."
          {...registerControl.register("passwordChk")}
          variant={registerErrors.passwordChk ? "error" : "default"}
          caption={registerErrors.passwordChk?.message}
        />
        <div>
          <Input
            id="phone"
            labelName="휴대폰번호"
            placeholder="-를 제외한 휴대폰번호를 입력해주세요."
            {...registerControl.register("phone")}
            variant={registerErrors.phone ? "error" : "default"}
          />
        </div>
        <Input
          id="birth"
          labelName="생년월일"
          placeholder="생년월일 6자리를 입력해주세요.(예시 : 991231)"
          {...registerControl.register("birth")}
          variant={registerErrors.birth ? "error" : "default"}
        />
        <Button
          type="submit"
          size="lg"
          bgColor={isRegisterValid ? "bg-navy-900" : "bg-grayscale-200"}
          className={cn(`mt-[4rem] ${isRegisterValid ? "text-white" : "text-gray-300"}`)}
          disabled={!isRegisterValid}
        >
          다음
        </Button>
      </div>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} panelStyle="w-[38.6rem] py-[1.6rem] px-[3.2rem] rounded-[2rem]">
          <dl className="flex_col_center mb-[3.2rem]">
            <dt className="body_2 my-[.8rem] font-bold text-navy-900">인증링크를 전송했습니다.</dt>
            <dd className="text-center">
              작성한 이메일주소로 인증메일을 전송했습니다.
              <br />
              메일 확인 후 회원가입을 계속 진행해주세요.
            </dd>
          </dl>
          <Button type="button" variant="textButton" size="md" className="text-grayscale-0" onClick={closeModal}>
            확인
          </Button>
        </Modal>
      )}
    </form>
  );
}

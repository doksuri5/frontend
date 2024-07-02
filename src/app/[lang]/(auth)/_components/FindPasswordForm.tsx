"use client";

import { useState } from "react";

import { Input, Button, Modal } from "@/components/common";
import CommonLoginBtn from "./CommonLoginBtn";

import useZodSchemaForm from "@/hooks/useZodSchemaForm";

import { TFindPasswordSchema, findPasswordSchema } from "@/types/AuthType";

import { cn } from "@/utils/cn";

export default function FindPasswordForm() {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useZodSchemaForm<TFindPasswordSchema>(findPasswordSchema);

  const onFindPasswordSubmit = (data: TFindPasswordSchema) => {
    //console.log(data);
    setIsOpen(true);
  };

  return (
    <>
      <form className="auth_form_layout" onSubmit={handleSubmit(onFindPasswordSubmit)}>
        <Input
          id="name"
          labelName="이름"
          placeholder="이름을 입력해주세요."
          variant={errors.name ? "error" : "default"}
          {...control.register("name")}
        />
        <Input
          id="id"
          labelName="아이디"
          placeholder="아이디를 입력해주세요."
          variant={errors.id ? "error" : "default"}
          {...control.register("id")}
        />
        <Input
          id="email"
          labelName="이메일 주소"
          placeholder="가입 시 입력한 이메일주소를 입력해주세요."
          variant={errors.email ? "error" : "default"}
          caption={errors.email?.message}
          {...control.register("email")}
        />
        <Button
          size="lg"
          bgColor={isValid ? "bg-navy-900" : "bg-grayscale-200"}
          className={cn(`mt-[4rem] ${isValid ? "text-white" : "text-gray-300"}`)}
          disabled={!isValid}
        >
          임시 비밀번호 발급
        </Button>
      </form>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} panelStyle="w-[38.6rem] py-[1.6rem] px-[3.2rem] rounded-[2rem]">
          <dl className="flex_col_center mb-[3.2rem]">
            <dt className="body_2 my-[.8rem] font-bold text-navy-900">임시비밀번호가 발급되었습니다.</dt>
            <dd className="text-center">
              이메일을 확인하여 임시 비밀번호로
              <br /> 재로그인 후 비밀번호를 변경해주세요.
            </dd>
          </dl>
          <CommonLoginBtn />
        </Modal>
      )}
    </>
  );
}

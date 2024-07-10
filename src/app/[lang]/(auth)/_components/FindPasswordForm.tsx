"use client";

import { useState } from "react";

import { Input, Button, Modal } from "@/components/common";
import CommonLoginBtn from "./CommonLoginBtn";

import useZodSchemaForm from "@/hooks/useZodSchemaForm";

import { TFindPasswordSchema, findPasswordSchema } from "@/types/AuthType";

import { cn } from "@/utils/cn";

import Image from "next/image";

const snsTypeName = (value: string) => {
  switch (value) {
    case "naver": {
      return "네이버";
    }
    case "kakao": {
      return "카카오";
    }
    case "google": {
      return "구글";
    }
    default: {
      return "일반";
    }
  }
};

export default function FindPasswordForm() {
  const [snsUser, setSnsUser] = useState(false);
  const [snsType, setSnsType] = useState("local");

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const {
    control,
    handleSubmit,
    setError,
    trigger,
    formState: { errors, isValid },
  } = useZodSchemaForm<TFindPasswordSchema>(findPasswordSchema);

  const onFindPasswordSubmit = async (data: TFindPasswordSchema) => {
    const valid = await trigger(["email", "name"]);
    if (valid) {
      try {
        const response = await (
          await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/findPassword`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              name: data.name,
              email: data.email,
            }),
            cache: "no-store",
          })
        ).json();
        if (response.ok) {
          setIsOpen(true);
        } else {
          if (response.data) {
            setIsOpen(true);
            setSnsUser(true);
            setSnsType(response.data.login_type);
          }
          setError("email", { type: "manual", message: response.message });
        }
      } catch (e) {
        console.log(e);
      }
    }
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
            {snsUser ? (
              <>
                <dt className="body_2 my-[.8rem] font-bold text-navy-900">SNS 로그인으로 가입된 계정입니다.</dt>
                <dd className="flex_row_center">
                  <span className="mr-[.8rem] inline-flex">
                    <Image src={`/icons/icon_${snsType}.svg`} alt={"간편 로그인 로고"} width={20} height={20} />
                  </span>
                  {snsTypeName(snsType)} 로그인 해주세요.
                </dd>
              </>
            ) : (
              <>
                <dt className="body_2 my-[.8rem] font-bold text-navy-900">임시비밀번호가 발급되었습니다.</dt>
                <dd className="text-center">
                  이메일을 확인하여 임시 비밀번호로
                  <br /> 재로그인 후 비밀번호를 변경해주세요.
                </dd>
              </>
            )}
          </dl>
          <CommonLoginBtn />
        </Modal>
      )}
    </>
  );
}

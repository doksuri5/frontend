"use client";

import { useState } from "react";

import { Button, Input } from "@/components/common";
import FindIdComplete from "./FindIdComplete";

import useZodSchemaForm from "@/hooks/useZodSchemaForm";

import { TFindEmailSchema, findIdSchema } from "@/types/AuthType";

import { cn } from "@/utils/cn";

export default function FindIdForm() {
  const [show, setShow] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useZodSchemaForm<TFindEmailSchema>(findIdSchema);

  const onSubmit = (data: TFindEmailSchema) => {
    //console.log(data);
    setShow(true);
  };

  return (
    <>
      {show ? (
        <FindIdComplete />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="auth_form_layout">
          <Input id="name" labelName="이름" placeholder="이름을 입력해주세요." {...control.register("name")} />
          <Input
            id="phone"
            labelName="휴대전화"
            placeholder="-를 제외한 휴대폰번호를 입력해주세요."
            variant={errors.phone ? "error" : "default"}
            {...control.register("phone")}
            // caption="등록되지 않은 회원이거나 잘못된 회원정보입니다."
          />
          <Button
            type="submit"
            size="lg"
            bgColor={isValid ? "bg-navy-900" : "bg-grayscale-200"}
            className={cn(`mt-[4rem] ${isValid ? "text-white" : "text-gray-300"}`)}
            disabled={!isValid}
          >
            아이디 찾기
          </Button>
        </form>
      )}
    </>
  );
}

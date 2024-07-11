"use client";

import { useState } from "react";

import { Button, Input } from "@/components/common";

import FindEmailComplete from "./FindEmailComplete";

import useZodSchemaForm from "@/hooks/useZodSchemaForm";

import { TFindEmailSchema, findIdSchema } from "@/types/AuthType";

import { cn } from "@/utils/cn";

export default function FindEmailForm() {
  const [show, setShow] = useState(false);
  const [responseData, setResponseData] = useState({
    email: "",
    login_type: "local",
    created_at: "",
  });
  const {
    control,
    handleSubmit,
    trigger,
    watch,
    setError,
    formState: { errors, isValid },
  } = useZodSchemaForm<TFindEmailSchema>(findIdSchema);

  const onFindEmailSubmit = async (data: TFindEmailSchema) => {
    const valid = await trigger(["phone", "name"]);

    if (valid) {
      try {
        const response = await (
          await fetch(`/api/auth/find-email`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              name: data.name,
              phone: data.phone,
            }),
            cache: "no-store",
          })
        ).json();

        if (response.ok) {
          setShow(true);
          setResponseData(response.data);
        } else {
          setError("phone", { type: "manual", message: response.message });
          setError("name", { type: "manual", message: response.message });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      {show ? (
        <FindEmailComplete responseData={responseData} />
      ) : (
        <form onSubmit={handleSubmit(onFindEmailSubmit)} className="auth_form_layout">
          <Input
            id="name"
            labelName="이름"
            placeholder="이름을 입력해주세요."
            variant={errors.name ? "error" : "default"}
            {...control.register("name")}
          />
          <Input
            id="phone"
            labelName="휴대전화"
            placeholder="-를 제외한 휴대폰번호를 입력해주세요."
            variant={errors.phone ? "error" : "default"}
            {...control.register("phone")}
            caption={errors.phone?.message}
          />
          <Button
            type="submit"
            size="lg"
            bgColor={isValid ? "bg-navy-900" : "bg-grayscale-200"}
            className={cn(`mt-[4rem] ${isValid ? "text-white" : "text-gray-300"}`)}
            disabled={!isValid}
          >
            이메일 찾기
          </Button>
        </form>
      )}
    </>
  );
}

"use client";

import { useState, useTransition } from "react";

import { Button, Input } from "@/components/common";
import FormResultError from "@/components/common/FormResultError";

import FindEmailComplete from "./FindEmailComplete";

import useZodSchemaForm from "@/hooks/useZodSchemaForm";
import useFormResultError from "@/hooks/useFormResultError";

import { TFindEmailSchema, findIdSchema } from "@/types/AuthType";

import { cn } from "@/utils/cn";

export default function FindEmailForm() {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useZodSchemaForm<TFindEmailSchema>(findIdSchema);

  const [show, setShow] = useState(false);
  const [responseData, setResponseData] = useState({
    email: "",
    login_type: "local",
    created_at: "",
  });
  const { formResultError, setFormResultError } = useFormResultError(isValid);
  const [isPending, startTransition] = useTransition();

  const onFindEmailSubmit = async (data: TFindEmailSchema) => {
    const valid = await trigger(["phone", "name"]);

    if (valid) {
      try {
        startTransition(async () => {
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
            setFormResultError(response.message);
          }
        });
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
            disabled={isPending}
            variant={errors.name || formResultError ? "error" : "default"}
            {...control.register("name")}
          />
          <Input
            id="phone"
            labelName="휴대전화"
            placeholder="-를 제외한 휴대폰번호를 입력해주세요."
            disabled={isPending}
            variant={errors.phone || formResultError ? "error" : "default"}
            {...control.register("phone")}
            caption={errors.phone?.message}
          />
          {formResultError && <FormResultError message={formResultError} />}
          <Button
            type="submit"
            size="lg"
            bgColor={isValid && !isPending ? "bg-navy-900" : "bg-grayscale-200"}
            className={cn(`mt-[4rem] ${isValid && !isPending ? "text-white" : "text-gray-300"}`)}
            disabled={!isValid || isPending}
          >
            이메일 찾기
          </Button>
        </form>
      )}
    </>
  );
}

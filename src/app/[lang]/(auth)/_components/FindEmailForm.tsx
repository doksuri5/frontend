"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";

import { Button, FormResultError, Input } from "@/components/common";

import FindEmailComplete from "./FindEmailComplete";
import CommonLoadingBtn from "./CommonLoadingBtn";

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
  const t = useTranslations("auth");

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
            labelName={t("label.name", { defaultMessage: "이름" })}
            placeholder={t("placeholder.name", { defaultMessage: "이름을 입력해주세요." })}
            disabled={isPending}
            variant={errors.name || formResultError ? "error" : "default"}
            caption={errors.name?.message}
            {...control.register("name")}
          />
          <Input
            id="phone"
            labelName={t("label.phone", { defaultMessage: "휴대폰번호" })}
            placeholder={t("placeholder.phone", { defaultMessage: "-를 제외한 휴대폰번호를 입력해주세요." })}
            disabled={isPending}
            variant={errors.phone || formResultError ? "error" : "default"}
            {...control.register("phone")}
            caption={errors.phone?.message}
          />
          {formResultError && <FormResultError message={formResultError} />}
          <Button
            type="submit"
            size="lg"
            bgColor={isValid ? "bg-navy-900" : "bg-grayscale-200"}
            className={cn(`mt-[4rem] ${isValid ? "text-white" : "text-gray-300"}`)}
            disabled={!isValid || isPending}
          >
            {isPending ? <CommonLoadingBtn /> : t("title.findEmail", { defaultMessage: "이메일 찾기" })}
          </Button>
        </form>
      )}
    </>
  );
}

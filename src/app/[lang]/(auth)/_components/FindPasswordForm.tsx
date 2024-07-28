"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";

import { Input, Button, Modal, FormResultError } from "@/components/common";
import CommonLoginBtn from "./CommonLoginBtn";

import useZodSchemaForm from "@/hooks/useZodSchemaForm";
import useFormResultError from "@/hooks/useFormResultError";
import useToast from "@/hooks/use-toast";

import { TFindPasswordSchema, TFunction, findPasswordSchema } from "@/types/AuthType";

import { cn } from "@/utils/cn";

import Image from "next/image";

const snsTypeName = (value: string, t: TFunction) => {
  switch (value) {
    case "naver": {
      return t("sns.naver", { defaultMessage: "네이버" });
    }
    case "kakao": {
      return t("sns.kakao", { defaultMessage: "카카오" });
    }
    case "google": {
      return t("sns.google", { defaultMessage: "구글" });
    }
    default: {
      return t("sns.local", { defaultMessage: "일반" });
    }
  }
};

export default function FindPasswordForm() {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useZodSchemaForm<TFindPasswordSchema>(findPasswordSchema);

  const t = useTranslations("auth");

  const [snsUser, setSnsUser] = useState(false);
  const [snsType, setSnsType] = useState("local");
  const [isPending, startTransition] = useTransition();
  const { formResultError, setFormResultError } = useFormResultError(isValid);
  const { showLoadingToast, updateToast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const onFindPasswordSubmit = async (data: TFindPasswordSchema) => {
    const valid = await trigger(["email", "name"]);
    if (valid) {
      try {
        const toast = showLoadingToast(
          t("findPassword.issuingTempPassword", { defaultMessage: "임시 비밀번호가 발급 중입니다." }),
        );
        startTransition(async () => {
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
            updateToast(
              toast,
              t("findPassword.tempPasswordIssued", { defaultMessage: "임시 비밀번호 발급이 완료되었습니다." }),
              "success",
            );
            setIsOpen(true);
          } else {
            updateToast(
              toast,
              t("findPassword.tempPasswordIssueFailed", { defaultMessage: "임시 비밀번호 발급에 실패했습니다." }),
              "error",
            );
            if (response.data) {
              setIsOpen(true);
              setSnsUser(true);
              setSnsType(response.data.login_type);
            }
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
      <form className="auth_form_layout" onSubmit={handleSubmit(onFindPasswordSubmit)}>
        <Input
          {...control.register("name")}
          id="name"
          labelName={t("label.name", { defaultMessage: "이름" })}
          placeholder={t("placeholder.name", { defaultMessage: "이름을 입력해주세요." })}
          disabled={isPending}
          variant={errors.name || formResultError ? "error" : "default"}
          caption={
            errors.name?.message &&
            t("commonValidation.noSpecialCharsOrNumbers", { defaultMessage: errors.name?.message })
          }
        />
        <Input
          {...control.register("email")}
          id="email"
          labelName={t("label.email", { defaultMessage: "이메일 주소" })}
          placeholder={t("placeholder.registeredEmail", {
            defaultMessage: "가입 시 입력한 이메일주소를 입력해주세요.",
          })}
          disabled={isPending}
          variant={errors.email || formResultError ? "error" : "default"}
          caption={
            errors.email?.message && t("commonValidation.invalidEmailFormat", { defaultMessage: errors.email?.message })
          }
        />
        {formResultError && <FormResultError message={formResultError} />}
        <Button
          size="lg"
          bgColor={isValid && !isPending ? "bg-navy-900" : "bg-grayscale-200"}
          className={cn(`mt-[4rem] ${isValid && !isPending ? "text-white" : "text-gray-300"}`)}
          disabled={!isValid || isPending}
        >
          {t("commonBtn.issueTempPassword", { defaultMessage: "임시 비밀번호 발급" })}
        </Button>
      </form>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} panelStyle="w-[38.6rem] py-[1.6rem] px-[3.2rem] rounded-[2rem]">
          <dl className="flex_col_center mb-[3.2rem]">
            {snsUser ? (
              <>
                <dt className="body_2 my-[.8rem] font-bold text-navy-900">
                  {t("findPassword.snsLoginAccount", { defaultMessage: "SNS 로그인으로 가입된 계정입니다." })}
                </dt>
                <dd className="flex_row_center">
                  <span className="mr-[.8rem] inline-flex">
                    <Image src={`/icons/icon_${snsType}.svg`} alt="SNS logo" width={20} height={20} />
                  </span>
                  {snsTypeName(snsType, t)} {t("findPassword.pleaseLogin", { defaultMessage: "로그인 해주세요." })}
                </dd>
              </>
            ) : (
              <>
                <dt className="body_2 my-[.8rem] font-bold text-navy-900">
                  {t("findPassword.tempPasswordGenerated", { defaultMessage: "임시비밀번호가 발급되었습니다." })}
                </dt>
                <dd className="break-keep text-center">
                  {t("findPassword.checkEmailForTempPassword", {
                    defaultMessage: "이메일을 확인하여 임시 비밀번호로 재로그인 후 비밀번호를 변경해주세요.",
                  })}
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

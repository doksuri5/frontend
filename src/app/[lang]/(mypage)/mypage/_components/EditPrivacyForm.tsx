"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Input } from "@/components/common";
import { cn } from "@/utils/cn";
import useUserStore from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { updateUserInfo } from "../_api/privacyApi";
import useAlert from "@/hooks/use-alert";
import { useTranslations } from "next-intl";

type TEditPrivacyFormProps = {
  closeModal: () => void;
};

export interface FormData {
  email: string;
  password: string;
  passwordChk?: string;
  phone: string;
  birth: string;
}

export default function EditPrivacyForm({ closeModal }: TEditPrivacyFormProps) {
  const t = useTranslations("user")
  const { userStoreData } = useUserStore();
  const { alertInfo, customAlert } = useAlert();
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

  const onSubmit = async (data: FormData) => {
    if (!formValid) {
      return;
    }

    const formData = {
      email: data.email,
      password: data.password,
      phone: data.phone,
      birth: data.birth,
    };

    try {
      const response = await updateUserInfo(formData);

      if (response.ok) {
        customAlert({
          title: t("popup.memberInfoUpdated", { defaultMessage: "회원 정보가 수정되었습니다." }),
          subText: "",
          onClose: () => {
            closeModal();
            router.refresh();
          },
        });
      }
    } catch (err) {
      customAlert({
        title: t("popup.errorDuringMemberInfoUpdate", { defaultMessage: "회원 정보 수정 중 오류가 발생했습니다." }),
        subText: err instanceof Error ? err.message : t("popup.unknownIssue", { defaultMessage: "알 수 없는 오류가 발생했습니다." }),
        onClose: () => { },
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={cn("flex w-full flex-col gap-[1.6rem]")}>
        <Input id="email" labelName={t("email", { defaultMessage: "이메일" })} value={userStoreData?.email} disabled />
        <div>
          <Input
            type="password"
            id="password"
            labelName={t("form.inputNewPassword", { defaultMessage: "새 비밀번호 입력" })}
            placeholder={t("form.newPassword", { defaultMessage: "변경할 비밀번호를 입력해주세요." })}
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
            labelName={t("form.confirmNewPassword", { defaultMessage: "새 비밀번호 확인" })}
            placeholder={t("form.confirmPassword", { defaultMessage: "비밀번호를 한번 더 확인해 주세요." })}
            {...register("passwordChk", {
              validate: (value) => value === password || "동일한 비밀번호가 아닙니다. 다시 확인 후 입력해주세요.",
            })}
            variant={errors.passwordChk ? "error" : "default"}
            caption={errors.passwordChk ? errors.passwordChk.message : ""}
          />
        </div>

        <div>
          <Input
            id="phone"
            labelName={t("phone", { defaultMessage: "휴대폰번호" })}
            placeholder={t("form.enterPhone", { defaultMessage: "-를 제외한 휴대폰번호를 입력해주세요." })}
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
            labelName={t("birth", { defaultMessage: "생년월일" })}
            placeholder={t("form.enterBirth", { defaultMessage: "생년월일 6자리를 입력해주세요.(예시: 991231)" })}
            {...register("birth", {
              required: "생년월일을 입력해주세요.",
              validate: {
                correctLength: (value) => value.length === 6 || "생년월일은 반드시 6자리 숫자여야 합니다.",
                validFormat: (value) =>
                  /^[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/.test(value) ||
                  "생년월일 형식이 올바르지 않습니다.",
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
          {t("form.edit", { defaultMessage: "수정하기" })}
        </Button>
      </form>

      {/* Alert */}
      {alertInfo.open && (
        <Alert
          variant="checkCustomCloseButton"
          title={alertInfo.title}
          subText={alertInfo.subText}
          buttonText={alertInfo.buttonText}
          onClose={alertInfo.onClose}
        />
      )}
    </>
  );
}

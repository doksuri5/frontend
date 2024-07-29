"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { Button, CheckBox, FormResultError } from "@/components/common";

import AgreeContent from "./AgreeContent";

import { cn } from "@/utils/cn";

import { servicePolicyText } from "@/constants/servicePolicyText";
import { privacyPolicyText } from "@/constants/privacyPolicyText";

import { formatTextWithLineBreaks } from "@/utils/textUtils";

import { getAgreeContent } from "@/actions/auth";

import { AgreeDataType } from "@/types/AuthType";

import useFormResultError from "@/hooks/useFormResultError";

import { REGISTER_PATH } from "@/routes/path";

export default function AgreeForm() {
  const t = useTranslations("auth");
  const [agreedAll, setAgreedAll] = useState(false);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [agreeData, setAgreeData] = useState<AgreeDataType | undefined>(undefined);
  const { formResultError, setFormResultError } = useFormResultError(agreedAll);

  const { data: session } = useSession();

  const router = useRouter();

  const agreeAllChangeHandler = (checked: boolean) => {
    setAgreedAll(checked);
    setTerms(checked);
    setPrivacy(checked);
    setFormResultError("");
  };

  const individualChangeHandler = (setter: React.Dispatch<React.SetStateAction<boolean>>) => (checked: boolean) => {
    setter(checked);

    if (!checked) {
      setAgreedAll(false);
    } else {
      setAgreedAll((setter === setTerms && privacy) || (setter === setPrivacy && terms) || (terms && privacy));
      setFormResultError("");
    }
  };

  const nextStepHandler = () => {
    if (!agreedAll) {
      setFormResultError(t("termsAgreement.checkRequiredTerms", { defaultMessage: "필수 약관 동의를 체크해주세요." }));
      return;
    }

    if (agreedAll) {
      if (session) {
        signOut({ callbackUrl: REGISTER_PATH, redirect: true });
      } else {
        router.push(REGISTER_PATH);
      }
    }
  };

  useEffect(() => {
    // 약관 API
    async function fetchAgreeContent() {
      const res = await getAgreeContent();
      setAgreeData(res.data);
    }

    fetchAgreeContent();
  }, []);

  return (
    <div className={cn("flex flex-col gap-[1.6rem]")}>
      <div className="border-b-[.1rem] border-grayscale-300 pb-[1.6rem]">
        <CheckBox
          checked={agreedAll}
          setChecked={agreeAllChangeHandler}
          label={t("termsAgreement.agreeAll", { defaultMessage: "이용약관, 개인정보 처리방침에 모두 동의합니다." })}
          id="agreedAll"
          name="agreedAll"
          variants="radio"
          className="w-full justify-between"
          labelClass="body_3"
        />
      </div>
      {/* 서비스 이용악관  */}
      <div>
        <AgreeContent
          title={t("termsAgreement.termsOfService", { defaultMessage: "서비스 이용약관(필수)" })}
          content={agreeData ? formatTextWithLineBreaks(agreeData.termsOfService.content) : servicePolicyText}
        />
        <CheckBox
          checked={terms}
          setChecked={individualChangeHandler(setTerms)}
          label={t("termsAgreement.agree", { defaultMessage: "동의합니다." })}
          id="terms"
          name="terms"
          variants="radio"
          className="w-full justify-end"
        />
      </div>
      {/* 개인정보 처리방침  */}
      <div>
        <AgreeContent
          title={t("termsAgreement.privacyPolicy", { defaultMessage: "개인정보 처리방침(필수)" })}
          content={agreeData ? formatTextWithLineBreaks(agreeData.privacyPolicy.content) : privacyPolicyText}
        />
        <CheckBox
          checked={privacy}
          setChecked={individualChangeHandler(setPrivacy)}
          label={t("termsAgreement.agree", { defaultMessage: "동의합니다." })}
          id="privacy"
          name="privacy"
          variants="radio"
          className="w-full justify-end"
        />
      </div>
      <p className="mt-[1.6rem]">{formResultError && <FormResultError message={formResultError} />}</p>
      <Button
        type="button"
        size="lg"
        bgColor={`${agreedAll ? "bg-navy-900" : "bg-grayscale-200"}`}
        disabled={!agreedAll}
        className={`${agreedAll ? "text-grayscale-0" : "text-grayscale-300"} ${formResultError ? "mt-[1.6rem]" : "mt-[4rem]"}`}
        onClick={nextStepHandler}
      >
        {t("commonBtn.next", { defaultMessage: "다음" })}
      </Button>
    </div>
  );
}

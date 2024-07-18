"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { Button, CheckBox } from "@/components/common";

import AgreeContent from "./AgreeContent";

import { cn } from "@/utils/cn";

import { servicePolicyText } from "@/constants/servicePolicyText";
import { privacyPolicyText } from "@/constants/privacyPolicyText";

import { getAgreeContent } from "@/actions/agree";

import { formatTextWithLineBreaks } from "@/utils/textUtils";

import { AgreeDataType } from "@/types/AuthType";

import { REGISTER_PATH } from "@/routes/path";

export default function AgreeForm() {
  const [agreedAll, setAgreedAll] = useState(false);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [agreeData, setAgreeData] = useState<AgreeDataType | undefined>(undefined);

  const { data: session } = useSession();

  const router = useRouter();

  const agreeAllChangeHandler = (checked: boolean) => {
    setAgreedAll(checked);
    setTerms(checked);
    setPrivacy(checked);
  };

  const individualChangeHandler = (setter: React.Dispatch<React.SetStateAction<boolean>>) => (checked: boolean) => {
    setter(checked);

    if (!checked) {
      setAgreedAll(false);
    } else {
      setAgreedAll((setter === setTerms && privacy) || (setter === setPrivacy && terms) || (terms && privacy));
    }
  };

  const nextStepHandler = () => {
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
    <>
      <div className={cn("flex flex-col gap-[1.6rem]")}>
        <div className="border-b-[.1rem] border-grayscale-300 pb-[1.6rem]">
          <CheckBox
            checked={agreedAll}
            setChecked={agreeAllChangeHandler}
            label="이용악관, 개인정보 처리방침에 모두 동의합니다."
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
            title="서비스 이용악관(필수)"
            content={agreeData ? formatTextWithLineBreaks(agreeData.termsOfService.content) : servicePolicyText}
          />
          <CheckBox
            checked={terms}
            setChecked={individualChangeHandler(setTerms)}
            label="동의합니다."
            id="terms"
            name="terms"
            variants="radio"
            className="w-full justify-end"
          />
        </div>
        {/* 개인정보 처리방침  */}
        <div>
          <AgreeContent
            title="개인정보 처리방침(필수)"
            content={agreeData ? formatTextWithLineBreaks(agreeData.privacyPolicy.content) : privacyPolicyText}
          />
          <CheckBox
            checked={privacy}
            setChecked={individualChangeHandler(setPrivacy)}
            label="동의합니다."
            id="privacy"
            name="privacy"
            variants="radio"
            className="w-full justify-end"
          />
        </div>
        <Button
          type="button"
          size="lg"
          bgColor={`${agreedAll ? "bg-navy-900" : "bg-grayscale-200"}`}
          disabled={!agreedAll}
          className={`${agreedAll ? "text-grayscale-0" : "text-grayscale-300"} mt-[4rem]`}
          onClick={nextStepHandler}
        >
          다음
        </Button>
      </div>
    </>
  );
}

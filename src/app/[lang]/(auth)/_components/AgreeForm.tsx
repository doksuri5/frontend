"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { Button, CheckBox } from "@/components/common";

import Terms from "./Terms";
import Privacy from "./Privacy";

import { cn } from "@/utils/cn";

import { REGISTER_PATH } from "@/routes/path";

export default function AgreeForm() {
  const [agreedAll, setAgreedAll] = useState(false);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);

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

  return (
    <>
      {/* 약관동의  */}
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
        <div>
          <Terms />
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
        <div>
          <Privacy />
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

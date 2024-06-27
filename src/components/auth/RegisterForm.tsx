"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";

import Terms from "./Terms";
import Privacy from "./Privacy";
import { Button, CheckBox, Input } from "../common";

import { cn } from "@/utils/cn";

import EditIcon from "@/public/icons/avatar_edit.svg?component";

export default function RegisterForm() {
  const [agreedAll, setAgreedAll] = useState(false);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const router = useRouter();
  const [file, setFile] = useState("/icons/avatar_default.svg");

  const pathname = usePathname();

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
      if (terms && privacy) {
        setAgreedAll(true);
      } else if (setter === setTerms && privacy) {
        setAgreedAll(true);
      } else if (setter === setPrivacy && terms) {
        setAgreedAll(true);
      }
    }
  };

  const avatarChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length === 1) {
      const file = files[0];

      if (file.size > 1024 * 1024 * 1) {
        alert("최대 1MB까지 업로드 가능합니다.");
        e.target.value = ""; // 동일한 파일할 경우
        return;
      }

      setFile(URL.createObjectURL(file));
    }
  };

  const nextPage = (targetPath: string) => {
    router.push(targetPath);
  };

  const getVisibilityClass = (targetPath: string) => {
    if (pathname === targetPath) return "";
    return "hidden";
  };

  return (
    <>
      {/* <Button variant="textButton" size="sm" bgColor="bg-navy-900" className="w-[12.6rem]">
        버튼
      </Button> */}

      {/* 약관동의  */}
      <div className={cn("flex flex-col gap-[1.6rem]", getVisibilityClass("/agree"))}>
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
          onClick={() => nextPage("/register")}
        >
          다음
        </Button>
      </div>

      {/* 회원가입 */}
      <div className={cn("flex flex-col gap-[1.6rem]", getVisibilityClass("/register"))}>
        <div>
          <Input
            id="email"
            name="email"
            labelName="이메일 주소"
            placeholder="이메일 주소를 입력해주세요."
            labelClass="[&>div]:min-h-[5.6rem]"
            inputClass="h-[5.6rem] placeholder:text-gray-400"
          />
          <Input
            id="email_certification"
            name="email_certification"
            // labelName="인증 코드"
            placeholder="인증 코드를 입력해주세요."
            inputGroupClass="mt-[0.8rem] hidden"
            labelClass="[&>div]:min-h-[5.6rem]"
            inputClass="h-[5.6rem] placeholder:text-gray-400"
          />
        </div>
        <Input
          type="password"
          id="password"
          name="password"
          labelName="비밀번호 입력"
          placeholder="비밀번호를 입력해주세요."
          labelClass="[&>div]:min-h-[5.6rem]"
          inputClass="h-[5.6rem] placeholder:text-gray-400"
          caption="*  8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합"
        />
        <Input
          type="password"
          id="passwordChk"
          name="passwordChk"
          labelName="비밀번호 확인"
          placeholder="비밀번호를 다시 한번 입력해주세요."
          labelClass="[&>div]:min-h-[5.6rem]"
          inputClass="h-[5.6rem] placeholder:text-gray-400"
        />
        <div>
          <Input
            id="phone"
            name="phone"
            labelName="휴대폰번호"
            placeholder="-를 제외한 휴대폰번호를 입력해주세요."
            labelClass="[&>div]:min-h-[5.6rem]"
            inputClass="h-[5.6rem] placeholder:text-gray-400"
          />
          <Input
            id="phone_certification"
            name="phone_certification"
            // labelName="인증 코드"
            placeholder="인증 코드를 입력해주세요."
            inputGroupClass="mt-[0.8rem] hidden"
            labelClass="[&>div]:min-h-[5.6rem]"
            inputClass="h-[5.6rem] placeholder:text-gray-400"
          />
        </div>
        <Input
          id="birth"
          name="birth"
          labelName="생년월일"
          placeholder="생년월일 6자리를 입력해주세요.(예시 : 991231)"
          labelClass="[&>div]:min-h-[5.6rem]"
          inputClass="h-[5.6rem] placeholder:text-gray-400"
        />
        <Button
          type="button"
          size="lg"
          bgColor="bg-navy-900"
          className="mt-[4rem]"
          onClick={() => nextPage("/profile-setup")}
        >
          다음
        </Button>
      </div>

      {/* 프로필 */}
      <div className={cn(getVisibilityClass("/profile-setup"))}>
        <div className="flex_col_center relative mx-[auto] mb-[2.4rem] h-[12rem] w-[12rem]">
          <Image src={file} width={100} height={100} alt="프로필 이미지" />
          <input type="file" accept="image/*" id="file" name="file" className="hidden" onChange={avatarChangeHandler} />
          <label htmlFor="file" className="absolute bottom-[0] right-0 h-[4rem] w-[4rem] cursor-pointer">
            <EditIcon />
          </label>
        </div>
        <Input
          id="nickname"
          name="nickname"
          labelName="닉네임"
          placeholder="닉네임을 입력해주세요."
          labelClass="[&>div]:min-h-[5.6rem]"
          inputClass="h-[5.6rem] placeholder:text-gray-400"
        />
        <Button
          type="button"
          size="lg"
          bgColor="bg-navy-900"
          className="mt-[5.6rem]"
          onClick={() => nextPage("/register-complete")}
        >
          가입하기
        </Button>
      </div>
    </>
  );
}

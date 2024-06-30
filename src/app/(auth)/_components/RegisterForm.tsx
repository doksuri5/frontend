"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Select, { components } from "react-select";

import Image from "next/image";

import { Input, Button } from "@/components/common";

import useZodSchemaForm from "@/hooks/useZodSchemaForm";

import { cn } from "@/utils/cn";

import EditIcon from "@/public/icons/avatar_edit.svg?component";

import { PROFILE_SETUP_PATH, REGISTER_COMPLETE_PATH, REGISTER_PATH, VERIFY_USER_PATH } from "@/routes/path";

import {
  TProfileSchema,
  TRegisterSchemaType,
  TVerifyUserSchema,
  profileSchema,
  registerSchema,
  verifyUserSchema,
} from "@/types/AuthType";

const options = [
  { value: "tsla", label: "# 테슬라 ∙ TSLA" },
  { value: "apple", label: "# 애플 ∙ APPL" },
  { value: "amzn", label: "# 아마존 ∙ AMZN" },
  { value: "maft", label: "# MS ∙ MSFT" },
  { value: "googl", label: "# 구글 ∙ GOOGL" },
  { value: "u", label: "# 유니티 ∙ U" },
];

export default function RegisterForm() {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isGender, setIsGender] = useState<undefined | "M" | "F">(undefined);
  const [file, setFile] = useState("/icons/avatar_default.svg");

  const router = useRouter();
  const pathname = usePathname();

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

  const isGenderActive = (value: undefined | "M" | "F") => {
    setIsGender(value);
  };

  const {
    control: verifyControl,
    handleSubmit: handleVerifySubmit,
    formState: { errors: verifyErrors, isValid: isVerifyValid },
    trigger: triggerVerify,
    watch: watchVerify,
  } = useZodSchemaForm<TVerifyUserSchema>(verifyUserSchema);

  const {
    control: registerControl,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors, isValid: isRegisterValid },
    watch: watchRegister,
  } = useZodSchemaForm<TRegisterSchemaType>(registerSchema);

  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isValid: isProfileValid },
    watch: watchProfile,
  } = useZodSchemaForm<TProfileSchema>(profileSchema);

  const emailVerificationHandler = async () => {
    const valid = await triggerVerify("email");
    if (valid) {
      setIsEmailVerified(true);
    }
  };

  return (
    <>
      {/* 본인인증 */}
      <div className={cn("flex flex-col gap-[1.6rem]", getVisibilityClass(VERIFY_USER_PATH))}>
        <Input id="name" labelName="이름" placeholder="이름을 입력해주세요." {...verifyControl.register("name")} />
        <div>
          <Input
            id="email"
            labelName="이메일 주소"
            placeholder="이메일 주소를 입력해주세요."
            variant={verifyErrors.email ? "error" : "default"}
            caption={verifyErrors.email?.message}
            {...verifyControl.register("email")}
            suffix={
              <Button
                variant="textButton"
                size="sm"
                bgColor={!verifyErrors.email && watchVerify("email") ? "bg-navy-900" : "bg-grayscale-200"}
                className={cn(
                  `w-[12rem] ${!verifyErrors.email && watchVerify("email") ? "text-white" : "text-gray-300"}`,
                )}
                disabled={!watchVerify("email")}
                onClick={emailVerificationHandler}
              >
                이메일 인증
              </Button>
            }
          />
          {isEmailVerified && (
            <Input
              id="emailCertification"
              placeholder="이메일 인증 코드 6자리 입력"
              {...verifyControl.register("emailCertification")}
              inputGroupClass="mt-[.8rem]"
              variant={verifyErrors.emailCertification ? "error" : "default"}
              // suffix={
              //   <Button
              //     variant="textButton"
              //     size="sm"
              //     bgColor={
              //       !verifyErrors.emailCertification && watchVerify("emailCertification") ? "bg-navy-900" : "bg-grayscale-200"
              //     }
              //     className={cn(
              //       `w-[12rem] ${!verifyErrors.emailCertification && watchVerify("emailCertification") ? "text-white" : "text-gray-300"}`,
              //     )}
              //     disabled={!watchVerify("emailCertification")}
              //   >
              //     확인
              //   </Button>
              // }
            />
          )}
        </div>

        <Button
          type="button"
          size="lg"
          bgColor={isVerifyValid ? "bg-navy-900" : "bg-grayscale-200"}
          className={cn(`mt-[4rem] ${isVerifyValid ? "text-white" : "text-gray-300"}`)}
          disabled={!isVerifyValid}
          onClick={() => nextPage(REGISTER_PATH)}
        >
          다음
        </Button>
      </div>

      {/* 회원가입 */}
      <div className={cn("flex flex-col gap-[1.6rem]", getVisibilityClass(REGISTER_PATH))}>
        <div>
          <Input
            id="id"
            labelName="아이디"
            placeholder="아이디를 입력해주세요."
            {...registerControl.register("id")}
            variant={registerErrors.id ? "error" : "default"}
            caption="*  6~12자의 영문, 숫자, _,을 이용한 조합"
            suffix={
              <Button
                variant="textButton"
                size="sm"
                bgColor={!registerErrors.id && watchRegister("id") ? "bg-navy-900" : "bg-grayscale-200"}
                className={cn(
                  `w-[12rem] ${!registerErrors.id && watchRegister("id") ? "text-white" : "text-gray-300"}`,
                )}
                disabled={!watchRegister("id")}
              >
                중복 확인
              </Button>
            }
          />
        </div>
        <Input
          type="password"
          id="password"
          labelName="비밀번호 입력"
          placeholder="비밀번호를 입력해주세요."
          caption="*  8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합"
          {...registerControl.register("password")}
          variant={registerErrors.password ? "error" : "default"}
        />
        <Input
          type="password"
          id="passwordChk"
          labelName="비밀번호 확인"
          placeholder="비밀번호를 다시 한번 입력해주세요."
          {...registerControl.register("passwordChk")}
          variant={registerErrors.passwordChk ? "error" : "default"}
          caption={registerErrors.passwordChk?.message}
        />
        <div>
          <Input
            id="phone"
            labelName="휴대폰번호"
            placeholder="-를 제외한 휴대폰번호를 입력해주세요."
            {...registerControl.register("phone")}
            variant={registerErrors.phone ? "error" : "default"}
          />
        </div>
        <Input
          id="birth"
          labelName="생년월일"
          placeholder="생년월일 6자리를 입력해주세요.(예시 : 991231)"
          {...registerControl.register("birth")}
          variant={registerErrors.birth ? "error" : "default"}
        />
        <Button
          type="button"
          size="lg"
          bgColor={isRegisterValid ? "bg-navy-900" : "bg-grayscale-200"}
          className={cn(`mt-[4rem] ${isRegisterValid ? "text-white" : "text-gray-300"}`)}
          disabled={!isRegisterValid}
          onClick={() => nextPage(PROFILE_SETUP_PATH)}
        >
          다음
        </Button>
      </div>

      {/* 프로필 */}
      <div className={cn(getVisibilityClass(PROFILE_SETUP_PATH))}>
        <div className="flex_col_center relative mx-[auto] mb-[2.4rem] h-[12rem] w-[12rem]">
          <Image src={file} width={100} height={100} alt="프로필 이미지" priority />
          <input type="file" accept="image/*" id="file" name="file" className="hidden" onChange={avatarChangeHandler} />
          <label htmlFor="file" className="absolute bottom-[0] right-0 h-[4rem] w-[4rem] cursor-pointer">
            <EditIcon />
          </label>
        </div>
        <Input
          id="nickname"
          labelName="닉네임"
          placeholder="닉네임을 입력해주세요."
          {...profileControl.register("nickname")}
          suffix={
            <Button
              variant="textButton"
              size="sm"
              bgColor={!profileErrors.nickname && watchProfile("nickname") ? "bg-navy-900" : "bg-grayscale-200"}
              className={cn(
                `w-[12rem] ${!profileErrors.nickname && watchProfile("nickname") ? "text-white" : "text-gray-300"}`,
              )}
              disabled={!watchProfile("nickname")}
            >
              중복 확인
            </Button>
          }
        />
        <div className="mt-[1.6rem]">
          <p className="body-4 text-navy-900">관심 종목</p>
          <Select
            instanceId={"tags"}
            isMulti
            name={"tags"}
            options={options}
            className="basic-multi-select"
            classNamePrefix="tag"
            placeholder="#관심 종목을 추가해주세요."
            noOptionsMessage={() => "검색된 결과가 없습니다."}
            components={{
              IndicatorsContainer: () => null,
              IndicatorSeparator: () => null,
              Input: (props) => <components.Input {...props} aria-activedescendant={undefined} />,
            }}
          />
        </div>
        <div className="mt-[1.6rem]">
          <p className="body-4 text-navy-900">성별</p>
          <p className="flex_row gap-[.8rem]">
            <Button
              type="button"
              variant="textButton"
              size="md"
              bgColor={isGender === "M" ? "bg-navy-900" : "bg-white"}
              value="M"
              onClick={() => isGenderActive("M")}
            >
              남성
            </Button>
            <Button
              type="button"
              variant="textButton"
              size="md"
              bgColor={isGender === "F" ? "bg-navy-900" : "bg-white"}
              value="F"
              onClick={() => isGenderActive("F")}
            >
              여성
            </Button>
          </p>
        </div>
        <Button
          type="button"
          variant="textButton"
          size="lg"
          bgColor={isProfileValid ? "bg-navy-900" : "bg-grayscale-200"}
          className={cn(`mt-[4rem] ${isProfileValid ? "text-white" : "text-gray-300"}`)}
          disabled={!isProfileValid}
          onClick={() => nextPage(REGISTER_COMPLETE_PATH)}
        >
          가입하기
        </Button>
      </div>
    </>
  );
}

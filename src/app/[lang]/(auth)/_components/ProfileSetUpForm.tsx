"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Select, { components, MultiValue } from "react-select";

import { Controller } from "react-hook-form";

import Image from "next/image";

import { Input, Button } from "@/components/common";

import useZodSchemaForm from "@/hooks/useZodSchemaForm";

import { cn } from "@/utils/cn";

import EditIcon from "@/public/icons/avatar_edit.svg?component";

import { TProfileSchema, profileSchema } from "@/types/AuthType";

import { useRegisterStore } from "@/providers/RegisterProvider";

import { REGISTER_COMPLETE_PATH } from "@/routes/path";

import reduceImageSize from "@/utils/reduce-image-size";

type TOption = {
  [key: string]: string;
};

const options = [
  { value: "tsla", label: "# 테슬라 ∙ TSLA" },
  { value: "apple", label: "# 애플 ∙ APPL" },
  { value: "amzn", label: "# 아마존 ∙ AMZN" },
  { value: "maft", label: "# MS ∙ MSFT" },
  { value: "googl", label: "# 구글 ∙ GOOGL" },
  { value: "u", label: "# 유니티 ∙ U" },
];

export default function ProfileSetUpForm() {
  const form = useRegisterStore((state) => state.form);
  const [isGender, setIsGender] = useState<null | "M" | "F">(null);
  const [avatar, setAvatar] = useState("/icons/avatar_default.svg");
  const [isNicknameChk, setIsNicknameChk] = useState(false);
  const [nicknameValidated, setNicknameValidated] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isValid: isProfileValid },
    trigger: triggerProfile,
    watch: watchProfile,
    setError,
  } = useZodSchemaForm<TProfileSchema>(profileSchema);

  const isFormFilled = watchProfile("nickname");

  const avatarChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (avatar) {
      URL.revokeObjectURL(avatar);
    }
    const inputFile = e.target.files?.[0];
    if (!inputFile) return;

    const imgSrc = URL.createObjectURL(inputFile);
    setAvatar(imgSrc);
  };

  const isGenderActive = (value: null | "M" | "F") => {
    setIsGender(value);
  };

  const extractString = (value: string | undefined) => {
    if (value) {
      return value.replaceAll("-", "").slice(2);
    }
  };

  const registerFormData = (): { [key: string]: string | undefined | null } => {
    const commonData = {
      name: form.name || session?.user.name,
      email: form.email || session?.user.email,
      phone: form.phone || session?.user.phone?.replaceAll("-", ""),
      birth: form.birth || extractString(session?.user.birth),
    };

    if (session?.user.role) {
      return {
        ...commonData,
        sns_id: session.user.id || "",
        login_type: session.user.role,
      };
    }

    return {
      ...commonData,
      password: form.password,
    };
  };

  const nicknameChkHandler = async () => {
    const valid = await triggerProfile("nickname");
    const nickname = watchProfile("nickname");

    if (valid) {
      try {
        const response = await (
          await fetch(`/api/auth/nickname`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              nickname,
            }),
          })
        ).json();

        if (response.ok) {
          setIsNicknameChk(true);
          setNicknameValidated(true);
        } else {
          setError("nickname", { type: "manual", message: response.message });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleSubmit = async (data: TProfileSchema) => {
    //console.log("registerFormData", registerFormData());

    const jpeg = await reduceImageSize(avatar);
    const file = new File([jpeg], new Date().toString(), { type: "image/jpeg" });

    const formData = new FormData();
    if (isGender) {
      formData.append("gender", isGender);
    }
    if (file) {
      formData.append("profile", file);
    }

    if (data.tags) {
      formData.append("interest_stocks", JSON.stringify(data.tags.map((item) => item.value)));
    }

    formData.append("nickname", data.nickname);

    const additionalData = registerFormData();
    for (const key in additionalData) {
      if (additionalData.hasOwnProperty(key)) {
        formData.append(key, String(additionalData[key]));
      }
    }

    const PATH = session?.user.role ? "registerSocial" : "register";

    try {
      const response = await (
        await fetch(`http://localhost:8080/api/auth/${PATH}`, {
          method: "POST",
          body: formData,
        })
      ).json();
      console.log(response);
      if (response.ok) {
        router.push(REGISTER_COMPLETE_PATH);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setIsNicknameChk(false);
    setNicknameValidated(false);
  }, [isFormFilled]);

  return (
    <form onSubmit={handleProfileSubmit(handleSubmit)}>
      {/* 프로필 이미지 */}
      <div className="flex_col_center relative mx-[auto] mb-[2.4rem] h-[12rem] w-[12rem]">
        <figure className="relative h-full w-full overflow-hidden rounded-[50%]">
          <Image
            src={avatar ? avatar : "/icons/avatar_default.svg"}
            fill
            alt="프로필 이미지"
            priority
            className="object-cover"
          />
        </figure>
        <input type="file" accept="image/*" id="file" name="file" className="hidden" onChange={avatarChangeHandler} />
        <label htmlFor="file" className="absolute bottom-[0] right-0 z-[10] h-[4rem] w-[4rem] cursor-pointer">
          <EditIcon />
        </label>
      </div>
      {/* 닉네임 */}
      <Input
        id="nickname"
        labelName="닉네임"
        placeholder="닉네임을 입력해주세요."
        {...profileControl.register("nickname")}
        variant={profileErrors.nickname ? "error" : "default" || isNicknameChk ? "success" : "default"}
        caption={nicknameValidated ? "* 사용가능한 닉네임 입니다." : profileErrors.nickname?.message}
        suffix={
          <Button
            type="button"
            variant="textButton"
            size="sm"
            bgColor={!profileErrors.nickname && watchProfile("nickname") ? "bg-navy-900" : "bg-grayscale-200"}
            className={cn(
              `w-[12rem] ${!profileErrors.nickname && watchProfile("nickname") ? "text-white" : "text-gray-300"}`,
            )}
            disabled={!watchProfile("nickname")}
            onClick={nicknameChkHandler}
          >
            중복 확인
          </Button>
        }
      />
      {/* 관심 종목 */}
      <div className="mt-[1.6rem]">
        <p className="body-4 text-navy-900">관심 종목</p>
        <Controller
          name="tags"
          control={profileControl}
          render={({ field }) => (
            <Select
              {...field}
              instanceId={"tags"}
              isMulti
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
              onChange={(selected: MultiValue<TOption>) => field.onChange(selected)}
            />
          )}
        />
      </div>
      {/* 성별 */}
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
      {/* 가입하기 버튼 */}
      <Button
        type="submit"
        variant="textButton"
        size="lg"
        bgColor={isProfileValid ? "bg-navy-900" : "bg-grayscale-200"}
        className={cn(`mt-[4rem] ${isProfileValid ? "text-white" : "text-gray-300"}`)}
        disabled={!isProfileValid}
      >
        가입하기
      </Button>
    </form>
  );
}

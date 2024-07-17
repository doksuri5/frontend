"use client";

import { useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Select, { components, MultiValue } from "react-select";

import { Controller } from "react-hook-form";

import Image from "next/image";

import { Input, Button, Modal } from "@/components/common";
import PropensityInvest from "@/components/common/PropensityInvest";

import useZodSchemaForm from "@/hooks/useZodSchemaForm";

import { useRegisterStore } from "@/providers/RegisterProvider";

import { cn } from "@/utils/cn";
import reduceImageSize from "@/utils/reduce-image-size";

import { TProfileSchema, profileSchema } from "@/types/AuthType";

import { REGISTER_COMPLETE_PATH } from "@/routes/path";

import EditIcon from "@/public/icons/avatar_edit.svg?component";

type TOption = {
  value: string;
  label: string;
};

const options = [
  { value: "TSLA.O", label: "# 테슬라 ∙ TSLA" },
  { value: "AAPL.O", label: "# 애플 ∙ APPL" },
  { value: "AMZN.O", label: "# 아마존 ∙ AMZN" },
  { value: "MSFT.O", label: "# MS ∙ MSFT" },
  { value: "GOOGL.O", label: "# 구글 ∙ GOOGL" },
  { value: "U", label: "# 유니티 ∙ U" },
];

const extractString = (value: string | undefined) => {
  if (value) {
    return value.replaceAll("-", "").slice(2);
  }
};

export default function ProfileSetUpForm() {
  const form = useRegisterStore((state) => state.form);
  const [isGender, setIsGender] = useState<null | "M" | "F">(null);
  const [avatar, setAvatar] = useState("");
  const [isNicknameChk, setIsNicknameChk] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isValid: isProfileValid },
    trigger: triggerProfile,
    watch: watchProfile,
    setError,
    setValue,
  } = useZodSchemaForm<TProfileSchema>(profileSchema);

  const closeModal = () => setIsOpen(false);

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

  // 닉네임 중복 확인 버튼 클릭시 실행되는 이벤트
  const nicknameChkHandler = (value: string) => async () => {
    const valid = await triggerProfile("nickname");
    const nickname = watchProfile("nickname");

    if (value === "닉네임 변경") {
      setIsNicknameChk(false);
      return;
    }

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
            cache: "no-store",
          })
        ).json();
        if (response.ok) {
          setIsNicknameChk(true);
        } else {
          setError("nickname", { type: "manual", message: response.message });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  // 가입하기 버튼 클릭시 실행되는 이벤트
  const onProfileSetUpSubmit = async (data: TProfileSchema) => {
    const formData = new FormData();

    if (isGender) {
      formData.append("gender", isGender);
    }

    if (avatar) {
      const jpeg = await reduceImageSize(avatar);
      const file = new File([jpeg], new Date().toString(), { type: "image/jpeg" });
      formData.append("profile", file);
    }

    if (data.tags) {
      formData.append("reuters_code", JSON.stringify(data.tags.map((item) => item.value)));
    }
    formData.append("nickname", data.nickname);
    const additionalData = registerFormData();
    for (const key in additionalData) {
      if (additionalData.hasOwnProperty(key)) {
        formData.append(key, String(additionalData[key]));
      }
    }

    const PATH = session?.user.role ? "registerSocial" : "register";

    if (isProfileValid && isNicknameChk) {
      try {
        startTransition(async () => {
          const response = await (
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/${PATH}`, {
              method: "POST",
              body: formData,
              cache: "no-store",
            })
          ).json();
          if (response.ok) {
            router.push(REGISTER_COMPLETE_PATH);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <form onSubmit={handleProfileSubmit(onProfileSetUpSubmit)}>
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
        disabled={isPending}
        {...profileControl.register("nickname")}
        variant={profileErrors.nickname ? "error" : "default" || isNicknameChk ? "success" : "default"}
        caption={profileErrors.nickname?.message || (isNicknameChk ? "* 사용가능한 닉네임 입니다." : undefined)}
        readOnly={isNicknameChk}
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
            onClick={nicknameChkHandler(isNicknameChk ? "닉네임 변경" : "중복 확인")}
          >
            {isNicknameChk ? "닉네임 변경" : "중복 확인"}
          </Button>
        }
      />
      {/* 관심 종목 */}
      <div className="mt-[1.6rem]">
        <p className="body-4 text-navy-900">관심 종목</p>
        <Controller
          name="tags"
          control={profileControl}
          disabled={isPending}
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
              onChange={(selected: MultiValue<TOption>) => {
                field.onChange(selected);
                setValue("tags", selected as unknown as TOption[], { shouldValidate: true });
              }}
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
            disabled={isPending}
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
            disabled={isPending}
          >
            여성
          </Button>
        </p>
      </div>
      {/* 투자 성향 등록하기 버튼 */}
      <Button
        type="button"
        variant="textButton"
        size="lg"
        className="mt-[4rem] text-white"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        투자 성향 등록하기
      </Button>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          closeIcon={true}
          panelStyle="w-[80rem] py-[1.6rem] px-[3.2rem] rounded-[2rem]"
        >
          <PropensityInvest />
        </Modal>
      )}
      {/* 가입하기 버튼 */}
      <Button
        type="submit"
        variant="textButton"
        size="lg"
        bgColor={isProfileValid && isNicknameChk && !isPending ? "bg-navy-900" : "bg-grayscale-200"}
        className={cn(`mt-[4rem] ${isProfileValid && isNicknameChk && !isPending ? "text-white" : "text-gray-300"}`)}
        disabled={(!isProfileValid && !isNicknameChk) || isPending}
      >
        가입하기
      </Button>
    </form>
  );
}

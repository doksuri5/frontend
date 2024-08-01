"use client";

import { useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Select, { components, MultiValue } from "react-select";

import { Controller } from "react-hook-form";

import Image from "next/image";

import { Input, Button, Modal, Alert } from "@/components/common";
import InvestPropensity from "@/components/common/InvestPropensity";
import CommonLoadingBtn from "./CommonLoadingBtn";

import useZodSchemaForm from "@/hooks/useZodSchemaForm";
import useAlert from "@/hooks/use-alert";

import { useRegisterStore } from "@/providers/RegisterProvider";

import { cn } from "@/utils/cn";
import reduceImageSize from "@/utils/reduce-image-size";

import { TFunction, TProfileSchema, profileSchema } from "@/types/AuthType";

import { REGISTER_COMPLETE_PATH, REGISTER_PATH } from "@/routes/path";

import EditIcon from "@/public/icons/avatar_edit.svg?component";
import { TInvestPropensityDetails } from "@/types/investPropensityType";

type TOption = {
  value: string;
  label: string;
};

const getOptions = (t: TFunction) => [
  { value: "TSLA.O", label: `# ${t("stockTSLA", { defaultMessage: "테슬라" })} ∙ TSLA` },
  { value: "AAPL.O", label: `# ${t("stockAAPL", { defaultMessage: "애플" })} ∙ APPL` },
  { value: "AMZN.O", label: `# ${t("stockAMZN", { defaultMessage: "아마존" })} ∙ AMZN` },
  { value: "MSFT.O", label: `# ${t("stockMSFT", { defaultMessage: "MS" })} ∙ MSFT` },
  { value: "GOOGL.O", label: `# ${t("stockGOOGL", { defaultMessage: "구글" })} ∙ GOOGL` },
  { value: "U", label: `# ${t("stockU", { defaultMessage: "유니티" })} ∙ U` },
];

const extractString = (value: string | undefined) => {
  if (value) {
    return value.replaceAll("-", "").slice(2);
  }
};

export default function ProfileSetUpForm() {
  const t = useTranslations("auth");
  const stocks = useTranslations("stocks");
  const options = getOptions(stocks);

  const form = useRegisterStore((state) => state.form);
  const [isGender, setIsGender] = useState<null | "M" | "F">(null);
  const [avatar, setAvatar] = useState("");
  const [isNicknameChk, setIsNicknameChk] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isOpenOfInvestPropensity, setIsOpenOfInvestPropensity] = useState(false);
  const [isOpenOfSuggestion, setIsOpenOfSuggestion] = useState(false);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();
  const { alertInfo, customAlert } = useAlert();

  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isValid: isProfileValid },
    trigger: triggerProfile,
    watch: watchProfile,
    setError,
    setValue,
    getValues,
  } = useZodSchemaForm<TProfileSchema>(profileSchema, { isAgreeCreditInfo: false });

  // 폼 제출 제어
  useEffect(() => {
    if (isReadyToSubmit) {
      handleProfileSubmit(onProfileSetUpSubmit)();
      setIsReadyToSubmit(false); // 제출 후 상태 초기화
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReadyToSubmit]);

  const isAgreeCreditInfo = watchProfile("isAgreeCreditInfo");

  const avatarChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (avatar) {
      URL.revokeObjectURL(avatar);
    }
    const inputFile = e.target.files?.[0];
    if (!inputFile) return;

    if (inputFile.size > 1024 * 1024 * 1) {
      customAlert({
        title: t("profileSetUp.uploadLimit", { defaultMessage: "최대 1MB 이하의 이미지 파일만 업로드 가능합니다." }),
        subText: "",
        onClose: () => {},
      });
      e.target.value = "";
    } else {
      const imgSrc = URL.createObjectURL(inputFile);
      setAvatar(imgSrc);
    }
  };

  const isGenderActive = (value: null | "M" | "F") => {
    setIsGender(value);
  };

  // InvestPropensity폼에서 넘어온 데이터 처리
  const handleFormSubmit = (data: TInvestPropensityDetails) => {
    setIsOpenOfInvestPropensity(false);
    setValue("investPropensity", data);
    setValue("isAgreeCreditInfo", true);
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

    if (value === t("profileSetUp.changeNickname", { defaultMessage: "닉네임 변경" })) {
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
          setError("nickname", { type: "manual", message: "nicknameUnavailable" });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  // 가입하기 버튼 클릭시 실행되는 이벤트
  const onProfileSetUpSubmit = async (data: TProfileSchema) => {
    if (!isReadyToSubmit) return;

    const formData = new FormData();

    const additionalData = registerFormData();

    for (const key in additionalData) {
      if (additionalData.hasOwnProperty(key)) {
        if (additionalData[key] === undefined || additionalData[key] === null || additionalData[key] === "") {
          setIsOpenOfSuggestion(false);
          customAlert({
            title: t("profileSetUp.signupError", { defaultMessage: "일시적인 오류로 인해 회원가입에 실패하였습니다." }),
            subText: t("profileSetUp.retrySignup", { defaultMessage: "다시 회원가입을 시도해주세요." }),
            onClose: () => {
              router.replace(REGISTER_PATH);
              return;
            },
          });
        } else {
          formData.append(key, String(additionalData[key]));
        }
      }
    }

    if (isGender) {
      formData.append("gender", isGender);
    }

    if (avatar) {
      const jpeg = await reduceImageSize(avatar);
      const file = new File([jpeg], new Date().toString(), { type: "image/jpeg" });
      formData.append("profile", file);
    }

    if (data.tags) {
      formData.append("reuters_code", JSON.stringify(data.tags.map((item: TOption) => item.value)));
    }

    formData.append("nickname", data.nickname);

    formData.append("isAgreeCreditInfo", JSON.stringify(getValues("isAgreeCreditInfo")));

    formData.append("investPropensity", JSON.stringify(getValues("investPropensity")));

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
            router.replace(REGISTER_COMPLETE_PATH);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  // 가입하기 버튼 클릭했을 때 실행되는 함수
  const handleSubmitButton = (e: any) => {
    e.preventDefault();
    if (isProfileValid && isNicknameChk && !isAgreeCreditInfo) {
      setIsOpenOfSuggestion(true); // 투자 성향 권유 모달 열기
    } else {
      setIsReadyToSubmit(true); // 폼 제출 트리거
    }
  };

  return (
    <>
      <form onSubmit={handleProfileSubmit(onProfileSetUpSubmit)}>
        {/* 프로필 이미지 */}
        <div className="flex_col_center relative mx-[auto] mb-[2.4rem] h-[12rem] w-[12rem]">
          <figure className="relative h-full w-full overflow-hidden rounded-[50%]">
            <Image
              src={avatar ? avatar : "/icons/avatar_default.svg"}
              fill
              alt={t("label.profileImage", { defaultMessage: "프로필 이미지" })}
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
          labelName={t("label.nickname", { defaultMessage: "닉네임" })}
          placeholder={t("placeholder.nickname", { defaultMessage: "닉네임을 입력해주세요." })}
          disabled={isPending}
          {...profileControl.register("nickname")}
          variant={profileErrors.nickname ? "error" : "default" || isNicknameChk ? "success" : "default"}
          caption={
            (profileErrors.nickname?.message &&
              t(`commonValidation.${profileErrors.nickname?.message}`, {
                defaultMessage: profileErrors.nickname?.message,
              })) ||
            (isNicknameChk
              ? `* ${t("profileSetUp.nicknameAvailable", { defaultMessage: "사용가능한 닉네임 입니다." })}`
              : undefined)
          }
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
              onClick={nicknameChkHandler(
                isNicknameChk
                  ? t("profileSetUp.changeNickname", { defaultMessage: "닉네임 변경" })
                  : t("profileSetUp.checkDuplicate", { defaultMessage: "중복 확인" }),
              )}
            >
              {isNicknameChk
                ? t("profileSetUp.changeNickname", { defaultMessage: "닉네임 변경" })
                : t("profileSetUp.checkDuplicate", { defaultMessage: "중복 확인" })}
            </Button>
          }
        />
        {/* 관심 종목 */}
        <div className="mt-[1.6rem]">
          <p className={`body-4 text-navy-900`}>{t("label.interestStock", { defaultMessage: "관심 종목" })}</p>
          <Controller
            name="tags"
            control={profileControl}
            disabled={isPending}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  instanceId={"tags"}
                  isMulti
                  options={options}
                  className={`basic-multi-select ${profileErrors.tags ? "error" : ""}`}
                  classNamePrefix="tag"
                  placeholder={t("placeholder.addInterestStock", { defaultMessage: "#관심 종목을 추가해주세요." })}
                  noOptionsMessage={() =>
                    t("profileSetUp.noSearchResults", { defaultMessage: "검색된 결과가 없습니다." })
                  }
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
                {profileErrors.tags && (
                  <span className="caption pt-[0.4rem] text-warning-100">
                    {t("profileSetUp.addAtLeastOneInterestStock", {
                      defaultMessage: "관심 종목은 최소 1개 추가해주세요.",
                    })}
                  </span>
                )}
              </>
            )}
          />
        </div>
        {/* 성별 */}
        <div className="mt-[1.6rem]">
          <p className="body-4 text-navy-900">{t("label.gender", { defaultMessage: "성별" })}</p>
          <p className="flex_row gap-[.8rem]">
            <Button
              type="button"
              variant="textButton"
              size="sm"
              className="h-[48px]"
              bgColor={isGender === "M" ? "bg-navy-900" : "bg-white"}
              value="M"
              onClick={() => isGenderActive("M")}
              disabled={isPending}
            >
              {t("profileSetUp.male", { defaultMessage: "남성" })}
            </Button>
            <Button
              type="button"
              variant="textButton"
              size="sm"
              className="h-[48px]"
              bgColor={isGender === "F" ? "bg-navy-900" : "bg-white"}
              value="F"
              onClick={() => isGenderActive("F")}
              disabled={isPending}
            >
              {t("profileSetUp.female", { defaultMessage: "여성" })}
            </Button>
          </p>
        </div>
        {/* 투자 성향 등록 버튼 */}
        <div className="flex justify-between">
          <p className="body_4 mt-[4rem] flex flex-col items-start">
            <span>{t("profileSetUp.registerInvestmentPreference", { defaultMessage: "투자 성향을 등록하면" })}</span>
            <span>
              {t("profileSetUp.registerInvestmentPreferenceInfo", {
                defaultMessage: "더 정확한 정보를 받을 수 있습니다!",
              })}
            </span>
          </p>
          <Button
            type="button"
            variant="textButton"
            size="sm"
            className="body_4 mt-[4rem] h-[48px] w-[160px]"
            bgColor={isAgreeCreditInfo ? "bg-navy-900" : "bg-white"}
            onClick={() => {
              setIsOpenOfInvestPropensity(true);
            }}
          >
            {t("profileSetUp.registerInvestmentPreferenceButton", { defaultMessage: "투자 성향 등록하기" })}
          </Button>
        </div>
        {/* 투자 성향 등록 모달 폼 */}
        {isOpenOfInvestPropensity && (
          <Modal
            isOpen={isOpenOfInvestPropensity}
            onClose={() => {
              setIsOpenOfInvestPropensity(false);
              setIsOpenOfSuggestion(false);
            }}
            closeIcon={true}
            panelStyle="w-[80rem] py-[1.6rem] px-[3.2rem] rounded-[2rem]"
          >
            <InvestPropensity onSubmit={handleFormSubmit} />
          </Modal>
        )}
        {/* 가입하기 버튼 */}
        <Button
          variant="textButton"
          type="submit"
          size="lg"
          bgColor={isProfileValid && isNicknameChk ? "bg-navy-900" : "bg-grayscale-200"}
          className={cn(`mt-[4rem] ${isProfileValid && isNicknameChk ? "text-white" : "text-gray-300"}`)}
          disabled={!(isProfileValid && isNicknameChk) || isPending}
          onClick={handleSubmitButton}
        >
          {isPending ? <CommonLoadingBtn /> : t("commonBtn.register", { defaultMessage: "가입하기" })}
        </Button>
        {/* 투자 성향 분석 권유 팝업 */}
        {isOpenOfSuggestion && (
          <Modal
            isOpen={isOpenOfSuggestion}
            onClose={() => setIsOpenOfSuggestion(false)}
            closeIcon={true}
            panelStyle="w-[60rem] py-[4rem] px-[3rem] rounded-[2rem]"
          >
            <div className="px-[4rem]">
              <p className="body_1 mb-16 flex flex-col text-center font-bold">
                <span>
                  {t("profileSetUp.noInvestmentPreference", { defaultMessage: "투자 성향을 등록하지 않으셨습니다." })}
                </span>
                <span>
                  {t("profileSetUp.confirmNoInvestmentPreference", {
                    defaultMessage: "등록하지 않고 이대로 가입하시겠어요?",
                  })}
                </span>
              </p>
              <div className="flex gap-[0.8rem]">
                <Button
                  variant="textButton"
                  bgColor="bg-grayscale-200"
                  size="md"
                  onClick={() => {
                    setIsOpenOfSuggestion(false);
                    setIsReadyToSubmit(true);
                    handleProfileSubmit(onProfileSetUpSubmit)();
                  }}
                >
                  {t("profileSetUp.signupWithoutPreference", { defaultMessage: "등록하지 않고 가입하기" })}
                </Button>
                <Button
                  variant="textButton"
                  bgColor="bg-navy-900"
                  size="md"
                  onClick={() => {
                    setIsOpenOfSuggestion(false);
                    setIsOpenOfInvestPropensity(true);
                  }}
                >
                  {t("profileSetUp.registerInvestmentPreferenceButton", { defaultMessage: "투자 성향 등록하기" })}
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </form>

      {/* 공통 Alert 팝업 */}
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

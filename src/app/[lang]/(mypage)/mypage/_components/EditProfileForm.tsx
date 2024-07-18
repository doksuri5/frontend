"use client";

import React, { useEffect, useState } from "react";
import Select, { MultiValue, components } from "react-select";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Input, Button, Alert } from "@/components/common";
import Avatar from "@/public/icons/avatar_default.svg";
import EditIcon from "@/public/icons/avatar_edit.svg";
import { cn } from "@/utils/cn";
import { stockList } from "../_constants/stock";
import { createProfileImgURL, getStockCodesFromOptions, mapInterestStocksToInitialValue } from "../_utils/profileUtils";
import { useRouter } from "next/navigation";
import useUserStore from "@/stores/useUserStore";
import reduceImageSize from "@/utils/reduce-image-size";
import { updateUserProfile } from "../_api/profileApi";
import useAlert from "@/hooks/use-alert";

export interface IOption {
  value: string;
  label: string;
}

type TEditProfileFormProps = {
  closeModal: () => void;
};
export interface FormData {
  profile: File | string;
  nickname: string;
  interest_stocks: string[];
  gender: "M" | "F";
}

export default function EditProfileForm({ closeModal }: TEditProfileFormProps) {
  const { userStoreData } = useUserStore();
  const { alertInfo, customAlert } = useAlert();
  const router = useRouter();
  const {
    register,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      profile: userStoreData?.profile,
      nickname: userStoreData?.nickname,
      interest_stocks: userStoreData?.interest_stocks,
      gender: userStoreData?.gender,
    },
  });

  const nickname = watch("nickname");
  const interestStocks = mapInterestStocksToInitialValue(userStoreData?.interest_stocks as string[], stockList);
  const gender = watch("gender");

  const [imageUrl, setImageUrl] = useState(createProfileImgURL(userStoreData?.profile as string, false));

  const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);
  const [lastCheckedNickname, setLastCheckedNickname] = useState(nickname);
  const [nicknameChange, setNicknameChange] = useState(false);
  const [activeDuplicateBtn, setActiveDuplicateBtn] = useState(false);

  const [selectedStocks, setSelectedStocks] = useState<IOption[]>(interestStocks);

  const [formValid, setFormValid] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024 * 1) {
      customAlert({
        title: "최대 1MB 이하의 이미지 파일만 업로드 가능합니다.",
        subText: "",
        buttonText: "확인",
        onClose: () => {},
      });
      e.target.value = "";
    } else {
      setImageUrl(URL.createObjectURL(file));
      setValue("profile", file, { shouldDirty: true });
    }
  };

  const handleStocksChange = (selectedOptions: MultiValue<IOption>) => {
    const value = getStockCodesFromOptions(Array.from(selectedOptions));
    setValue("interest_stocks", value, { shouldDirty: true });
    setSelectedStocks(selectedOptions as IOption[]);
  };

  // 닉네임 입력 감시 및 사용자 입력 시작 추적
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "nickname") {
        if (type === "change") {
          setNicknameChange(true);
        }

        if (value.nickname && value.nickname !== lastCheckedNickname) {
          setActiveDuplicateBtn(true);
          setIsNicknameAvailable(false);
        } else {
          setActiveDuplicateBtn(false);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, nickname, lastCheckedNickname, setError]);

  // 폼 전송 버튼 활성화 (폼이 수정되었고, 중복 확인이 완료된 경우)
  useEffect(() => {
    if (!nickname) return;
    const formModified = isDirty && Object.keys(errors).length === 0 && isNicknameAvailable;
    setFormValid(formModified);
  }, [isDirty, errors, isNicknameAvailable, nickname]);

  // 닉네임 중복 체크
  const handleDuplicateCheck = async () => {
    if (!nickname || nickname === lastCheckedNickname) {
      return;
    }

    try {
      const response = await fetch("/api/auth/nickname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname }),
      });

      const result = await response.json();

      if (result.ok === true) {
        clearErrors("nickname");
        setIsNicknameAvailable(true);
        setActiveDuplicateBtn(false);
        setLastCheckedNickname(nickname);
      } else {
        setError("nickname", { type: "manual", message: "* 사용할 수 없는 닉네임입니다." });
        setIsNicknameAvailable(false);
      }
    } catch (err) {
      customAlert({
        title: "닉네임 중복체크에 실패했습니다.",
        subText: "다시 시도해 주세요",
        buttonText: "확인",
        onClose: () => {},
      });
    }
  };

  // 폼 전송 함수
  const onSubmit = async (data: FormData) => {
    if (!formValid) return;

    const formData = new FormData();

    // 이미지 폼
    if (imageUrl) {
      try {
        const jpeg = await reduceImageSize(imageUrl);
        const file = new File([jpeg], new Date().toString(), { type: "image/jpeg" });
        formData.append("profile", file);
      } catch (err) {
        customAlert({
          title: "이미지 처리에 실패했습니다.",
          subText: "다시 시도해 주세요.",
          buttonText: "확인",
          onClose: () => {},
        });
        return;
      }
    }

    // 기타 프로필 데이터 폼
    formData.append("nickname", data.nickname);
    formData.append("interest_stocks", JSON.stringify(getStockCodesFromOptions(selectedStocks)));
    formData.append("gender", data.gender);

    try {
      const response = await updateUserProfile(formData);

      if (response.ok) {
        customAlert({
          title: "프로필이 수정되었습니다.",
          subText: "",
          buttonText: "확인",
          onClose: () => {
            closeModal();
            router.refresh();
          },
        });
      } else {
        customAlert({
          title: "프로필 수정에 실패했습니다.",
          subText: "다시 시도해 주세요.",
          buttonText: "확인",
          onClose: () => {},
        });
      }
    } catch (err) {
      customAlert({
        title: "프로필 수정에 실패했습니다.",
        subText: err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.",
        buttonText: "확인",
        onClose: () => {},
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-[1.6rem]")}>
        <div className="flex_col_center relative mx-[auto] mb-[2.4rem] h-[12rem] w-[12rem]">
          {/* 프로필 이미지 */}
          <div className="flex h-[12rem] w-[12rem] overflow-hidden rounded-[50%]">
            <Image
              src={imageUrl || Avatar}
              width={120}
              height={120}
              alt="프로필 이미지"
              priority
              className="flex items-center justify-center object-cover"
            />
            <input
              type="file"
              accept="image/*"
              id="profile"
              className="hidden"
              {...register("profile")}
              onChange={handleImageChange}
            />
          </div>
          <label htmlFor="profile" className="absolute bottom-[0] right-0 h-[4rem] w-[4rem] cursor-pointer">
            <Image src={EditIcon} alt="Edit icon" width={40} height={40} />
          </label>
        </div>

        {/* 닉네임 */}
        <div>
          <Input
            id="nickname"
            labelName="닉네임"
            variant={errors.nickname ? "error" : "default" || isNicknameAvailable ? "success" : "default"}
            caption={
              nicknameChange
                ? isNicknameAvailable && nickname !== ""
                  ? "* 사용가능한 닉네임 입니다."
                  : errors.nickname?.message
                : ""
            }
            value={nickname}
            placeholder="닉네임을 입력해주세요."
            {...register("nickname", {
              required: "* 닉네임을 입력해주세요.",
              pattern: {
                value: /^[A-Za-z0-9-_ㄱ-ㅎㅏ-ㅣ가-힣]+$/,
                message: "* '_', '-'를 제외한 특수 문자는 사용할 수 없습니다.",
              },
            })}
            suffix={
              <Button
                type="button"
                variant="textButton"
                size="sm"
                bgColor={
                  !errors.nickname && isNicknameAvailable !== null && activeDuplicateBtn
                    ? "bg-navy-900"
                    : "bg-grayscale-200"
                }
                className={cn(
                  `w-[12rem] ${!errors.nickname && isNicknameAvailable !== null && activeDuplicateBtn ? "text-white" : "text-gray-300"}`,
                )}
                disabled={nickname === "" || (isNicknameAvailable && activeDuplicateBtn)}
                onClick={handleDuplicateCheck}
              >
                중복 확인
              </Button>
            }
          />
        </div>

        {/* 관심 종목 */}
        <div className="mt-[1.6rem]">
          <p className="body-4 text-navy-900">관심 종목</p>
          <Select
            instanceId={"tags"}
            isMulti
            name={"tags"}
            value={selectedStocks}
            options={stockList}
            className="basic-multi-select"
            classNamePrefix="tag"
            placeholder="#관심 종목을 추가해주세요."
            noOptionsMessage={() => "검색된 결과가 없습니다."}
            onChange={handleStocksChange}
            components={{
              IndicatorsContainer: () => null,
              IndicatorSeparator: () => null,
              MultiValueRemove: () => null,
              Input: (props) => <components.Input {...props} aria-activedescendant={undefined} />,
            }}
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
              bgColor={gender === "M" ? "bg-navy-900" : "bg-white"}
              onClick={() => setValue("gender", "M", { shouldDirty: true })}
            >
              남성
            </Button>
            <Button
              type="button"
              variant="textButton"
              size="md"
              bgColor={gender === "F" ? "bg-navy-900" : "bg-white"}
              onClick={() => setValue("gender", "F", { shouldDirty: true })}
            >
              여성
            </Button>
          </p>
        </div>

        {/* 폼 전송 버튼 */}
        <Button
          type="submit"
          variant="textButton"
          size="lg"
          bgColor={formValid ? "bg-navy-900" : "bg-grayscale-200"}
          className={`mt-[4rem] ${formValid ? "text-white" : "text-gray-300"}`}
          disabled={!formValid}
        >
          수정하기
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

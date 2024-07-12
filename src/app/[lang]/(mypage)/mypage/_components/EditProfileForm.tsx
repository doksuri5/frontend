"use client";

import React, { useEffect, useRef, useState } from "react";
import Select, { MultiValue, components } from "react-select";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Input, Button } from "@/components/common";
import Avatar from "@/public/icons/avatar_default.svg";
import EditIcon from "@/public/icons/avatar_edit.svg";
import { cn } from "@/utils/cn";
import { stockList } from "../_constants/stock";
import { getStockCodesFromOptions, mapInterestStocksToInitialValue } from "../_utils/profileUtils";
import reduceImageSize from "@/utils/imageUtils";

export interface IOption {
  value: string;
  label: string;
}

type TEditProfileFormProps = {
  closeModal: () => void;
};
interface FormData {
  nickname: string;
  interest_stocks: string[];
  gender: "M" | "F";
}

const userDummy: FormData = {
  nickname: "김스팩",
  interest_stocks: ["appl", "msft"],
  gender: "M",
};

const initialStockOption = mapInterestStocksToInitialValue(userDummy.interest_stocks, stockList);

export default function EditProfileForm({ closeModal }: TEditProfileFormProps) {
  const {
    register,
    watch,
    trigger,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      nickname: userDummy.nickname,
      gender: userDummy.gender,
    },
  });

  const timestamp = useRef(new Date().getTime()).current;
  const imageUrlDummy =
    "https://doksuri5-s3.s3.ap-northeast-2.amazonaws.com/profile/51845d71-25ff-4494-936c-d2b2a0111ed0.jpeg" +
    "?" +
    timestamp;

  const nickname = watch("nickname");
  const gender = watch("gender");

  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState(imageUrlDummy);
  const [isImgChange, setIsImgChange] = useState(false);

  const [isNameAvailable, setIsNameAvailable] = useState(false);
  const [selectedStocks, setSelectedStocks] = useState<IOption[]>(initialStockOption);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // input 이미지 파일 초기화
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024 * 1) {
      alert("최대 1MB까지 업로드 가능합니다.");
      e.target.value = "";
    } else {
      setPreviewImg(URL.createObjectURL(file));
      setImageUrl(URL.createObjectURL(file));
      setIsImgChange(true);
    }
  };

  const handleStocksChange = (selectedOptions: MultiValue<IOption>) => {
    setSelectedStocks(selectedOptions as IOption[]);
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "nickname") {
        setIsNameAvailable(false); //ID 입력 변경 시, ID 중복 재확인 필요
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  // 닉네임 중복 체크 함수
  const handleDuplicateCheck = () => {
    if (isNameAvailable) {
      return;
    }

    if (!nickname) {
      setError("nickname", { type: "manual", message: "닉네임을 입력해주세요." });
      return;
    }

    //중복 확인 API가 들어갈 자리
    const isDuplicate = false;

    if (isDuplicate) {
      setError("nickname", { type: "manual", message: "이미 사용 중인 닉네임입니다." });
      setIsNameAvailable(false);
    } else {
      clearErrors("nickname");
      setIsNameAvailable(true);
      alert("사용 가능한 닉네임입니다.");
    }
  };

  // 폼 전송 함수
  const onSubmit = async (data: FormData) => {
    const formData = new FormData();

    // 이미지 폼
    if (isImgChange && imageUrl) {
      try {
        const jpeg = await reduceImageSize(imageUrl);
        const file = new File([jpeg], new Date().toString(), { type: "image/jpeg" });
        formData.append("profile", file);
      } catch (err) {
        alert("이미지 처리 실패");
        return;
      }
    }

    // 기타 프로필 데이터 폼
    formData.append("nickname", data.nickname);
    formData.append("interest_stocks", JSON.stringify(getStockCodesFromOptions(selectedStocks)));
    formData.append("gender", data.gender);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/updateUserProfile`, {
        method: "PUT",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        alert("회원정보가 수정되었습니다.");
      } else {
        alert("프로필 업데이트 실패: " + result.message);
      }
    } catch (err) {
      alert("프로필 업데이트 실패: " + err);
    }

    console.log("프로필 수정 데이터:", formData.keys);
    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }
    closeModal();
  };

  const watchFields = watch();
  const isProfileValid = !Object.keys(errors).length && Object.keys(watchFields).length;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-[1.6rem]")}>
      <div className="flex_col_center relative mx-[auto] mb-[2.4rem] h-[12rem] w-[12rem]">
        {/* 프로필 이미지 */}
        <div className="flex h-[12rem] w-[12rem] overflow-hidden rounded-[50%]">
          <Image
            src={previewImg || (imageUrl ? imageUrl : Avatar)}
            width={120}
            height={120}
            alt="프로필 이미지"
            priority
            className="flex items-center justify-center object-cover"
          />
          <input type="file" accept="image/*" id="file" name="file" className="hidden" onChange={handleImageChange} />
        </div>
        <label htmlFor="file" className="absolute bottom-[0] right-0 h-[4rem] w-[4rem] cursor-pointer">
          <Image src={EditIcon} alt="Edit icon" width={40} height={40} />
        </label>
      </div>

      {/* 닉네임 */}
      <div>
        <Input
          id="nickname"
          labelName="닉네임"
          variant={errors.nickname ? "error" : "default"}
          value={nickname}
          placeholder="닉네임을 입력해주세요."
          {...register("nickname", { required: "닉네임을 입력해주세요." })}
          suffix={
            <Button
              type="button"
              variant="textButton"
              size="sm"
              bgColor={!errors.nickname && !isNameAvailable ? "bg-navy-900" : "bg-grayscale-200"}
              className={cn(`w-[12rem] ${!errors.nickname && !isNameAvailable ? "text-white" : "text-gray-300"}`)}
              disabled={isNameAvailable}
              onClick={handleDuplicateCheck}
            >
              중복 확인
            </Button>
          }
        />
        {/* {errors.nickname && <span className="text-warning-100">{errors.nickname.message}</span>} */}
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
            onClick={() => setValue("gender", "M")}
          >
            남성
          </Button>
          <Button
            type="button"
            variant="textButton"
            size="md"
            bgColor={gender === "F" ? "bg-navy-900" : "bg-white"}
            onClick={() => setValue("gender", "F")}
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
        bgColor={isProfileValid ? "bg-navy-900" : "bg-grayscale-200"}
        className={cn(`mt-[4rem] ${isProfileValid ? "text-white" : "text-gray-300"}`)}
        disabled={!isProfileValid}
      >
        수정하기
      </Button>
    </form>
  );
}

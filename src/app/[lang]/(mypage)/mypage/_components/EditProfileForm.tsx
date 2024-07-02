"use client";

import React, { useEffect, useState } from "react";
import Select, { MultiValue, components } from "react-select";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Input, Button } from "@/components/common";
import Avatar from "@/public/icons/avatar_default.svg";
import EditIcon from "@/public/icons/avatar_edit.svg";
import { cn } from "@/utils/cn";

type OptionType = {
  value: string;
  label: string;
};

type TEditProfileFormProps = {
  stockOptionList: { value: string; label: string }[];
  closeModal: () => void;
};

type FormData = {
  nickname: string;
};

export default function EditProfileForm({ stockOptionList, closeModal }: TEditProfileFormProps) {
  const {
    register,
    watch,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();
  const [isNameAvailable, setIsNameAvailable] = useState(false);
  const [selectedStocks, setSelectedStocks] = useState<OptionType[]>([]);
  const [gender, setGender] = useState<string>("");
  const [file, setFile] = useState<string | null>(null);
  const [isGender, setIsGender] = useState<undefined | "M" | "F">(undefined);

  const avatarChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024 * 1) {
        alert("최대 1MB까지 업로드 가능합니다.");
        e.target.value = "";
      } else {
        setFile(URL.createObjectURL(file));
      }
    }
  };

  const handleStocksChange = (selectedOptions: MultiValue<OptionType>) => {
    setSelectedStocks(selectedOptions as OptionType[]);
  };

  const handleGenderChange = (value: "M" | "F") => {
    setIsGender(value);
    setGender(value);
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "nickname") {
        setIsNameAvailable(false); //ID 입력 변경 시, ID 중복 재확인 필요
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const handleDuplicateCheck = () => {
    if (isNameAvailable) {
      return;
    }

    const nickname = watch().nickname;
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

  const onSubmit = async (data: FormData) => {
    const formData = {
      ...data,
      selectedStocks,
      gender,
    };
    console.log("프로필 수정 데이터:", formData);
    closeModal();
  };

  const watchFields = watch();
  const isProfileValid = !Object.keys(errors).length && Object.keys(watchFields).length;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-[1.6rem]")}>
      <div className="flex_col_center relative mx-[auto] mb-[2.4rem] h-[12rem] w-[12rem]">
        <div className="flex h-[12rem] w-[12rem] overflow-hidden rounded-[50%]">
          <Image
            src={file ? file : Avatar.src}
            width={120}
            height={120}
            alt="프로필 이미지"
            priority
            className="flex items-center justify-center object-cover"
          />
          <input type="file" accept="image/*" id="file" name="file" className="hidden" onChange={avatarChangeHandler} />
        </div>

        <label htmlFor="file" className="absolute bottom-[0] right-0 h-[4rem] w-[4rem] cursor-pointer">
          <Image src={EditIcon.src} alt="Edit icon" width={40} height={40} />
        </label>
      </div>
      <Input
        id="nickname"
        labelName="닉네임"
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
      {errors.nickname && <span>{String(errors.nickname.message)}</span>}
      <div className="mt-[1.6rem]">
        <p className="body-4 text-navy-900">관심 종목</p>
        <Select
          instanceId={"tags"}
          isMulti
          name={"tags"}
          options={stockOptionList}
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
      <div className="mt-[1.6rem]">
        <p className="body-4 text-navy-900">성별</p>
        <p className="flex_row gap-[.8rem]">
          <Button
            type="button"
            variant="textButton"
            size="md"
            bgColor={isGender === "M" ? "bg-navy-900" : "bg-white"}
            value="M"
            onClick={() => handleGenderChange("M")}
          >
            남성
          </Button>
          <Button
            type="button"
            variant="textButton"
            size="md"
            bgColor={isGender === "F" ? "bg-navy-900" : "bg-white"}
            value="F"
            onClick={() => handleGenderChange("F")}
          >
            여성
          </Button>
        </p>
      </div>
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

"use client";

import { cn } from "@/utils/cn";
import Select, { components } from "react-select";
import Image from "next/image";
import { Input, Button } from "@/components/common";
import EditIcon from "@/public/icons/avatar_edit.svg?component";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TUserProfileFormProps = {
  page: "auth" | "mypage";
  file: string;
  stockOptionList: { value: string; label: string }[];
  getVisibilityClass?: (targetPath: string) => "" | "hidden";
  closeModal?: () => void;
};

export default function UserProfileForm({
  page,
  stockOptionList,
  getVisibilityClass,
  closeModal,
}: TUserProfileFormProps) {
  const router = useRouter();
  const [file, setFile] = useState("/icons/avatar_default.svg");

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
  return (
    <div className={cn(getVisibilityClass && getVisibilityClass("/profile-setup"))}>
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
        suffix={
          <Button variant="textButton" size="sm" bgColor="bg-navy-900" className="w-[12rem]">
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
          options={stockOptionList}
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
          <Button type="button" variant="textButton" size="md" bgColor="bg-white">
            남성
          </Button>
          <Button type="button" variant="textButton" size="md" bgColor="bg-navy-900" className="">
            여성
          </Button>
        </p>
      </div>
      <Button
        type="button"
        variant="textButton"
        size="lg"
        bgColor="bg-navy-900"
        className="mt-[5.6rem]"
        onClick={() => {
          page === "auth" ? nextPage("/register-complete") : closeModal && closeModal();
        }}
      >
        {page === "auth" ? "가입하기" : "수정하기"}
      </Button>
    </div>
  );
}

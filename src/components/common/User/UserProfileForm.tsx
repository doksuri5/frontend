import { useState } from "react";
import { useRouter } from "next/navigation";
import Select, { MultiValue, components } from "react-select";
import Image from "next/image";
import { Input, Button } from "@/components/common";
import EditIcon from "@/public/icons/avatar_edit.svg?component";
import { cn } from "@/utils/cn";

type OptionType = {
  value: string;
  label: string;
};

type TUserProfileFormProps = {
  page: "auth" | "mypage";
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
  const [file, setFile] = useState<string>("/icons/avatar_default.svg");
  const [nickname, setNickname] = useState<string>("");
  const [selectedStocks, setSelectedStocks] = useState<OptionType[]>([]);
  const [gender, setGender] = useState<string>("");

  //프로필 이미지 변경
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

  //관심 종목 선택
  const handleStocksChange = (selectedOptions: MultiValue<OptionType>) => {
    setSelectedStocks(selectedOptions as OptionType[]);
  };

  //성별 선택
  const handleGenderChange = (selectedGender: string) => {
    setGender(selectedGender);
  };

  //중복체크
  const handleDuplicateCheck = () => {};

  //프로필 설정 / 프로필 수정 submit 함수
  const handleSubmit = () => {
    const formData = {
      nickname,
      selectedStocks,
      gender,
    };

    if (page === "auth") {
      //프로필 설정 로직
      console.log("프로필 설정 데이터:", formData);
      //데이터 처리 로직
      nextPage("/register-complete");
    } else if (page === "mypage") {
      //프로필 수정 로직
      console.log("프로필 수정 데이터:", formData);
      //데이터 처리 로직
      closeModal && closeModal();
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
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        suffix={
          <Button
            variant="textButton"
            size="sm"
            bgColor="bg-navy-900"
            className="w-[12rem]"
            onClick={handleDuplicateCheck}
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
          onChange={handleStocksChange}
          value={selectedStocks}
        />
      </div>
      <div className="mt-[1.6rem]">
        <p className="body-4 text-navy-900">성별</p>
        <p className="flex_row gap-[.8rem]">
          <Button
            type="button"
            variant="textButton"
            size="md"
            bgColor={gender === "male" ? "bg-navy-900" : "bg-white"}
            onClick={() => handleGenderChange("male")}
          >
            남성
          </Button>
          <Button
            type="button"
            variant="textButton"
            size="md"
            bgColor={gender === "female" ? "bg-navy-900" : "bg-white"}
            onClick={() => handleGenderChange("female")}
          >
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
        onClick={handleSubmit}
      >
        {page === "auth" ? "가입하기" : "수정하기"}
      </Button>
    </div>
  );
}

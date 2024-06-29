import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import { Input, Button } from "@/components/common";
import React, { useState, useEffect } from "react";

type TUserPrivacyFormProps = {
  page: "auth" | "mypage";
  closeModal?: () => void;
};

export default function UserInfoForm({ page, closeModal }: TUserPrivacyFormProps) {
  const router = useRouter();
  //추후 데이터 타입 변경
  const [formData, setFormData] = useState<any>({});

  //서버에서 유저 정보 받아오기 (page: mypage)
  useEffect(() => {
    setFormData("");
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //추후 데이터 타입 변경
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nextPage = (targetPath: string) => {
    router.push(targetPath);
  };

  const handleSubmit = () => {
    if (page === "auth") {
      // 회원가입 처리 로직
      console.log("회원가입 데이터", formData);
      // 서버 요청 후 필요한 처리 로직
      nextPage("/profile-setup");
    } else if (page === "mypage") {
      // 정보 수정 처리 로직
      console.log("수정된 회원정보 데이터:", formData);
      // 서버 요청 후 필요한 처리 로직
      closeModal && closeModal(); //모달 닫기
    }
  };

  return (
    <div className={cn("flex w-full flex-col gap-[1.6rem]")}>
      <div>
        <Input
          id="id"
          name="id"
          labelName="아이디"
          placeholder="아이디를 입력해주세요."
          value={formData.id || ""}
          onChange={handleInputChange}
          caption={page === "auth" ? "*  6~12자의 영문, 숫자, _,을 이용한 조합" : ""}
          captionClass="text-grayscale-700"
          suffix={
            page === "auth" ? (
              <Button variant="textButton" size="sm" bgColor="bg-navy-900" className="w-[12rem]">
                중복 확인
              </Button>
            ) : undefined
          }
        />
        {/* <Input
            id="email_certification"
            name="email_certification"
            // labelName="인증 코드"
            placeholder="인증 코드를 입력해주세요."
            inputGroupClass="mt-[0.8rem] hidden"
            labelClass="[&>div]:min-h-[5.6rem]"
            inputClass="h-[5.6rem] placeholder:text-gray-400"
          /> */}
      </div>

      <Input
        type="password"
        id="password"
        name="password"
        labelName={page === "auth" ? "비밀번호 입력" : "새 비밀번호 입력"}
        placeholder="비밀번호를 입력해주세요."
        value={formData.password || ""}
        onChange={handleInputChange}
        captionClass="text-grayscale-700"
        caption="*  8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합"
      />
      <Input
        type="password"
        id="passwordChk"
        name="passwordChk"
        labelName={page === "auth" ? "비밀번호 확인" : "새 비밀번호 확인"}
        placeholder="비밀번호를 다시 한번 입력해주세요."
        value={formData.passwordChk || ""}
        onChange={handleInputChange}
        labelClass="[&>div]:min-h-[5.6rem]"
        inputClass="h-[5.6rem] placeholder:text-gray-400"
      />
      <div>
        <Input
          id="phone"
          name="phone"
          labelName="휴대폰번호"
          placeholder="-를 제외한 휴대폰번호를 입력해주세요."
          value={formData.phone || ""}
          onChange={handleInputChange}
          labelClass="[&>div]:min-h-[5.6rem]"
          inputClass="h-[5.6rem] placeholder:text-gray-400"
        />
        {/* <Input
            id="phone_certification"
            name="phone_certification"
            // labelName="인증 코드"
            placeholder="인증 코드를 입력해주세요."
            inputGroupClass="mt-[0.8rem] hidden"
            labelClass="[&>div]:min-h-[5.6rem]"
            inputClass="h-[5.6rem] placeholder:text-gray-400"
          /> */}
      </div>
      <Input
        id="birth"
        name="birth"
        labelName="생년월일"
        placeholder="생년월일 6자리를 입력해주세요.(예시 : 991231)"
        value={formData.birth || ""}
        onChange={handleInputChange}
        labelClass="[&>div]:min-h-[5.6rem]"
        inputClass="h-[5.6rem] placeholder:text-gray-400"
      />
      <Button
        type="button"
        size="lg"
        bgColor="bg-navy-900"
        className="mt-[4rem]"
        onClick={() => {
          handleSubmit();
        }}
      >
        {page === "auth" ? "다음" : "수정하기"}
      </Button>
    </div>
  );
}

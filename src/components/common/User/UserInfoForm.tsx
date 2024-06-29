import { cn } from "@/utils/cn";
import { Input, Button } from "@/components/common";
import { useRouter } from "next/navigation";

type TUserInfoFormProps = {
  page: "auth" | "mypage";
  getVisibilityClass?: (targetPath: string) => "" | "hidden";
  closeModal?: () => void;
};
export default function UserInfoForm({ page, getVisibilityClass, closeModal }: TUserInfoFormProps) {
  const router = useRouter();

  const nextPage = (targetPath: string) => {
    router.push(targetPath);
  };

  return (
    <div className={cn("flex w-full flex-col gap-[1.6rem]", getVisibilityClass ? getVisibilityClass("/register") : "")}>
      <div>
        <Input
          id="id"
          name="id"
          labelName="아이디"
          placeholder="아이디를 입력해주세요."
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
        captionClass="text-grayscale-700"
        caption="*  8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합"
      />
      <Input
        type="password"
        id="passwordChk"
        name="passwordChk"
        labelName={page === "auth" ? "비밀번호 확인" : "새 비밀번호 확인"}
        placeholder="비밀번호를 다시 한번 입력해주세요."
        labelClass="[&>div]:min-h-[5.6rem]"
        inputClass="h-[5.6rem] placeholder:text-gray-400"
      />
      <div>
        <Input
          id="phone"
          name="phone"
          labelName="휴대폰번호"
          placeholder="-를 제외한 휴대폰번호를 입력해주세요."
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
        labelClass="[&>div]:min-h-[5.6rem]"
        inputClass="h-[5.6rem] placeholder:text-gray-400"
      />
      <Button
        type="button"
        size="lg"
        bgColor="bg-navy-900"
        className="mt-[4rem]"
        onClick={() => {
          page === "auth" ? nextPage("/profile-setup") : closeModal && closeModal();
        }}
      >
        {page === "auth" ? "다음" : "수정하기"}
      </Button>
    </div>
  );
}

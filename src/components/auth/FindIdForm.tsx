import { Button, Input } from "../common";

export default function FindIdForm() {
  return (
    <>
      <form>
        <Input
          id="name"
          name="name"
          labelName="이름"
          placeholder="이름을 입력해주세요."
          labelClass="[&>div]:min-h-[5.6rem]"
          inputClass="h-[5.6rem] placeholder:text-gray-400"
        />
        <Input
          variant="error"
          id="phone"
          name="phone"
          labelName="휴대전화"
          placeholder="이름을 입력해주세요."
          inputGroupClass="mt-[1.6rem]"
          labelClass="[&>div]:min-h-[5.6rem]"
          inputClass="h-[5.6rem] [&+button]:top-[50%] [&+button]:translate-y-[-50%] placeholder:text-gray-400"
          caption="등록되지 않은 회원이거나 잘못된 회원정보입니다."
        />
        <Button
          variant="textButton"
          size="lg"
          disabled
          bgColor="bg-grayscale-200"
          className="mt-[5.6rem] text-gray-300"
        >
          아이디 찾기
        </Button>
      </form>
    </>
  );
}

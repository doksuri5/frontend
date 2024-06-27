import { Button, Input } from "@/components/common";

export default function FindIdForm() {
  return (
    <>
      <form>
        <Input id="name" name="name" labelName="이름" placeholder="이름을 입력해주세요." />
        <Input
          // variant="error"
          id="phone"
          name="phone"
          labelName="휴대전화"
          placeholder="-를 제외한 휴대폰번호를 입력해주세요."
          inputGroupClass="mt-[1.6rem]"
          // caption="등록되지 않은 회원이거나 잘못된 회원정보입니다."
        />
        <Button size="lg" disabled bgColor="bg-grayscale-200" className="mt-[5.6rem] text-gray-300">
          아이디 찾기
        </Button>
      </form>
    </>
  );
}

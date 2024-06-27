import { Button, Input } from "../common";

export default function FindPasswordForm() {
  return (
    <>
      <form className="flex flex-col gap-[1.6rem]">
        <Input
          // variant="error"
          id="name"
          name="name"
          labelName="이름"
          placeholder="이름을 입력해주세요."
        />
        <Input
          // variant="error"
          id="id"
          name="id"
          labelName="아이디"
          placeholder="아이디를 입력해주세요."
          // caption="등록되지 않은 회원이거나 잘못된 회원정보입니다."
        />
        <Input
          // variant="error"
          id="email"
          name="email"
          labelName="이메일 주소"
          placeholder="가입 시 입력한 이메일주소를 입력해주세요."
          // caption="등록되지 않은 회원이거나 잘못된 회원정보입니다."
        />
        <Button type="button" size="lg" disabled bgColor="bg-grayscale-200" className="mt-[4rem] text-gray-300">
          임시 비밀번호 발급
        </Button>
      </form>
    </>
  );
}

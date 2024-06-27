import CommonLayout from "../_components/CommonLayout";

import { Button } from "@/components/common";

export default function RegisterCompletePage() {
  return (
    <>
      <CommonLayout title="가입이 완료되었습니다.">
        <p className="body_2 text-center text-grayscale-900">
          회원가입이 완료되었습니다.
          <br />
          로그인 후 이용해주세요!
        </p>
        <Button size="lg" className="mt-[5.6rem] text-white">
          로그인하기
        </Button>
      </CommonLayout>
    </>
  );
}

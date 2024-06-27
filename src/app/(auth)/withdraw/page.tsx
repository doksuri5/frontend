import CommonLayout from "../_components/CommonLayout";

import { Button } from "@/components/common";

export default function page() {
  return (
    <>
      <CommonLayout title="회원탈퇴가 완료되었습니다." childrenClass="w-[39.4rem] flex_col_center">
        <p className="body_2 text-center text-grayscale-900">
          아잇나우를 이용해주셔서 감사합니다.
          <br />
          더욱 더 노력하고 발전하는 아잇나우가 되겠습니다.
        </p>
        <Button size="lg" className="mt-[5.6rem] w-[36.8rem] text-white">
          확인
        </Button>
      </CommonLayout>
    </>
  );
}

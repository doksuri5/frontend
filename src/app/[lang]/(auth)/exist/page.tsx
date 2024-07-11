import CommonLayout from "../_components/CommonLayout";
import CommonLoginBtn from "../_components/CommonLoginBtn";

export default function page() {
  return (
    <>
      <CommonLayout title="가입된 이메일입니다." childrenClass="w-[39.4rem] flex_col_center">
        <p className="body_2 text-center text-grayscale-900">
          일반 계정으로 가입된 이메일 입니다.
          <br />
          소셜 로그인이 아닌 이메일로 로그인해주세요!
        </p>
        <CommonLoginBtn className="mt-[5.6rem]" />
      </CommonLayout>
    </>
  );
}

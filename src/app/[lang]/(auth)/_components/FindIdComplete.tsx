import Image from "next/image";
import CommonLoginBtn from "./CommonLoginBtn";

export default function FindIdComplete() {
  return (
    <>
      <div>
        <p className="body_5 mb-[1.6rem] text-center font-medium text-grayscale-900">
          휴대폰번호와 일치하는 아이디입니다.
        </p>
        <div className="flex_col border-text-grayscale-300 gap-[1.6rem] rounded-[.8rem] border py-[2.8rem]">
          <p className="flex_row body_4 text-grayscale-900">
            아이디 :
            <span className="ml-[.8rem] inline-flex">
              <Image
                src={"/icons/icon_kakao.svg"}
                alt={"간편 로그인 로고"}
                width={20}
                height={24}
                className="mr-[.4rem]"
              />
              sfacspaceid
            </span>
          </p>
          <p className="flex_row body_4 text-grayscale-900">
            가입일 : <span className="ml-[.8rem]">2023. 06. 14</span>
          </p>
        </div>
        <CommonLoginBtn className="mt-[5.6rem]" />
      </div>
    </>
  );
}

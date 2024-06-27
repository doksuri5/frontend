import Link from "next/link";

import { Button } from "@/components/common";

import CommonLayout from "../_components/CommonLayout";
import FindIdForm from "../_components/FindIdForm";

import Image from "next/image";

export default function FindIdPage() {
  return (
    <>
      {/* desc="휴대폰번호와 일치하는 아이디입니다." */}
      <CommonLayout title="아이디 찾기">
        <FindIdForm />
        {/* 아이디 찾기 완료 UI */}
        {/*
        <div>
          <div className="flex_col border-text-grayscale-300 gap-[1.6rem] rounded-[.8rem] border py-[2.8rem]">
            <p className="flex_row body_4 text-grayscale-900">
              아이디 :
              <span className="ml-[.8rem] inline-flex">
                <Image
                  src={"/icons/icon_kakao.svg"}
                  alt={"간편 로그인 로고"}
                  width={20}
                  height={20}
                  className="mr-[.4rem]"
                />
                sfacspaceid
              </span>
            </p>
            <p className="flex_row body_4 text-grayscale-900">
              가입일 : <span className="ml-[.8rem]">2023. 06. 14</span>
            </p>
          </div>
          <Button size="lg" className="mt-[5.6rem]">
            <Link href={"/login"} className="text-white">
              로그인하기
            </Link>
          </Button>
        </div>
        */}
      </CommonLayout>
    </>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CommonLayout from "../_components/CommonLayout";
import RegisterForm from "../_components/RegisterForm";

import { Button, Modal } from "@/components/common";

export default function VerifyUser() {
  const [isOpen, setIsOpen] = useState(true); //현재 모달의 열림 여부
  const closeModal = () => setIsOpen(false); //모달 창 닫기 함수

  const router = useRouter();

  const nextPage = () => {
    router.push("/login");
  };

  return (
    <>
      <CommonLayout title="본인인증">
        <RegisterForm />
        {!isOpen && (
          <Modal isOpen={isOpen} onClose={closeModal} panelStyle="w-[38.6rem] py-[1.6rem] px-[3.2rem] rounded-[2rem]">
            <dl className="flex_col_center mb-[3.2rem]">
              <dt className="body_2 my-[.8rem] font-bold text-navy-900">인증링크를 전송했습니다.</dt>
              <dd className="text-center">
                작성한 이메일주소로 인증메일을 전송했습니다.
                <br />
                메일 확인 후 회원가입을 계속 진행해주세요.
              </dd>
            </dl>
            <Button type="button" variant="textButton" size="md" className="text-grayscale-0" onClick={closeModal}>
              확인
            </Button>
          </Modal>
        )}
      </CommonLayout>
    </>
  );
}

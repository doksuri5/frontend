"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CommonLayout from "../_components/CommonLayout";
import FindPasswordForm from "../_components/FindPasswordForm";

import { Button, Modal } from "@/components/common";

export default function FindPasswordPage() {
  const [isOpen, setIsOpen] = useState(true); //현재 모달의 열림 여부
  const closeModal = () => setIsOpen(false); //모달 창 닫기 함수

  const router = useRouter();
  const nextPage = () => {
    router.push("/login");
  };

  return (
    <>
      <CommonLayout title="비밀번호 찾기">
        <FindPasswordForm />
        <Modal isOpen={isOpen} onClose={closeModal} panelStyle="w-[38.6rem] py-[1.6rem] px-[3.2rem] rounded-[2rem]">
          <dl className="flex_col_center mb-[3.2rem]">
            <dt className="body_2 my-[.8rem] font-bold text-navy-900">임시비밀번호가 발급되었습니다.</dt>
            <dd className="text-center">
              이메일을 확인하여 임시 비밀번호로
              <br /> 재로그인 후 비밀번호를 변경해주세요.
            </dd>
          </dl>
          <Button type="button" variant="textButton" size="md" className="text-grayscale-0" onClick={nextPage}>
            로그인
          </Button>
        </Modal>
      </CommonLayout>
    </>
  );
}

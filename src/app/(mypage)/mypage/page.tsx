"use client";

import { useState } from "react";
import { Button } from "@/components/common";
import Image from "next/image";
import Profile from "@/public/icons/profile_icon.svg";
import ProfileEditModal from "./_components/ProfileEditModal";
import PWCheckModal from "./_components/PWCheckModal";
import PrivacyEditModal from "./_components/PrivacyEditModal";
import WithdrawModal from "./_components/WithdrawModal";

export default function MyPage() {
  //프로필 수정 모달
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  //패스워드 확인 모달
  const [isPWCheckModalOpen, setIsPWCheckModalOpen] = useState(false);
  const openPWCheckModal = () => setIsPWCheckModalOpen(true);
  const closePWCheckModal = () => {
    setIsPWCheckModalOpen(false);
    openPrivacyModal();
  };

  //개인정보 수정 모달
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const openPrivacyModal = () => setIsPrivacyModalOpen(true);
  const closePrivacyModal = () => setIsPrivacyModalOpen(false);

  //회원탈퇴 모달
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const openWithdrawModal = () => {
    closePrivacyModal();
    setIsWithdrawModalOpen(true);
  };
  const closeWithdrawModal = () => setIsWithdrawModalOpen(false);

  return (
    <main className="flex flex-col gap-[3.2rem]">
      {/* 프로필 수정 */}
      <section className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-[.8rem]">
          <h1 className="body_2 font-bold text-gray-900">프로필 설정</h1>
          <div>서비스 사용시 보여지는 프로필을 생성 및 변경합니다. 프로필을 설정해보세요.</div>
        </div>
        <Button variant="textButton" size="sm" className="w-[16rem] text-grayscale-0" onClick={openProfileModal}>
          프로필 수정
        </Button>
      </section>
      <section className="flex flex-row gap-[12.2rem]">
        <h3 className="body_4 font-medium text-black">프로필</h3>
        <div className="flex flex-row items-center gap-[1.6rem]">
          <Image alt="profile" src={Profile} width={50} height={50} />
          <div className="body_4 font-medium text-black">김스팩</div>
        </div>
      </section>
      <ProfileEditModal isOpen={isProfileModalOpen} onClose={closeProfileModal} />

      {/* 계정 설정 */}
      <section className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-[.8rem]">
          <h1 className="body_2 font-bold text-gray-900">계정 설정</h1>
          <div>서비스 이용시 사용되는 계정을 생성 및 변경합니다. 계정을 연동하여 다양한 서비스를 이용해보세요.</div>
        </div>
        <Button variant="textButton" size="sm" className="w-[16rem] text-grayscale-0" onClick={openPWCheckModal}>
          계정정보 수정
        </Button>
      </section>
      <div className="flex flex-row items-center">
        <div className="body_3 w-[14.4rem] font-medium text-grayscale-900">아이디</div>
        <div className="body_4 font-medium text-grayscale-600">sfacspaceid</div>
      </div>
      <div className="flex flex-row items-center">
        <div className="body_3 w-[14.4rem] font-medium text-grayscale-900">이름</div>
        <div className="body_4 font-medium text-grayscale-600">김스팩</div>
      </div>
      <div className="flex flex-row items-center">
        <div className="body_3 w-[14.4rem] font-medium text-grayscale-900">생년월일</div>
        <div className="body_4 font-medium text-grayscale-600">991231</div>
      </div>
      <PWCheckModal isOpen={isPWCheckModalOpen} onClose={closePWCheckModal} />
      <PrivacyEditModal isOpen={isPrivacyModalOpen} onClose={closePrivacyModal} openWithdrawModal={openWithdrawModal} />
      <WithdrawModal isOpen={isWithdrawModalOpen} onClose={closeWithdrawModal} />
    </main>
  );
}

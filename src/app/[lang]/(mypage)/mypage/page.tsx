"use client";

import { Button } from "@/components/common";
import Image from "next/image";
import Profile from "@/public/icons/avatar_default.svg";
import { ProfileEditModal, PWCheckModal, PrivacyEditModal, WithdrawModal } from "./_components/index";
import useDisclosure from "@/hooks/use-disclosure";
import { useEffect, useState } from "react";
import { createProfileImgURL } from "./_utils/profileUtils";

const email = "abcde@test.com";
interface IUserData {
  _id: string;
  name: string;
  email: string;
  birth: string;
  phone: string;
  gender: "M" | "F" | null;
  profile: string;
  nickname: string;
  login_type: string;
}

export default function MyPage() {
  const [userData, setUserData] = useState<IUserData>({
    _id: "",
    name: "",
    email: "",
    birth: "",
    phone: "",
    gender: null,
    profile: "",
    nickname: "",
    login_type: "",
  });

  // 프로필 수정 모달
  const profileModal = useDisclosure();
  // 패스워드 확인 모달
  const pwCheckModal = useDisclosure();
  // 개인정보 수정 모달
  const privacyModal = useDisclosure();
  // 회원탈퇴 모달
  const withdrawModal = useDisclosure();

  const handlePWCheckModalClose = () => {
    pwCheckModal.close();
  };

  const handleOpenPrivacyModal = () => {
    pwCheckModal.close();
    privacyModal.open();
  };

  const handleOpenWithdrawModal = () => {
    privacyModal.close();
    withdrawModal.open();
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await (await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getUser/${email}`)).json();

        if (response.ok) {
          console.log(response.data);
          setUserData(response.data);
        }
      } catch (err) {}
    };

    getUserData();
  }, []);

  return (
    <main className="flex flex-col gap-[3.2rem]">
      {/* 프로필 수정 */}
      <section className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-[.8rem]">
          <h1 className="body_2 font-bold text-gray-900">프로필 설정</h1>
          <div>서비스 사용시 보여지는 프로필을 생성 및 변경합니다. 프로필을 설정해보세요.</div>
        </div>
        <Button variant="textButton" size="sm" className="w-[16rem] text-grayscale-0" onClick={profileModal.open}>
          프로필 수정
        </Button>
      </section>
      <section className="flex flex-row gap-[12.2rem]">
        <h3 className="body_4 font-medium text-black">프로필</h3>
        <div className="flex flex-row items-center gap-[1.6rem]">
          <Image
            alt="profile"
            src={userData.profile ? createProfileImgURL(userData.profile) : Profile}
            width={50}
            height={50}
          />
          <div className="body_4 font-medium text-black">{userData.nickname}</div>
        </div>
      </section>
      <ProfileEditModal isOpen={profileModal.isOpen} onClose={profileModal.close} />

      {/* 계정 설정 */}
      <section className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-[.8rem]">
          <h1 className="body_2 font-bold text-gray-900">계정 설정</h1>
          <div>서비스 이용시 사용되는 계정을 생성 및 변경합니다. 계정을 연동하여 다양한 서비스를 이용해보세요.</div>
        </div>
        <Button variant="textButton" size="sm" className="w-[16rem] text-grayscale-0" onClick={pwCheckModal.open}>
          계정정보 수정
        </Button>
      </section>
      <div className="flex flex-row items-center">
        <div className="body_3 w-[14.4rem] font-medium text-grayscale-900">아이디</div>
        <div className="body_4 font-medium text-grayscale-600">{userData._id}</div>
      </div>
      <div className="flex flex-row items-center">
        <div className="body_3 w-[14.4rem] font-medium text-grayscale-900">이름</div>
        <div className="body_4 font-medium text-grayscale-600">{userData.name}</div>
      </div>
      <div className="flex flex-row items-center">
        <div className="body_3 w-[14.4rem] font-medium text-grayscale-900">생년월일</div>
        <div className="body_4 font-medium text-grayscale-600">{userData.birth}</div>
      </div>
      <PWCheckModal isOpen={pwCheckModal.isOpen} onClose={handlePWCheckModalClose} onEdit={handleOpenPrivacyModal} />
      <PrivacyEditModal
        isOpen={privacyModal.isOpen}
        onClose={privacyModal.close}
        openWithdrawModal={handleOpenWithdrawModal}
      />
      <WithdrawModal isOpen={withdrawModal.isOpen} onClose={withdrawModal.close} />
    </main>
  );
}

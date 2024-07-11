"use client";

import { Button } from "@/components/common";
import Image from "next/image";
import Profile from "@/public/icons/avatar_default.svg";
import { ProfileEditModal, PWCheckModal, PrivacyEditModal, WithdrawModal } from "./index";
import useDisclosure from "@/hooks/use-disclosure";
import { createProfileImgURL } from "../_utils/profileUtils";
import { useEffect, useState } from "react";
import useUserStore, { IUserData } from "@/stores/useUserStore";

const email = "abcde@test.com";

type TMyPageMainProps = {
  userData: IUserData;
};

export default function MyPageMain({ userData }: TMyPageMainProps) {
  // Zustand 스토어에서 사용자 데이터와 설정 함수를 가져옵니다.
  const { setUserStoreData } = useUserStore();
  //   const [userData, setUserData] = useState<IUserData>({
  //     _id: "",
  //     name: "",
  //     email: "",
  //     birth: "",
  //     phone: "",
  //     gender: "M",
  //     profile: "",
  //     interest_stocks: [""],
  //     nickname: "",
  //     login_type: "",
  //   });

  // 모달 관련 상태 관리
  const profileModal = useDisclosure();
  const pwCheckModal = useDisclosure();
  const privacyModal = useDisclosure();
  const withdrawModal = useDisclosure();

  // 패스워드 확인 모달을 닫는 함수
  const handlePWCheckModalClose = () => {
    pwCheckModal.close();
  };

  // 개인정보 수정 모달을 여는 함수
  const handleOpenPrivacyModal = () => {
    pwCheckModal.close();
    privacyModal.open();
  };

  // 회원 탈퇴 모달을 여는 함수
  const handleOpenWithdrawModal = () => {
    privacyModal.close();
    withdrawModal.open();
  };

  useEffect(() => {
    setUserStoreData({ ...userData, interest_stocks: ["appl", "msft"] }); // 컴포넌트 마운트 시 Zustand 스토어에 데이터 설정
  }, [userData, setUserStoreData]);

  // 사용자 데이터를 서버에서 불러오는 효과
  //   useEffect(() => {
  //     const getUserData = async () => {
  //       try {
  //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getUser/${email}`);
  //         const data = await response.json();

  //         if (response.ok) {
  //           // console.log(data.data);
  //           setUserData(data.data);
  //           setUserStoreData(data.data); // Zustand 스토어에 데이터 설정
  //           console.log(userStoreData);
  //         }
  //       } catch (err) {
  //         console.error("Failed to fetch user data:", err);
  //       }
  //     };

  //     getUserData();
  //   }, []);

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
          {/* 프로필 이미지 */}
          <div className="flex h-[5.6rem] w-[5.6rem] overflow-hidden rounded-[50%]">
            <Image
              src={userData.profile ? createProfileImgURL(userData.profile, false) : Profile}
              width={120}
              height={120}
              alt="프로필 이미지"
              priority
              className="flex items-center justify-center object-cover"
            />
          </div>
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
        <div className="body_4 font-medium text-grayscale-600">{userData!._id}</div>
      </div>
      <div className="flex flex-row items-center">
        <div className="body_3 w-[14.4rem] font-medium text-grayscale-900">이름</div>
        <div className="body_4 font-medium text-grayscale-600">{userData!.name}</div>
      </div>
      <div className="flex flex-row items-center">
        <div className="body_3 w-[14.4rem] font-medium text-grayscale-900">생년월일</div>
        <div className="body_4 font-medium text-grayscale-600">{userData!.birth}</div>
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

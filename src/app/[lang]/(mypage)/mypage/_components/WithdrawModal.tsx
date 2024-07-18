"use client";

import { Modal, Button, Dropdown, Input, Alert } from "@/components/common";
import useUserStore from "@/stores/useUserStore";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { passwordCert } from "../_api/privacyApi";
import { deleteGoogleUserAccount, deleteKakaoUserAccount, deleteNaverUserAccount, withdraw } from "../_api/withdrawApi";
import useAlert from "@/hooks/use-alert";

const withdrawReasons = [
  { value: "inconvenient_service", text: "이용이 불편하고 장애가 많아서" },
  { value: "better_service", text: "다른 서비스가 더 좋아서" },
  { value: "low_usage_frequency", text: "사용 빈도가 낮아서" },
  { value: "content_dissatisfaction", text: "콘텐츠 불만" },
  { value: "other", text: "기타" },
];

type TWithdrawModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export interface IWithdrawForm {
  email: string | undefined;
  reason: string;
  reason_other: string | null;
}

export default function WithdrawModal({ isOpen, onClose }: TWithdrawModalProps) {
  const { userStoreData } = useUserStore();
  const { alertInfo, customAlert } = useAlert();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [selectedReason, setSelectedReason] = useState(withdrawReasons[0]);
  const [otherReason, setOtherReason] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setPassword("");
      setSelectedReason(withdrawReasons[0]);
      setOtherReason("");
    }
  }, [isOpen]);

  // 일반 로그인 회원 비밀번호 인증
  const handleVerifyPassword = async () => {
    if (!userStoreData?.email || !password) return;

    try {
      const response = await passwordCert(userStoreData.email, password);
      if (response.ok) {
        return true;
      } else {
        alert(response.message);
        return false;
      }
    } catch (err) {
      customAlert({
        title: "비밀번호 인증에 실패했습니다.",
        subText: "비밀번호 인증을 다시 시도해주세요.",
        buttonText: "확인",
        onClose: () => {},
      });
    }
  };

  const handleSocialAccountWithdraw = async (loginType: string) => {
    switch (loginType) {
      case "google":
        return await deleteGoogleUserAccount();
      case "kakao":
        return await deleteKakaoUserAccount();
      case "naver":
        return await deleteNaverUserAccount();
      default:
        return false;
    }
  };

  const handleWithdraw = async () => {
    if (userStoreData?.login_type === "local") {
      const passwordResponse = await handleVerifyPassword();
      if (!passwordResponse) return;
    } else {
      const socialResult = await handleSocialAccountWithdraw(userStoreData!.login_type);
      if (!socialResult) {
        customAlert({
          title: `${userStoreData!.login_type.toUpperCase()} 로그인 회원 탈퇴 도중 오류가 발생했습니다.`,
          subText: "잠시 후 다시 시도해 주세요.",
          buttonText: "확인",
          onClose: () => {},
        });
        return;
      }
    }

    const formData = {
      email: userStoreData?.email,
      reason: selectedReason.text,
      reason_other: otherReason === "" ? null : otherReason,
    };

    try {
      const response = await withdraw(formData);

      if (!response.ok) {
        customAlert({
          title: "회원 탈퇴 처리 중 오류가 발생했습니다.",
          subText: "잠시 후 다시 시도해 주세요.",
          buttonText: "확인",
          onClose: () => {},
        });
        return;
      }

      router.push("/withdraw");
    } catch (err) {
      customAlert({
        title: "회원 탈퇴 처리 중 오류가 발생했습니다.",
        subText: err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.",
        buttonText: "확인",
        onClose: () => {},
      });
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="회원탈퇴"
        isBackdropClosable={true}
        panelStyle="px-[10.2rem] py-[8rem] rounded-[3.2rem] w-[59rem] items-center justify-center"
      >
        <div className="flex w-full flex-col">
          <div className="mb-[2.9rem] mt-[4rem] flex flex-col gap-[1.6rem]">
            <Dropdown
              label="회원탈퇴 사유"
              placeholder="회원탈퇴 사유를 선택해주세요"
              selected={selectedReason}
              setSelected={setSelectedReason}
              options={withdrawReasons}
            />
            {selectedReason.value === "other" && (
              <div>
                <label className="body_4 font-medium text-navy-900">탈퇴 사유</label>
                <textarea
                  className="h-[10rem] w-full resize-none rounded-[0.8rem] border border-gray-300 p-[1.6rem] text-grayscale-900 focus:outline-blue-500"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  placeholder="기타 사유를 입력해주세요"
                />
              </div>
            )}
            {userStoreData?.login_type === "local" ? (
              <Input
                labelName="비밀번호 입력"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                inputGroupClass="w-full h-[5.6rem]"
                inputClass="p-[1.6rem] rounded-[0.8rem] text-grayscale-900 font-normal"
                placeholder="비밀번호를 입력해주세요"
                labelClass="body_4 font-medium text-navy-900"
              />
            ) : (
              <div className="h-[2rem]" />
            )}
          </div>
          <Button
            size="lg"
            bgColor={userStoreData?.login_type !== "local" || password ? "bg-navy-900" : "bg-grayscale-200"}
            className={cn(
              `${userStoreData?.login_type !== "local" || password ? "text-grayscale-0" : "text-gray-300"} mt-[6.4rem] w-full`,
            )}
            onClick={handleWithdraw}
            disabled={userStoreData?.login_type === "local" ? !password : false}
          >
            회원탈퇴
          </Button>
        </div>
      </Modal>

      {/* Alert */}
      {alertInfo.open && (
        <Alert
          variant="checkCustomCloseButton"
          title={alertInfo.title}
          subText={alertInfo.subText}
          buttonText={alertInfo.buttonText}
          onClose={alertInfo.onClose}
        />
      )}
    </>
  );
}

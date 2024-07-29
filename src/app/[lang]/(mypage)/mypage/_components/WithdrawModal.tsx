"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import { Modal, Button, Dropdown, Input, Alert } from "@/components/common";
import useUserStore from "@/stores/useUserStore";
import useAlert from "@/hooks/use-alert";
import { passwordCert } from "../_api/privacyApi";
import { deleteGoogleUserAccount, deleteKakaoUserAccount, deleteNaverUserAccount, withdraw } from "../_api/withdrawApi";
import useToast from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

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
  const t = useTranslations();
  const popupT = useTranslations("user.popup")

  const { userStoreData } = useUserStore();
  const { alertInfo, customAlert } = useAlert();
  const { showLoadingToast, updateToast } = useToast();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [selectedReason, setSelectedReason] = useState(withdrawReasons[0]);
  const [otherReason, setOtherReason] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);

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
        customAlert({
          title: popupT("passwordAuthFail", { defaultMessage: "비밀번호 인증에 실패했습니다." }),
          subText: popupT("checkPassword", { defaultMessage: "비밀번호를 한번 더 확인해 주세요." }),
          onClose: () => { },
        });
        return false;
      }
    } catch (err) {
      customAlert({
        title: popupT("passwordAuthFail", { defaultMessage: "비밀번호 인증에 실패했습니다." }),
        subText: err instanceof Error ? err.message : popupT("unknownIssue", { defaultMessage: "알 수 없는 오류가 발생했습니다." }),
        onClose: () => { },
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
    setIsProcessing(true);
    const loadingToastId = showLoadingToast(popupT("processingWithdrawal", { defaultMessage: "회원 탈퇴 처리 중..." }));

    if (userStoreData?.login_type !== "local") {
      const socialResult = await handleSocialAccountWithdraw(userStoreData!.login_type);
      if (!socialResult) {
        updateToast(
          loadingToastId,
          `${userStoreData!.login_type.toUpperCase()} ${popupT("accountDeletionError", { defaultMessage: "로그인 회원 탈퇴 도중 오류 발생" })}`,
          "error",
        );
        customAlert({
          title: `${userStoreData!.login_type.toUpperCase()} ${popupT("errorDuringLoginWithdrawal", { defaultMessage: "로그인 회원 탈퇴 도중 오류가 발생했습니다." })}`,
          subText: popupT("retryLater", { defaultMessage: "잠시 후 다시 시도해 주세요." }),
          onClose: () => { },
        });
        setIsProcessing(false);
        return;
      }
    }

    if (userStoreData?.login_type === "local") {
      const passwordResponse = await handleVerifyPassword();
      if (!passwordResponse) {
        updateToast(loadingToastId, popupT("passwordValidationFail", { defaultMessage: "비밀번호 검증 실패" }), "error");
        setIsProcessing(false);
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
        updateToast(loadingToastId, popupT("deletionProcessError", { defaultMessage: "회원 탈퇴 처리 중 오류 발생" }), "error");
        customAlert({
          title: popupT("errorDuringWithdrawal", { defaultMessage: "회원 탈퇴 처리 중 오류가 발생했습니다." }),
          subText: popupT("retryLater", { defaultMessage: "잠시 후 다시 시도해 주세요." }),
          onClose: () => { },
        });
        setIsProcessing(false);
        return;
      }

      updateToast(loadingToastId, popupT("deletionSuccess", { defaultMessage: "회원 탈퇴가 성공적으로 처리되었습니다." }), "success");
      router.replace("/withdraw");
    } catch (err) {
      updateToast(loadingToastId, popupT("deletionProcessError", { defaultMessage: "회원 탈퇴 처리 중 오류 발생" }), "error");
      customAlert({
        title: popupT("errorDuringWithdrawal", { defaultMessage: "회원 탈퇴 처리 중 오류가 발생했습니다." }),
        subText: err instanceof Error ? err.message : popupT("unknownIssue", { defaultMessage: "알 수 없는 오류가 발생했습니다." }),
        onClose: () => { },
      });
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={t("mypage.withdraw", { defaultMessage: "회원탈퇴" })}
        isBackdropClosable={true}
        panelStyle="px-[10.2rem] py-[8rem] rounded-[3.2rem] w-[59rem] items-center justify-center"
      >
        <div className="flex w-full flex-col">
          <div className="mb-[2.9rem] mt-[4rem] flex flex-col gap-[1.6rem]">
            <Dropdown
              label={t("user.form.withdrawalReason", { defaultMessage: "회원탈퇴 사유" })}
              placeholder={t("user.form.selectWithdrawalReason", { defaultMessage: "회원탈퇴 사유를 선택해주세요" })}
              selected={selectedReason}
              setSelected={setSelectedReason}
              options={withdrawReasons}
            />
            {selectedReason.value === "other" && (
              <div>
                <label className="body_4 font-medium text-navy-900">{t("user.form.otherReason", { defaultMessage: "기타 사유" })}</label>
                <textarea
                  className="h-[10rem] w-full resize-none rounded-[0.8rem] border border-gray-300 p-[1.6rem] text-grayscale-900 focus:outline-blue-500"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  placeholder={t("user.form.enterOtherReason", { defaultMessage: "기타 사유를 입력해주세요." })}
                />
              </div>
            )}
            {userStoreData?.login_type === "local" ? (
              <Input
                labelName={t("user.form.passwordLabel", { defaultMessage: "비밀번호 입력" })}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                inputGroupClass="w-full h-[5.6rem]"
                inputClass="p-[1.6rem] rounded-[0.8rem] text-grayscale-900 font-normal"
                placeholder={t("user.form.enterPassword", { defaultMessage: "비밀번호를 입력해주세요." })}
                labelClass="body_4 font-medium text-navy-900"
              />
            ) : (
              <div className="h-[2rem]" />
            )}
          </div>
          <Button
            size="lg"
            bgColor={
              !isProcessing && (userStoreData?.login_type !== "local" || password) ? "bg-navy-900" : "bg-grayscale-200"
            }
            className={cn(
              `${!isProcessing && (userStoreData?.login_type !== "local" || password) ? "text-grayscale-0" : "text-gray-300"} mt-[6.4rem] w-full`,
            )}
            onClick={handleWithdraw}
            disabled={isProcessing || (userStoreData?.login_type === "local" && !password)}
          >
            {t("mypage.withdraw", { defaultMessage: "회원탈퇴" })}
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

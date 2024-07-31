"use client";

import { Modal, Button, Input, Alert } from "@/components/common";
import { useState, useEffect } from "react";
import { emailCert, passwordCert, verifyCode } from "../_api/privacyApi";
import { cn } from "@/utils/cn";
import useUserStore from "@/stores/useUserStore";
import useAlert from "@/hooks/use-alert";
import useToast from "@/hooks/use-toast";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

type TVerifyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
};

export default function VerifyModal({ isOpen, onClose, onEdit }: TVerifyModalProps) {
  const t = useTranslations("user.form");
  const popupT = useTranslations("user.popup")

  const { userStoreData } = useUserStore();
  const { alertInfo, customAlert } = useAlert();
  const { showLoadingToast, updateToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const [visibleCodeField, setVisibleCodeField] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setCode("");
      setVisibleCodeField(false);
      setTimeLeft(null);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (timeLeft !== null && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      customAlert({
        title: popupT("authCodeExpired", { defaultMessage: "인증 코드가 만료되었습니다." }),
        subText: popupT("requestAuthCode", { defaultMessage: "인증 코드를 다시 요청해주세요." }),
        onClose: () => { },
      });
      setVisibleCodeField(false);
      setTimeLeft(null);
      setCode("");
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [customAlert, timeLeft]);

  const startTimer = () => {
    setTimeLeft(180);
  };

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `0${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  const handleVerifyPassword = async () => {
    if (!userStoreData?.email || !password) return;

    try {
      const response = await passwordCert(userStoreData.email, password);
      if (response.ok) {
        onEdit();
      } else {
        customAlert({
          title: popupT("passwordAuthFail", { defaultMessage: "비밀번호 인증에 실패했습니다." }),
          subText: popupT("checkPassword", { defaultMessage: "비밀번호를 다시 확인해 주세요." }),
          onClose: () => { },
        });
      }
    } catch (err) {
      customAlert({
        title: popupT("passwordAuthError", { defaultMessage: "비밀번호 인증 도중 오류가 발생했습니다." }),
        subText: err instanceof Error ? err.message : popupT("unknownIssue", { defaultMessage: "알 수 없는 오류가 발생했습니다." }),
        onClose: () => { },
      });
    }
  };

  const handleVerifyEmail = async () => {
    if (!email) return;

    let loadingToastId;
    let isResponseReceived = false;

    const delayToast = setTimeout(() => {
      if (!isResponseReceived) {
        loadingToastId = showLoadingToast(popupT("emailVerificationInProgress", { defaultMessage: "이메일 인증 중..." }));
      }
    }, 500);

    try {
      const response = await emailCert(email);
      isResponseReceived = true;
      clearTimeout(delayToast);

      if (response.ok) {
        if (loadingToastId) updateToast(loadingToastId, popupT("authCodeSent", { defaultMessage: "이메일로 인증 코드를 전송했습니다." }), "success");
        setVisibleCodeField(true);
        customAlert({
          title: popupT("verificationCodeSent", { defaultMessage: "작성한 이메일 주소로 인증 코드를 전송했습니다." }),
          subText: popupT("continueSignup", { defaultMessage: "메일 확인 후 회원가입을 계속 진행해주세요." }),
          onClose: () => {
            startTimer();
          },
        });
      } else {
        toast.dismiss(loadingToastId);
        customAlert({
          title: popupT("emailAuthFail", { defaultMessage: "이메일 인증에 실패했습니다." }),
          subText: popupT("retryEmailCheck", { defaultMessage: "이메일을 확인 후 다시 시도해 주세요." }),
          onClose: () => { },
        });
      }
    } catch (err) {
      if (loadingToastId) toast.dismiss(loadingToastId);
      clearTimeout(delayToast);
      customAlert({
        title: popupT("emailAuthError", { defaultMessage: "이메일 인증 도중 오류가 발생했습니다." }),
        subText: err instanceof Error ? err.message : popupT("unknownIssue", { defaultMessage: "알 수 없는 오류가 발생했습니다." }),
        onClose: () => { },
      });
    }
  };

  const handleVerifyCode = async () => {
    if (!userStoreData?.email || !code) return;

    try {
      const verify = await verifyCode(userStoreData.email, code);
      if (verify.ok) {
        onEdit();
      } else {
        customAlert({
          title: popupT("authCodeMismatch", { defaultMessage: "인증코드가 일치하지 않습니다." }),
          subText: popupT("checkAuthCode", { defaultMessage: "인증코드를 다시 확인해 주세요." }),
          onClose: () => { },
        });
      }
    } catch (err) {
      customAlert({
        title: popupT("verificationCodeCheckError", { defaultMessage: "인증코드 확인 도중 오류가 발생했습니다." }),
        subText: err instanceof Error ? err.message : popupT("unknownIssue", { defaultMessage: "알 수 없는 오류가 발생했습니다." }),
        onClose: () => { },
      });
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={
          userStoreData?.login_type === "local"
            ? t("passwordAuth", { defaultMessage: "비밀번호 인증" })
            : t("emailVerify", { defaultMessage: "이메일 인증" })
        }
        isBackdropClosable={true}
        panelStyle="px-[10.2rem] py-[8rem] rounded-[3.2rem] w-[59rem] items-center justify-center"
      >
        <div className="mt-[4rem] flex w-full flex-col">
          {userStoreData?.login_type === "local" ? (
            <div className="flex flex-col gap-[6.4rem]">
              <Input
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                labelName={t("inputCurrentPassword", { defaultMessage: "현재 비밀번호 입력" })}
                type="password"
                placeholder={t("enterPassword", { defaultMessage: "비밀번호를 입력해주세요" })}
              />
              <Button
                size="lg"
                bgColor={password ? "bg-navy-900" : "bg-grayscale-200"}
                className={cn(`${password ? "text-grayscale-0" : "text-gray-300"}`)}
                onClick={handleVerifyPassword}
                disabled={!password}
              >
                {t("edit", { defaultMessage: "수정하기" })}
              </Button>
            </div>
          ) : (
            <div>
              <Input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                labelName={t("inputEmail", { defaultMessage: "이메일 입력" })}
                placeholder={t("enterEmail", { defaultMessage: "이메일을 입력해주세요" })}
              />
              {!visibleCodeField && (
                <Button
                  size="lg"
                  bgColor={email ? "bg-navy-900" : "bg-grayscale-200"}
                  className={cn(`mt-[6.4rem] ${email ? "text-grayscale-0" : "text-gray-300"}`)}
                  onClick={handleVerifyEmail}
                  disabled={!email}
                >
                  {t("sendCode", { defaultMessage: "인증 코드 발송" })}
                </Button>
              )}
              {visibleCodeField && (
                <div className="mt-[1.6rem]">
                  <Input
                    id="code"
                    name="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    labelName={t("enterCode", { defaultMessage: "인증 코드 입력" })}
                    placeholder={t("promptCode", { defaultMessage: "인증 코드를 입력해주세요" })}
                    suffix={
                      <div className="text-[1.4rem] text-blue-500">{timeLeft !== null && formatTime(timeLeft)}</div>
                    }
                  />
                  <Button
                    size="lg"
                    bgColor={code ? "bg-navy-900" : "bg-grayscale-200"}
                    className={cn(`mt-[6.4rem] ${code ? "text-grayscale-0" : "text-gray-300"}`)}
                    onClick={handleVerifyCode}
                    disabled={!code}
                  >
                    {t("verifyCode", { defaultMessage: "인증 코드 확인" })}
                  </Button>
                </div>
              )}
            </div>
          )}
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

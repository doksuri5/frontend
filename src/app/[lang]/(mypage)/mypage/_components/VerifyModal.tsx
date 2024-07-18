import { Modal, Button, Input, Alert } from "@/components/common";
import { useState, useEffect } from "react";
import { emailCert, passwordCert, verifyCode } from "../_api/privacyApi";
import { cn } from "@/utils/cn";
import useUserStore from "@/stores/useUserStore";

type TVerifyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
};

export default function VerifyModal({ isOpen, onClose, onEdit }: TVerifyModalProps) {
  const { userStoreData } = useUserStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const [visibleCodeField, setVisibleCodeField] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const [openEmailFailAlert, setOpenEmailFailAlert] = useState(false);
  const [openPasswordFailAlert, setOpenPasswordFailAlert] = useState(false);
  const [openEmailSentAlert, setOpenEmailSentAlert] = useState(false);
  const [openCodeFailAlert, setOpenCodeFailAlert] = useState(false);
  const [openExpiredAlert, setOpenExpiredAlert] = useState(false);

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
      setOpenExpiredAlert(true);
      setVisibleCodeField(false);
      setTimeLeft(null);
      setCode("");
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft]);

  const startTimer = () => {
    setTimeLeft(180);
  };

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  const handleVerifyPassword = async () => {
    if (!userStoreData?.email || !password) return;

    const response = await passwordCert(userStoreData.email, password);
    if (response.ok) {
      onEdit();
    } else {
      setOpenPasswordFailAlert(true);
    }
  };

  const handleVerifyEmail = async () => {
    if (!email) return;

    const response = await emailCert(email);
    if (response.ok) {
      setVisibleCodeField(true);
      setOpenEmailSentAlert(true);
    } else {
      setOpenEmailFailAlert(true);
    }
  };

  const handleVerifyCode = async () => {
    if (!userStoreData?.email || !code) return;

    const verify = await verifyCode(userStoreData.email, code);
    if (verify.ok) {
      onEdit();
    } else {
      setOpenCodeFailAlert(true);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={userStoreData?.login_type === "local" ? "비밀번호 인증" : "이메일 인증"}
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
              labelName="현재 비밀번호 입력"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
            <Button
              size="lg"
              bgColor={password ? "bg-navy-900" : "bg-grayscale-200"}
              className={cn(`${password ? "text-grayscale-0" : "text-gray-300"}`)}
              onClick={handleVerifyPassword}
              disabled={!password}
            >
              수정하기
            </Button>
          </div>
        ) : (
          <div>
            <Input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              labelName="이메일 입력"
              placeholder="이메일을 입력해주세요"
            />
            {!visibleCodeField && (
              <Button
                size="lg"
                bgColor={email ? "bg-navy-900" : "bg-grayscale-200"}
                className={cn(`mt-[6.4rem] ${email ? "text-grayscale-0" : "text-gray-300"}`)}
                onClick={handleVerifyEmail}
                disabled={!email}
              >
                인증 코드 발송
              </Button>
            )}
            {visibleCodeField && (
              <div className="mt-[1.6rem]">
                <Input
                  id="code"
                  name="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  labelName="인증 코드 입력"
                  placeholder="인증 코드를 입력해주세요"
                />
                <div className="flex justify-end text-[1.4rem] text-blue-500">
                  {timeLeft !== null && formatTime(timeLeft)}
                </div>
                <Button
                  size="lg"
                  bgColor={code ? "bg-navy-900" : "bg-grayscale-200"}
                  className={cn(`mt-[6.4rem] ${code ? "text-grayscale-0" : "text-gray-300"}`)}
                  onClick={handleVerifyCode}
                  disabled={!code}
                >
                  인증 코드 확인
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Alert 창 */}
      {openExpiredAlert && (
        <Alert
          variant="checkCustomCloseButton"
          title="인증 코드가 만료되었습니다."
          subText="인증 코드를 다시 요청해주세요."
          buttonText="확인"
          onClose={() => setOpenExpiredAlert(false)}
        />
      )}
      {openPasswordFailAlert && (
        <Alert
          variant="checkCustomCloseButton"
          title="비밀번호 인증에 실패했습니다."
          subText="비밀번호를 다시 확인해 주세요."
          buttonText="확인"
          onClose={() => setOpenPasswordFailAlert(false)}
        />
      )}
      {openEmailFailAlert && (
        <Alert
          variant="checkCustomCloseButton"
          title="이메일 인증에 실패했습니다."
          subText="이메일을 다시 확인해 주세요."
          buttonText="확인"
          onClose={() => setOpenEmailFailAlert(false)}
        />
      )}
      {openEmailSentAlert && (
        <Alert
          variant="checkCustomCloseButton"
          title="작성한 이메일주소로 인증 코드를 전송했습니다."
          subText="메일 확인 후 회원가입을 계속 진행해주세요."
          buttonText="확인"
          onClose={() => {
            setOpenEmailSentAlert(false);
            startTimer();
          }}
        />
      )}
      {openCodeFailAlert && (
        <Alert
          variant="checkCustomCloseButton"
          title="인증코드가 일치하지 않거나 만료되었습니다."
          subText="인증코드를 다시 확인해 주세요."
          buttonText="확인"
          onClose={() => setOpenCodeFailAlert(false)}
        />
      )}
    </Modal>
  );
}

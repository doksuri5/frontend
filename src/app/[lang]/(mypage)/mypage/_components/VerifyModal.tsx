import { Modal, Button, Input } from "@/components/common";
import { useRef, useState, useEffect } from "react";
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
      alert("인증 코드가 만료되었습니다. 다시 요청해주세요.");
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
    if (!userStoreData?.email) return;

    const response = await passwordCert(userStoreData.email, password);
    if (response.ok) {
      alert(response.message);
      onEdit();
    } else {
      alert(response.message);
    }
  };

  const handleVerifyEmail = async () => {
    if (!email) return;
    const response = await emailCert(email);
    if (response.ok) {
      alert(response.message);
      setVisibleCodeField(true);
      startTimer();
    } else {
      alert(response.message);
    }
  };

  const handleVerifyCode = async () => {
    if (!userStoreData?.email) return;

    const verify = await verifyCode(userStoreData.email, code);
    if (verify.ok) {
      alert(verify.message);
      onEdit();
    } else {
      alert(verify.message);
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
            <Button size="lg" className="text-grayscale-0" onClick={handleVerifyPassword} disabled={!password}>
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
                <div className="flex justify-end text-[1.4rem] text-success-100">
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
    </Modal>
  );
}

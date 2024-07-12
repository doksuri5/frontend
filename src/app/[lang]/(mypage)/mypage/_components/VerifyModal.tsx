import { Modal, Button, Input } from "@/components/common";
import { useState } from "react";
import { passwordCert } from "../_api/privacyApi";

type TVerifyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  loginType: string;
};

const userEmail = "abcde@test.com";

export default function VerifyModal({ isOpen, onClose, onEdit, loginType }: TVerifyModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const verify = async () => {
    if (loginType === "local") {
      const response = await passwordCert(userEmail, password);
      if (response.ok) {
        alert(response.message);
        onEdit();
      } else {
        alert(response.message);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setPassword("");
        setEmail("");
        onClose();
      }}
      title={loginType === "local" ? "비밀번호 인증" : "이메일 인증"}
      isBackdropClosable={true}
      panelStyle="px-[10.2rem] py-[8rem] rounded-[3.2rem] w-[59rem] items-center justify-center"
    >
      <div className="mt-[4rem] flex w-full flex-col">
        {loginType === "local" ? (
          <Input
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            labelName="현재 비밀번호 입력"
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
        ) : (
          <Input
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            labelName="이메일 입력"
            placeholder="이메일을 입력해주세요"
          />
        )}
        <Button size="lg" className="mt-[5.6rem] text-grayscale-0" onClick={verify}>
          {loginType === "local" ? "수정하기" : "회원탈퇴"}
        </Button>
      </div>
    </Modal>
  );
}

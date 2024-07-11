import { Modal, Button, Input } from "@/components/common";

type TVerifyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  loginType: string;
};

export default function VerifyModal({ isOpen, onClose, onEdit, loginType }: TVerifyModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={loginType === "local" ? "비밀번호 인증" : "이메일 인증"}
      isBackdropClosable={true}
      panelStyle="px-[10.2rem] py-[8rem] rounded-[3.2rem] w-[59rem] items-center justify-center"
    >
      <div className="mt-[4rem] flex w-full flex-col">
        {loginType === "local" ? (
          <Input
            id="password"
            name="password"
            // value=""
            labelName="현재 비밀번호 입력"
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
        ) : (
          <Input
            id="email"
            name="email"
            // value=""
            labelName="이메일 입력"
            placeholder="이메일을 입력해주세요"
          />
        )}
        <Button size="lg" className="mt-[5.6rem] text-grayscale-0" onClick={onEdit}>
          {loginType === "local" ? "수정하기" : "회원탈퇴"}
        </Button>
      </div>
    </Modal>
  );
}

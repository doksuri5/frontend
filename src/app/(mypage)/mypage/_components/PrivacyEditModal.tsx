import { Modal, Button } from "@/components/common";
import UserPrivacyForm from "@/components/common/User/UserPrivacyForm";

type TPrivacyEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  openWithdrawModal: () => void;
};

export default function PrivacyEditModal({ isOpen, onClose, openWithdrawModal }: TPrivacyEditModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="정보 수정"
      isBackdropClosable={true}
      panelStyle="px-[10.2rem] py-[8rem] rounded-[3.2rem] w-[59rem]"
    >
      <div className="mt-[5.6rem] flex w-full flex-col items-center justify-center">
        <UserPrivacyForm page="mypage" closeModal={onClose} />
        <Button
          variant="textButton"
          size="sm"
          bgColor="bg-inherit"
          className="w-[6.4rem] text-warning-100 underline"
          onClick={openWithdrawModal}
        >
          회원 탈퇴
        </Button>
      </div>
    </Modal>
  );
}

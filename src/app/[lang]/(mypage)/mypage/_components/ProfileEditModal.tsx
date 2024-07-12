import { Modal } from "@/components/common";
import EditProfileForm from "@/app/[lang]/(mypage)/mypage/_components/EditProfileForm";

type TProfileEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProfileEditModal({ isOpen, onClose }: TProfileEditModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="프로필 수정"
      isBackdropClosable={true}
      panelStyle="px-[10.2rem] py-[8rem] rounded-[3.2rem] w-[59rem] items-center justify-center"
    >
      <div className="mt-[4rem] flex w-full flex-col">
        <EditProfileForm closeModal={onClose} />
      </div>
    </Modal>
  );
}

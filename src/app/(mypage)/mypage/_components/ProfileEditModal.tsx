import { Modal } from "@/components/common";
import UserProfileForm from "@/components/common/User/UserProfileForm";

const stockList = [
  { value: "tsla", label: "#테슬라" },
  { value: "apple", label: "#애플" },
  { value: "amzn", label: "#아마존" },
  { value: "maft", label: "#MS" },
  { value: "googl", label: "#구글" },
  { value: "u", label: "#유니티" },
];

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
        <UserProfileForm
          page="mypage"
          stockOptionList={stockList}
          file="/icons/avatar_default.svg"
          closeModal={onClose}
        />
      </div>
    </Modal>
  );
}

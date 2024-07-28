import { Modal, Button } from "@/components/common";
import EditPrivacyForm from "@/app/[lang]/(mypage)/mypage/_components/EditPrivacyForm";
import { useTranslations } from "next-intl";

type TPrivacyEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  openWithdrawModal: () => void;
};

export default function PrivacyEditModal({ isOpen, onClose, openWithdrawModal }: TPrivacyEditModalProps) {
  const t = useTranslations("mypage");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title= {t("editInfo", { defaultMessage: "정보 수정" })}
      isBackdropClosable={true}
      panelStyle="px-[10.2rem] py-[8rem] rounded-[3.2rem] w-[59rem]"
    >
      <div className="mt-[5.6rem] flex w-full flex-col items-center justify-center">
        <EditPrivacyForm closeModal={onClose} />
        <Button
          variant="textButton"
          size="sm"
          bgColor="bg-inherit"
          className="w-[6.4rem] text-warning-100 underline"
          onClick={openWithdrawModal}
        >
          {t("withdraw", { defaultMessage: "회원 탈퇴" })}
        </Button>
      </div>
    </Modal>
  );
}

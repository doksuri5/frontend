"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/common";
import ModalInput from "./ModalInput";
import { useMyStockStore } from "@/providers/MyStockProvider";
import { StockDataType } from "@/types";

const ModalContainer = ({ isData }: { isData: boolean }) => {
  const t = useTranslations("myStock");

  const { openModal, setOpenModal } = useMyStockStore((state) => ({
    openModal: state.openModal,
    setOpenModal: state.setOpenModal,
  }));

  const [searchStock, setSearchStock] = useState<StockDataType[]>([]);

  useEffect(() => {
    isData && setOpenModal(true);
  }, [isData]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Modal
      panelStyle="p-[4rem] rounded-[3.2rem] w-[80rem] min-h-[57rem]"
      isOpen={openModal}
      onClose={handleCloseModal}
      title={t("modal.modalTitle")}
      titleStyle="body_1 text-navy-900"
      closeIcon={true}
    >
      <ModalInput setSearchStock={setSearchStock} />
    </Modal>
  );
};

export default ModalContainer;

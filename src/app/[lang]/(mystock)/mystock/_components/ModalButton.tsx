"use client";

import { useTranslations } from "next-intl";
import { useMyStockStore } from "@/providers/MyStockProvider";
import { Button } from "@/components/common";

const ModalButton = () => {
  const t = useTranslations("myStock");
  const setOpenModal = useMyStockStore((state) => state.setOpenModal);

  const handleAddStock = () => {
    setOpenModal(true);
  };

  return (
    <Button variant="textButton" size="sm" bgColor="bg-navy-900" className="w-[19rem]" onClick={handleAddStock}>
      {t("headerButton")}
    </Button>
  );
};

export default ModalButton;

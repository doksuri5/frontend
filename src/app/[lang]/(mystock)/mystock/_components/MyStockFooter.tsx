"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { deleteInterestStock } from "@/actions/stock";
import { Alert, Button } from "@/components/common";
import { TReutersCodes } from "@/constants/stockCodes";
import { REPORT_PATH } from "@/routes/path";
import useToast from "@/hooks/use-toast";

const MyStockFooter = ({ reutersCode }: { reutersCode: TReutersCodes }) => {
  const t = useTranslations("myStock");

  const [showAlert, setShowAlert] = useState(false);

  const { showLoadingToast, updateToast } = useToast();

  const handleDeleteClick = () => {
    setShowAlert(true);
  };

  const handleAlertConfirm = async (reutersCode: string) => {
    const toast = showLoadingToast(t("modal.modalSearchItemDeleteLoading"));
    try {
      const response = await deleteInterestStock(undefined, { params: reutersCode });
      if (response.ok) {
        updateToast(toast, t("modal.modalSearchItemDeleteSuccess"), "success", 1000);
      } else {
        updateToast(toast, t("modal.modalSearchItemDeleteError"), "error", 1000);
      }
    } catch (err) {
      updateToast(toast, t("modal.modalSearchItemDeleteError"), "error", 1000);
      console.log(err);
    } finally {
      setShowAlert(false);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };
  return (
    <>
      <div className="flex_row mt-[1.6rem] w-full gap-[.8rem]">
        <Button
          className="flex-1"
          variant="textButton"
          size="md"
          bgColor="bg-grayscale-200"
          onClick={handleDeleteClick}
        >
          {t("deleteButton")}
        </Button>
        <Link href={`${REPORT_PATH}/${reutersCode}`} className="flex-1">
          <Button variant="textButton" size="md" bgColor="bg-navy-900">
            {t("detailView")}
          </Button>
        </Link>
      </div>

      {/* Alert 컴포넌트 */}
      {showAlert && (
        <Alert
          variant="fnButton"
          title={t("alert.alertTitle")}
          buttonText={t("deleteButton")}
          subButtonText={t("alert.alertCancleText")}
          onClick={() => handleAlertConfirm(reutersCode)}
          onClose={handleAlertClose}
        />
      )}
    </>
  );
};

export default MyStockFooter;

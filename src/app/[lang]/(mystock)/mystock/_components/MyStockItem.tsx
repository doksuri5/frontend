"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Alert, Button } from "@/components/common";
import SimpleReportCard from "@/components/common/SimpleReportCard";
import { StockDataType } from "@/types";
import { REPORT_PATH } from "@/routes/path";
import { deleteInterestStock } from "@/actions/stock";

const MyStockItem = ({ data }: { data: StockDataType }) => {
  const t = useTranslations("myStock");
  const [showAlert, setShowAlert] = useState(false);

  // Alert 띄우기
  const handleDeleteClick = useCallback(() => {
    setShowAlert(true);
  }, []);

  // Alert 끄기
  const handleAlertClose = useCallback(() => {
    setShowAlert(false);
  }, []);

  // 삭제 진행
  const handleAlertConfirm = useCallback(async (reutersCode: string) => {
    await deleteInterestStock(undefined, { params: reutersCode });
    setShowAlert(false);
  }, []);

  return (
    <div className="flex flex-col justify-start gap-2 rounded-[1.6rem] bg-white px-[3.2rem] py-[3rem]">
      <SimpleReportCard isShowHeader={true} titleSize="lg" reutersCode={data.reutersCode} />
      {/* 버튼 */}
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
        <Link href={`${REPORT_PATH}/${data.reutersCode}`} className="flex-1">
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
          onClick={() => handleAlertConfirm(data.reutersCode)}
          onClose={handleAlertClose}
        />
      )}
    </div>
  );
};

export default React.memo(MyStockItem);

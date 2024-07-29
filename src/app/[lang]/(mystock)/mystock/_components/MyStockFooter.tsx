"use client";

import { useState } from "react";
import { deleteInterestStock } from "@/actions/stock";
import { Alert, Button } from "@/components/common";
import { TReutersCodes } from "@/constants/stockCodes";
import { REPORT_PATH } from "@/routes/path";
import Link from "next/link";

const MyStockFooter = ({ reutersCode }: { reutersCode: TReutersCodes }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleDeleteClick = () => {
    setShowAlert(true);
  };

  const handleAlertConfirm = async (reutersCode: string) => {
    await deleteInterestStock(undefined, { params: reutersCode });
    setShowAlert(false);
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
          삭제하기
        </Button>
        <Link href={`${REPORT_PATH}/${reutersCode}`} className="flex-1">
          <Button variant="textButton" size="md" bgColor="bg-navy-900">
            자세히 보기
          </Button>
        </Link>
      </div>

      {/* Alert 컴포넌트 */}
      {showAlert && (
        <Alert
          variant="fnButton"
          title="관심 종목을 삭제하시겠습니까?"
          buttonText="삭제하기"
          subButtonText="취소"
          onClick={() => handleAlertConfirm(reutersCode)}
          onClose={handleAlertClose}
        />
      )}
    </>
  );
};

export default MyStockFooter;

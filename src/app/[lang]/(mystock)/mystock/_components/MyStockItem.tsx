"use client";

import { useState } from "react";
import Image from "next/image";
import { Alert, Button } from "@/components/common";
import { StockDataType } from "@/types";
import { formatValueWithIndicator, formatValueWithSign, getTextColor } from "@/utils/stockPriceUtils";
import Link from "next/link";
import { REPORT_PATH } from "@/routes/path";
import { STOCK_NAMES } from "@/constants/stockCodes";
import SimpleReportCard from "@/components/common/SimpleReportCard";
import { deleteInterestStock } from "@/actions/stock";

type TMyStockItemProps = {
  data: StockDataType;
};
const MyStockItem = ({ data }: TMyStockItemProps) => {
  const [showAlert, setShowAlert] = useState(false);

  const cashSymbol = new Map([
    ["USA", "$"],
    ["KOR", "₩"],
  ]);

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
          삭제하기
        </Button>
        <Link href={`${REPORT_PATH}/${data.reutersCode}`} className="flex-1">
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
          onClick={() => handleAlertConfirm(data.reutersCode)}
          onClose={handleAlertClose}
        />
      )}
    </div>
  );
};

export default MyStockItem;

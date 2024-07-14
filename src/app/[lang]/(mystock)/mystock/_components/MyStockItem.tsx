"use client";

import { useState } from "react";
import Image from "next/image";
import { Alert, Button } from "@/components/common";
import { StockDataType } from "@/types";
import { formatValueWithIndicator, formatValueWithSign, getTextColor } from "@/utils/stockPriceUtils";
import graph from "@/public/icons/graph.png";
import Link from "next/link";
import { REPORT_PATH } from "@/routes/path";

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

  const handleAlertConfirm = (id: string) => {
    console.log(id, "삭제 완료");
    // delete fetching 진행
    setShowAlert(false);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <div className="flex_col rounded-[1.6rem] bg-white px-[3.2rem]">
      {/* 주식 정보 */}
      <div className="mb-[1.6rem] mt-[3.2rem] w-full">
        <div className="flex_row justify-start gap-[.8rem]">
          <Image src={data.icon} alt="아이콘" width={32} height={32} />
          <strong className="body_1 text-grayscale-900">{data.stockName}</strong>
          <span className="body_3 text-grayscale-600">{data.symbolCode}</span>
        </div>
        <div className="flex_row justify-start gap-[.8rem]">
          <span className="body_4 font-medium text-grayscale-900">{`${cashSymbol.get(data.nationType) || ""}${data.price}`}</span>
          <span className={`${getTextColor(data.compareToPreviousClosePrice)}`}>
            {formatValueWithIndicator(data.compareToPreviousClosePrice)}
          </span>
          <span className={`${getTextColor(data.fluctuationsRatio)}`}>
            {formatValueWithSign(data.fluctuationsRatio) + "%"}
          </span>
        </div>
      </div>

      {/* 차트 */}
      <div className="flex_row justify-between gap-[2.4rem]">
        <Image src={graph} alt="dd" />
        <div className="h-[16.8rem] w-[16.8rem] rounded-[2.4rem] bg-background-100 px-[2.4rem] py-[1.6rem]"></div>
      </div>

      {/* 버튼 */}
      <div className="flex_row my-[1.6rem] w-full gap-[.8rem]">
        <Button variant="textButton" size="md" bgColor="bg-grayscale-200" onClick={handleDeleteClick}>
          삭제하기
        </Button>
        <Link href={`${REPORT_PATH}/${data.reutersCode}`}>
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
          onClick={() => handleAlertConfirm(data._id)}
          onClose={handleAlertClose}
        />
      )}
    </div>
  );
};

export default MyStockItem;

"use client";

import { Dispatch, MouseEvent, SetStateAction, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Alert, StockItem } from "@/components/common";
import useDraggable from "@/hooks/use-draggable";
import { deleteRecentSearch, saveRecentSearch } from "@/actions/stock";
import { StockDataType } from "@/types/StockDataType";

type TMyStockRecentSearchedProps = {
  recentSearchedData: StockDataType[];
  setRecentSearchedData: Dispatch<SetStateAction<StockDataType[]>>;
  setSearchText: Dispatch<SetStateAction<string>>;
};
const ModalRecentSearches = ({
  recentSearchedData,
  setRecentSearchedData,
  setSearchText,
}: TMyStockRecentSearchedProps) => {
  const t = useTranslations("myStock");

  const [showAlert, setShowAlert] = useState(false);

  const ref = useRef(null);
  const draggableOptions = useDraggable(ref);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  // 최근 검색어 전체 삭제
  const handleDeleteSearch = async () => {
    await deleteRecentSearch();
    setRecentSearchedData([]);
  };

  // 최근 검색어 클릭 시 해당 검색어로 검색
  const handleMove = async (e: MouseEvent<HTMLDivElement>, stockName: string) => {
    e.preventDefault();
    e.stopPropagation();

    const response = await saveRecentSearch({ stockName });
    if (response.ok) {
      setSearchText(stockName);
      setRecentSearchedData((prev) => {
        const newData = response.data.filter(
          (newItem) => !prev.some((prevItem) => prevItem.reutersCode === newItem.reutersCode),
        );
        return [...newData, ...prev];
      });
    }
  };

  return (
    <>
      {recentSearchedData.length === 0 || (
        <div className="flex flex-col gap-[1.6rem]">
          <div className="flex_row justify-between">
            <h3 className="body_3 font-medium text-navy-900">{t("modal.modalRecentSearchTitle")}</h3>
            <span className="body_5 cursor-pointer font-medium text-grayscale-600 underline" onClick={handleShowAlert}>
              {t("modal.modalAllDeleteText")}
            </span>
          </div>
          <ul className="flex touch-none gap-[2rem] overflow-x-scroll scrollbar-hide" ref={ref} {...draggableOptions()}>
            {recentSearchedData.map((stock) => (
              <div
                key={stock.id}
                className="cursor-pointer rounded-[1.6rem] border border-navy-100 px-[1.6rem] py-[2.4rem]"
                onClick={(e) => handleMove(e, stock.stockName)}
              >
                <StockItem variant="findStock" style="h-[4.8rem]" clickNone={true} {...stock} />
              </div>
            ))}
          </ul>

          {showAlert && (
            <Alert
              variant="fnButton"
              title={t("alert.alertTitleAll")}
              buttonText={t("deleteButton")}
              subButtonText={t("alert.alertCancleText")}
              onClick={handleDeleteSearch}
              onClose={() => setShowAlert(false)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ModalRecentSearches;

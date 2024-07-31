"use client";

import { useTranslations } from "next-intl";
import { Dispatch, MouseEvent, SetStateAction, useRef, useState } from "react";
import { Alert, StockItem } from "@/components/common";
import useDraggable from "@/hooks/use-draggable";
import { useRecentSearchStore } from "@/stores";
import { deleteRecentSearch, saveRecentSearch } from "@/actions/stock";

type TMyStockRecentSearchedProps = {
  setSearchText: Dispatch<SetStateAction<string>>;
};

const MyStockRecentSearches = ({ setSearchText }: TMyStockRecentSearchedProps) => {
  const t = useTranslations("myStock");

  const [showAlert, setShowAlert] = useState(false);
  const ref = useRef(null);
  const draggableOptions = useDraggable(ref);
  const { searchItemList, addSearchItemList, allDeleteSearchItem } = useRecentSearchStore();

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleDeleteSearch = async () => {
    allDeleteSearchItem();
    // delete fetch 진행
    await deleteRecentSearch();
  };

  const handleMove = async (e: MouseEvent<HTMLDivElement>, stockName: string) => {
    e.preventDefault();
    e.stopPropagation();

    setSearchText(stockName);
    const response = await saveRecentSearch({ stockName });
    if (response.ok) {
      addSearchItemList({
        ...response.data[0],
      });
    }
  };

  return (
    <div className="flex flex-col gap-[1.6rem]">
      <div className="flex_row justify-between">
        <h3 className="body_3 font-medium text-navy-900">{t("modal.modalRecentSearchTitle")}</h3>
        <span className="body_5 cursor-pointer font-medium text-grayscale-600 underline" onClick={handleShowAlert}>
          {t("modal.modalAllDeleteText")}
        </span>
      </div>
      <ul className="flex touch-none gap-[2rem] overflow-x-scroll scrollbar-hide" ref={ref} {...draggableOptions()}>
        {searchItemList.map((stock) => (
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
  );
};

export default MyStockRecentSearches;

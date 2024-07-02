"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input, Modal } from "@/components/common";
import {
  MyStockSearchResult,
  MyStockPopularSearches,
  MyStockRecentSearches,
} from "@/app/[lang]/(mystock)/mystock/_components";
import { useModalStore, useRecentSearchStore } from "@/stores";
import { SearchDetailDataType, StockDataType } from "@/types";
import SearchIcon from "@/public/icons/search_icon.svg?component";

const STOCK_LIST = ["애플", "마이크로소프트", "테슬라", "아마존", "구글", "유니티"];

const MyStockModalSection = ({
  dataList,
  recentSearchList,
}: {
  dataList: StockDataType[];
  recentSearchList: SearchDetailDataType[];
}) => {
  const { openModal, setOpenModal } = useModalStore();
  const { stockItemList, setStockItemList, addStockItemList } = useRecentSearchStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    dataList.length === 0 && setOpenModal(true);
  }, [dataList, setOpenModal]);

  useEffect(() => {
    setStockItemList(recentSearchList);
  }, [recentSearchList, setStockItemList]);

  const handleCloseModal = () => {
    setOpenModal(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSearchText(""); // 검색 텍스트 초기화
  };

  const handleSearch = () => {
    if (inputRef.current) {
      const value = inputRef.current.value.trim(); // 입력 값에서 공백 제거
      setSearchText(value);
      if (STOCK_LIST.includes(value))
        addStockItemList({
          _id: String(Date.now()),
          user_id: "",
          icon: "/icons/Apple_icon.svg",
          stockName: value,
          symbolCode: "AAPL",
          price: 0.0,
          nationType: "USA",
          compareToPreviousClosePrice: 1.75,
          fluctuationsRatio: 0.82,
          created_at: "06.14",
        });
    }
  };

  return (
    <Modal
      panelStyle="p-[4rem] rounded-[3.2rem] w-[80rem] min-h-[57rem]"
      isOpen={openModal}
      onClose={handleCloseModal}
      title="관심 종목 추가"
      titleStyle="body_1 text-navy-900"
      closeIcon={true}
    >
      <div className="mt-[3rem] flex w-full flex-col gap-[2.4rem]">
        <Input
          type="text"
          ref={inputRef}
          inputGroupClass="h-[5.6rem]"
          inputClass="text-grayscale-900 h-[5.6rem] rounded-[0.8rem]"
          placeholder="검색어를 입력해주세요."
          onKeyUp={(e) => e.key === "Enter" && handleSearch()}
          suffix={<SearchIcon className="cursor-pointer" onClick={handleSearch} />}
        />
        {searchText !== "" ? (
          <MyStockSearchResult value={searchText} /> // 검색 리스트
        ) : (
          <>
            {stockItemList.length > 0 && <MyStockRecentSearches />}
            <MyStockPopularSearches />
          </>
        )}
      </div>
    </Modal>
  );
};

export default MyStockModalSection;

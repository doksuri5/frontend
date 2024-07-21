"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input, Modal } from "@/components/common";
import {
  MyStockSearchResult,
  MyStockPopularSearches,
  MyStockRecentSearches,
} from "@/app/[lang]/(mystock)/mystock/_components";
import { useModalStore, useRecentSearchStore } from "@/stores";
import { StockDataType } from "@/types";
import SearchIcon from "@/public/icons/search_icon.svg?component";
import { saveRecentSearch } from "@/actions/stock";

const MyStockModalSection = ({
  dataList,
  recentSearchList,
}: {
  dataList: StockDataType[];
  recentSearchList: StockDataType[];
}) => {
  const { openModal, setOpenModal } = useModalStore();
  const { stockItemList, setStockItemList, addStockItemList } = useRecentSearchStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    setStockItemList(recentSearchList);
    dataList && dataList.length === 0 && setOpenModal(true);
  }, [dataList, recentSearchList, setOpenModal, setStockItemList]);

  const handleCloseModal = () => {
    setOpenModal(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSearchText(""); // 검색 텍스트 초기화
  };

  const handleSearch = async () => {
    if (inputRef.current) {
      const value = inputRef.current.value.trim(); // 입력 값에서 공백 제거
      setSearchText(value);

      if (value === "") return;

      const response = await saveRecentSearch({ stockName: value });
      if (response.ok) {
        addStockItemList({
          ...response.data[0],
        });
      }
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
          defaultValue={searchText}
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
            {stockItemList.length > 0 && <MyStockRecentSearches setSearchText={setSearchText} />}
            <MyStockPopularSearches />
          </>
        )}
      </div>
    </Modal>
  );
};

export default MyStockModalSection;

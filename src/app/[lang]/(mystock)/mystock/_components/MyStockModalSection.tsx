"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Input, Modal, SearchBox } from "@/components/common";
import {
  MyStockSearchResult,
  MyStockPopularSearches,
  MyStockRecentSearches,
} from "@/app/[lang]/(mystock)/mystock/_components";
import { useRecentSearchStore } from "@/stores";
import { useInterestStockStore } from "../stores";
import { saveRecentSearch } from "@/actions/stock";
import { useMyStockStore } from "@/providers/MyStockProvider";
import useDebouncedSearch from "@/hooks/use-debounced-search";
import { StockDataType } from "@/types";
import SearchIcon from "@/public/icons/search_icon.svg?component";

type TMyStockModalSection = {
  dataList: StockDataType[];
  recentSearchList: StockDataType[];
};
const MyStockModalSection = ({ dataList, recentSearchList }: TMyStockModalSection) => {
  const t = useTranslations("myStock");

  const openModal = useMyStockStore((state) => state.openModal);
  const setOpenModal = useMyStockStore((state) => state.setOpenModal);
  const { searchItemList, setSearchItemList, addSearchItemList } = useRecentSearchStore();
  const { setStockItemList } = useInterestStockStore();

  const [searchText, setSearchText] = useState("");

  const { inputValue, debouncedValue, setInputValue } = useDebouncedSearch();
  const [isVisibleSearchBox, setIsVisibleSearchBox] = useState(false);

  useEffect(() => {
    setSearchItemList(recentSearchList);
    setStockItemList(dataList);
    dataList && dataList.length === 0 && setOpenModal(true);
  }, [dataList, recentSearchList, setOpenModal, setSearchItemList]);

  const handleCloseModal = () => {
    setOpenModal(false);

    // 모달이 꺼짐과 동시에 텍스트가 없어지면서 모달 화면이 잠깐 변하기 때문에 모달 꺼진 후에 실행 되도록
    setTimeout(() => {
      setSearchText("");
      setInputValue("");
    }, 300);
  };

  const handleSearch = async (search: string) => {
    setIsVisibleSearchBox(false);
    if (search.trim() !== "") {
      setSearchText(search);
      const response = await saveRecentSearch({ stockName: search });
      if (response.ok) addSearchItemList({ ...response.data[0] });
    } else {
      setSearchText("");
    }
  };

  return (
    <Modal
      panelStyle="p-[4rem] rounded-[3.2rem] w-[80rem] min-h-[57rem]"
      isOpen={openModal}
      onClose={handleCloseModal}
      title={t("modal.modalTitle")}
      titleStyle="body_1 text-navy-900"
      closeIcon={true}
    >
      <div className="mt-[3rem] flex w-full flex-col gap-[2.4rem]">
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(inputValue);
            }}
          >
            <Input
              type="text"
              value={inputValue}
              inputGroupClass="h-[5.6rem]"
              inputClass="text-grayscale-900 h-[5.6rem] rounded-[0.8rem]"
              placeholder={t("modal.modalInput")}
              onChange={(e) => {
                setInputValue(e.target.value);
                setIsVisibleSearchBox(true);
              }}
              suffix={<SearchIcon className="cursor-pointer" onClick={() => handleSearch(inputValue)} />}
            />
          </form>
          {isVisibleSearchBox && debouncedValue && <SearchBox inputValue={debouncedValue} onSelect={handleSearch} />}
        </div>
        {searchText !== "" ? (
          <MyStockSearchResult search={searchText} /> // 검색 리스트
        ) : (
          <>
            {searchItemList.length > 0 && <MyStockRecentSearches setSearchText={setSearchText} />}
            <MyStockPopularSearches />
          </>
        )}
      </div>
    </Modal>
  );
};

export default MyStockModalSection;

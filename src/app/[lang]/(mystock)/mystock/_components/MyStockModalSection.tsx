"use client";

import React, { useEffect, useState } from "react";
import { Input, Modal, SearchBox } from "@/components/common";
import {
  MyStockSearchResult,
  MyStockPopularSearches,
  MyStockRecentSearches,
} from "@/app/[lang]/(mystock)/mystock/_components";
import { useRecentSearchStore } from "@/stores";
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
  const openModal = useMyStockStore((state) => state.openModal);
  const setOpenModal = useMyStockStore((state) => state.setOpenModal);
  const { stockItemList, setStockItemList, addStockItemList } = useRecentSearchStore();

  const [searchText, setSearchText] = useState("");

  const { inputValue, debouncedValue, setInputValue } = useDebouncedSearch();
  const [isVisibleSearchBox, setIsVisibleSearchBox] = useState(false);

  useEffect(() => {
    setStockItemList(recentSearchList);
    dataList && dataList.length === 0 && setOpenModal(true);
  }, [dataList, recentSearchList, setOpenModal, setStockItemList]);

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
      if (response.ok) addStockItemList({ ...response.data[0] });
    } else {
      setSearchText("");
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
              placeholder="검색어를 입력해주세요."
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
            {stockItemList.length > 0 && <MyStockRecentSearches setSearchText={setSearchText} />}
            <MyStockPopularSearches />
          </>
        )}
      </div>
    </Modal>
  );
};

export default MyStockModalSection;

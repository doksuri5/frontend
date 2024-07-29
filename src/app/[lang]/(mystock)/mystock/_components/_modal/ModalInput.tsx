"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { useTranslations } from "next-intl";
import { Input, SearchBox } from "@/components/common";
import useDebouncedSearch from "@/hooks/use-debounced-search";
import { saveRecentSearch } from "@/actions/stock";
import { StockDataType } from "@/types";
import SearchIcon from "@/public/icons/search_icon.svg?component";

type TModalInput = {
  setSearchStock: Dispatch<SetStateAction<StockDataType[]>>;
};
const ModalInput = ({ setSearchStock }: TModalInput) => {
  const t = useTranslations("myStock");

  const { inputValue, debouncedValue, setInputValue } = useDebouncedSearch();
  const [isVisibleSearchBox, setIsVisibleSearchBox] = useState(false);

  const handleSearch = async (search: string) => {
    setIsVisibleSearchBox(false);
    if (search.trim() !== "") {
      const response = await saveRecentSearch({ stockName: search });
      if (response.ok) setSearchStock(response.data);
    } else {
      setSearchStock([]);
    }
  };

  return (
    <div className="relative">
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
  );
};

export default ModalInput;

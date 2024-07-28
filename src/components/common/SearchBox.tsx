"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { filterStocks } from "@/utils/filter-stock";
import { STOCK_NAMES, TReutersCodes } from "@/constants/stockCodes";

const REUTERS_CODE_TO_VARIOUS_STOCK = {
  "AAPL.O": "애플",
  "MSFT.O": "마이크로소프트",
  "GOOGL.O": "알파벳 Class A",
  "AMZN.O": "아마존닷컴",
  "TSLA.O": "테슬라",
  U: "유니티소프트웨어",
};

type TSearchBox = {
  inputValue: string;
  onSelect?: (search: string) => void;
};

const SearchBox = ({ inputValue, onSelect }: TSearchBox) => {
  const t = useTranslations("searchBox");

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, [inputValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (code: TReutersCodes) => {
    const stockName = {
      "AAPL.O": "애플",
      "MSFT.O": "마이크로소프트",
      "GOOGL.O": "구글",
      "AMZN.O": "아마존",
      "TSLA.O": "테슬라",
      U: "유니티",
    };

    onSelect && onSelect(stockName[code]);
  };

  const filteredStocks = filterStocks(inputValue);

  return (
    isVisible && (
      <div
        className="absolute z-10 mt-[.8rem] h-auto w-full rounded-[.8rem] border border-grayscale-300 bg-white px-[1.2rem] py-[1.5rem] [box-shadow:rgba(0,_27,_55,_0.1)_0px_2px_30px_0px]"
        ref={ref}
      >
        {Object.keys(filteredStocks).length > 0 ? (
          <ul className="flex flex-col items-start">
            {Object.entries(filteredStocks).map(([name, code]) => (
              <li
                className="flex w-full cursor-pointer items-center gap-[1.6rem] rounded-[.8rem] p-[.8rem] transition duration-200 ease-in-out hover:bg-grayscale-100"
                key={code}
                onClick={() => handleSelect(code)}
              >
                <div className="h-[3rem] w-[3rem]">
                  <Image src={`/icons/stocks/${STOCK_NAMES[code]}.svg`} alt="icon" width={30} height={30} />
                </div>
                <div>
                  <h3 className="body_6 font-bold">{REUTERS_CODE_TO_VARIOUS_STOCK[code]}</h3>
                  <h3 className="text-[1.1rem]">{code}</h3>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col gap-[1rem] text-navy-700">
            <h3 className="body_3 flex gap-[.8rem] font-bold">
              &quot;<span className="block max-w-[35rem] truncate">{inputValue}</span>&quot; {t("noneStock")}
            </h3>
            <p className="body_5">{t("informText")}</p>
          </div>
        )}
      </div>
    )
  );
};

export default SearchBox;

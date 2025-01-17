"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Input, SearchBox } from "@/components/common";
import useDebouncedSearch from "@/hooks/use-debounced-search";
import SearchIcon from "@/public/icons/search_icon.svg?component";

const DiscoveryInput = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const { inputValue, debouncedValue, setInputValue } = useDebouncedSearch(searchParams.get("search") || "");

  const moveLink = (search: string) => {
    setIsVisible(false);
    const moveUrl = search.trim() !== "" ? `/discovery/${search}` : "/discovery";
    router.push(moveUrl);
  };

  return (
    <section className="relative w-full">
      <form
        className="relative h-[5.6rem] w-full"
        onSubmit={(e) => {
          e.preventDefault();
          moveLink(inputValue);
        }}
      >
        <SearchIcon
          className="absolute left-[1.6rem] top-[1.6rem] z-10 cursor-pointer"
          onClick={() => moveLink(inputValue)}
        />
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsVisible(true); // 입력 값이 변경될 때마다 검색 박스를 표시
          }}
          inputGroupClass="w-full h-[5.6rem]"
          inputClass="text-navy-900 h-[5.6rem] pl-[4.4rem] rounded-[0.8rem]"
          placeholder={t("discovery.inputPlaceholder")}
        />
      </form>
      {isVisible && debouncedValue && <SearchBox inputValue={debouncedValue} onSelect={moveLink} />}
    </section>
  );
};

export default DiscoveryInput;

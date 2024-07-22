"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input, SearchBox } from "@/components/common";
import { saveRecentSearch } from "@/actions/stock";
import useDebouncedSearch from "@/hooks/use-debounced-search";
import SearchIcon from "@/public/icons/search_icon.svg?component";

const DiscoveryInput = () => {
  const searchParams = useSearchParams();
  const initialSearchQuery = searchParams.get("search") || "";
  const { inputValue, debouncedValue, setInputValue } = useDebouncedSearch(initialSearchQuery);
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  const moveLink = async (search: string) => {
    setIsVisible(false);
    const params = new URLSearchParams(searchParams.toString());

    if (search.trim() !== "") {
      const response = await saveRecentSearch({ stockName: search });
      if (response.ok) params.set("search", search);
    } else {
      params.delete("search");
    }

    const newPath = `${pathname}?${params.toString()}`;
    router.replace(newPath);
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
          placeholder="종목을 검색해주세요"
        />
      </form>
      {isVisible && debouncedValue && <SearchBox inputValue={debouncedValue} onSelect={moveLink} />}
    </section>
  );
};

export default DiscoveryInput;

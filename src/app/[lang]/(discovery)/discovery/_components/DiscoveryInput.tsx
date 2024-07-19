"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { Input } from "@/components/common";
import { saveRecentSearch } from "@/actions/stock";
import SearchIcon from "@/public/icons/search_icon.svg?component";

const DiscoveryInput = ({ params }: { params: string }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const moveLink = async () => {
    const params = new URLSearchParams(searchParams.toString());
    if (inputRef.current?.value.trim() === "") {
      params.delete("search");
    } else {
      try {
        const response = await saveRecentSearch({ stockName: inputRef.current?.value as string });
        if (response.ok) params.set("search", inputRef.current?.value || "");
      } catch (error) {
        console.error("Failed to fetch stock data:", error);
      }
    }

    const newPath = `${pathname}?${params.toString()}`;
    router.push(newPath);
  };

  return (
    <form
      className="relative h-[5.6rem] w-full"
      onSubmit={(e) => {
        e.preventDefault();
        moveLink();
      }}
    >
      <SearchIcon className="absolute left-[1.6rem] top-[1.6rem] z-10 cursor-pointer" onClick={moveLink} />
      <Input
        ref={inputRef}
        type="text"
        defaultValue={params}
        inputGroupClass="w-full h-[5.6rem]"
        inputClass="text-navy-900 h-[5.6rem] pl-[4.4rem] rounded-[0.8rem]"
        placeholder="종목을 검색해주세요"
      />
    </form>
  );
};

export default DiscoveryInput;

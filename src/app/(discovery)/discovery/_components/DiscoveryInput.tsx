"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/common";
import SearchIcon from "@/public/icons/search_icon.svg?component";

const DiscoveryInput = ({ param }: { param: string }) => {
  const router = useRouter();
  const [value, setValue] = useState(param || "");

  const moveLink = () => {
    if (value === "") {
      router.push(`/discovery`);
      setValue("");
    } else {
      router.push(`/discovery?search=${value}`);
      setValue(value);
    }
  };

  return (
    <section className="relative h-[5.6rem] w-full">
      <SearchIcon className="absolute left-[1.6rem] top-[1.6rem] z-10 cursor-pointer" onClick={moveLink} />
      <Input
        type="text"
        value={value}
        inputGroupClass="w-full h-[5.6rem]"
        inputClass="text-navy-900 h-[5.6rem] pl-[4.4rem] rounded-[0.8rem]"
        placeholder="종목을 검색해주세요"
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && moveLink()}
      />
    </section>
  );
};

export default DiscoveryInput;

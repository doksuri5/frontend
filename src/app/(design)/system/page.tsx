"use client";

import { useState } from "react";

import Dropdown from "@/components/common/Dropdown";

const options = [
  { value: "1", text: "사유1" },
  { value: "2", text: "사유2" },
  { value: "3", text: "사유3" },
  { value: "4", text: "사유4" },
];

export default function Page() {
  const [selected, setSelected] = useState({ value: "", text: "" });
  return (
    <div className="p-10">
      <h1 className="heading_3 mb-10 font-bold">Dropdown Component</h1>
      <div>
        <Dropdown
          className={"w-[38.6rem]"}
          label="회원탈퇴 사유"
          placeholder="탈퇴사유를 선택해주세요."
          name="select"
          options={options}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
}

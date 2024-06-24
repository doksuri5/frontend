"use client";

import { useState } from "react";

import { CheckBox, Dropdown, Toggle } from "@/components/common";

const options = [
  { value: "1", text: "사유1" },
  { value: "2", text: "사유2" },
  { value: "3", text: "사유3" },
  { value: "4", text: "사유4" },
];

export default function Page() {
  const [selected, setSelected] = useState({ value: "", text: "" });
  const [toggle, setToggle] = useState(false);
  const [checked, setChecked] = useState(false);
  return (
    <div className="p-10">
      <h1 className="heading_3 mb-10 font-bold">Dropdown Component</h1>
      <Dropdown
        className={"w-[38.6rem]"}
        label="회원탈퇴 사유"
        placeholder="탈퇴사유를 선택해주세요."
        name="select"
        options={options}
        selected={selected}
        setSelected={setSelected}
      />
      <h1 className="heading_3 mb-10 mt-10 font-bold">Toggle Component</h1>
      <Toggle checked={toggle} setChecked={setToggle} />
      <h1 className="heading_3 mb-10 mt-10 font-bold">CheckboxComponent</h1>
      <CheckBox checked={checked} setChecked={setChecked} />
    </div>
  );
}

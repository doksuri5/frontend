/**
 * props 정의
 * label?: checkbox text를 의미 → 옵셔널
 * checked → default : false
 * setChecked → checked 변경 함수
 */

import { Checkbox, Field, Label } from "@headlessui/react";

import Image from "next/image";

import { cn } from "@/utils/cn";

type TCheckProps = {
  label?: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
};

export default function CheckBox({ label, checked, setChecked }: TCheckProps) {
  return (
    <Field>
      <Checkbox checked={checked} onChange={setChecked} className="flex_row">
        <Image
          src={checked ? "/icons/checkbox_select.svg" : "/icons/checkbox_default.svg"}
          alt={"체크박스 아이콘"}
          width={24}
          height={24}
          className="overflow:hidden"
        />
        {label && <Label className={cn("body_5 ml-[0.4rem] text-grayscale-900")}>{label}</Label>}
      </Checkbox>
    </Field>
  );
}

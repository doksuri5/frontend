/**
 * props 정의
 * label?: checkbox text를 의미 → 옵셔널
 * checked → default : false
 * setChecked → checked 변경 함수
 */

import { InputHTMLAttributes } from "react";

import { Checkbox } from "@headlessui/react";

import Image from "next/image";

import { cn } from "@/utils/cn";

type TCheckProps = {
  variants?: string;
  label?: string;
  className?: string;
  labelClass?: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export default function CheckBox({
  variants = "default",
  label,
  checked,
  setChecked,
  className,
  labelClass,
  ...props
}: TCheckProps) {
  return (
    <Checkbox checked={checked} onChange={setChecked} className={cn("flex_row", className)}>
      {variants === "radio" && (
        <label className={cn("body_3 text-grayscale-900", labelClass)} htmlFor={props.id}>
          {label}
        </label>
      )}
      <Image
        src={checked ? `/icons/checkbox_${variants}_on.svg` : `/icons/checkbox_${variants}.svg`}
        alt={"체크박스 아이콘"}
        width={24}
        height={24}
      />
      <input type="checkbox" id={props.id} checked={checked} className="hidden" readOnly {...props} />
      {variants === "default" && (
        <label className={cn("body_5 ml-[0.4rem] text-grayscale-900")} htmlFor={props.id}>
          {label}
        </label>
      )}
    </Checkbox>
  );
}

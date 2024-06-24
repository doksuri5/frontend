/**
 * placeholder → default : `선택해주세요` 문구
 * options: Dropdown options 배열을 의미  → default : [ { value, text } ] 구성된 배열
 * selected : Dropdown 선택한  option을 의미 → default : {value,text}
 * setSelected : Dropdown option 변경 함수 onChange 적용되는 함수
 * name? : form 태그 사용시  →  default : 빈문자열 / 옵셔널
 * label? : Dropdown Title을 의미 → default : 빈문자열 / 옵셔널
 * className? : style 적용 → default : 기본 width 100% / 옵셔널
 */

import { Fragment } from "react";
import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";

import Image from "next/image";
import ArrowIcon from "@/app/svg/arrow_icon.svg";

import { cn } from "@/utils/cn";

type TOption = {
  value: string;
  text: string;
};

type TSelectProps<T> = {
  name?: string;
  label?: string;
  className?: string;
  placeholder: string;
  options: T[];
  selected: T;
  setSelected: (T: T) => void;
};

export default function Dropdown({
  className,
  options,
  placeholder = "선택해주세요.",
  name = "",
  label = "",
  selected,
  setSelected,
}: TSelectProps<TOption>) {
  return (
    <Field className={cn(`w-full ${className ?? ""}`)}>
      <Label className={cn("body_4 mb-[.4rem] font-medium text-navy-900")}>{label}</Label>
      <Listbox name={name} value={selected} onChange={setSelected}>
        {({ open }) => (
          <div className="relative">
            <ListboxButton
              className={cn(
                "border-grayscale-3 relative h-[5.6rem] w-full cursor-pointer rounded-[0.8rem] border bg-white p-[1.6rem] text-left",
              )}
            >
              <input
                className={cn(
                  "body_4 block w-full cursor-pointer truncate text-grayscale-900 outline-none placeholder:text-grayscale-400",
                )}
                value={selected.text}
                placeholder={placeholder}
                readOnly
                name={name}
              />
              <span className={cn("flex_row_center pointer-events-none absolute inset-y-0 right-[1.6rem] w-[5.4rem]")}>
                <Image
                  src={ArrowIcon}
                  alt={"화살표아이콘"}
                  className={cn(
                    `transform transition-transform duration-200 ${open ? "rotate-[-90deg]" : "rotate-90"}`,
                  )}
                />
              </span>
            </ListboxButton>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions
                className={cn(
                  "border-grayscale-3 absolute z-[10] mt-[0.4rem] max-h-[28rem] w-full overflow-auto rounded-[0.8rem] border bg-white",
                )}
              >
                {options.map((option) => (
                  <ListboxOption
                    key={`select-${option.text}`}
                    className={cn(
                      "flex_row body_4 relative h-[5.6rem] cursor-pointer select-none p-[1.6rem] data-[focus]:bg-grayscale-100",
                    )}
                    value={option}
                  >
                    {option.text}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        )}
      </Listbox>
    </Field>
  );
}

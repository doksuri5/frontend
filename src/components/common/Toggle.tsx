/**
 * props 정의
 * checked → default : false(원)
 * setChecked → checked boolean 토글 함수
 */

import { Switch } from "@headlessui/react";

import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";

const cssConfig = {
  switch: `flex_row_center relative h-[4rem] w-[7.6rem] rounded-[0.4rem] bg-grayscale-200 p-[0.4rem] focus:outline-none after:transform after:transition-transform after:duration-200 after:ease-in-out 
  after:content-['']  after:absolute after:top-1/2  after:right-[0.4rem] after:translate-y-[-50%] after:bg-white after:w-[3.2rem] after:h-[3.2rem] after:rounded-[.4rem]`,
  span: `relative flex_row_center body_2 ease-in-out h-[3.2rem] w-[3.2rem]  rounded-[0.4rem] font-medium text-grayscale-400 z-10`,
  spanActive: `font-bold text-grayscale-700`,
};

type TToggleProps = {
  checked: boolean;
  setChecked: (checked: boolean) => void;
};

export default function Toggle({ checked, setChecked }: TToggleProps) {
  const t = useTranslations();
  return (
    <Switch
      checked={checked}
      onChange={setChecked}
      className={cn(cssConfig.switch, {
        "after:translate-x-[-3.4rem]": checked,
        "after:translate-x-[0]": !checked,
      })}
    >
      <span aria-hidden="true" className={cn(cssConfig.span, { [cssConfig.spanActive]: checked })}>
        $
      </span>
      <span aria-hidden="true" className={cn(cssConfig.span, { [cssConfig.spanActive]: !checked })}>
        {t("currency.sign", { defaultValue: "￦" })}
      </span>
    </Switch>
  );
}

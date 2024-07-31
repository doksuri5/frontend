import { useTranslations } from "next-intl";

import { ButtonSpinner } from "@/components/common";

export default function CommonLoadingBtn() {
  const t = useTranslations("auth");
  return (
    <>
      <ButtonSpinner />
      {t("commonBtn.pleaseWait", { defaultMessage: "잠시만 기다려주세요." })}
    </>
  );
}

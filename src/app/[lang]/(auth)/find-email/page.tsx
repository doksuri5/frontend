import { useTranslations } from "next-intl";

import { CommonTitle } from "../_components";
import CommonLayout from "../_components/CommonLayout";
import FindEmailForm from "../_components/FindEmailForm";

export default function FindIdPage() {
  const t = useTranslations("auth");
  return (
    <>
      <CommonLayout>
        <CommonTitle title={t("title.findPassword", { defaultMessage: "이메일 찾기" })} />
        <FindEmailForm />
      </CommonLayout>
    </>
  );
}

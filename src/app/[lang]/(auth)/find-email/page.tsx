import { useTranslations } from "next-intl";

import CommonLayout from "../_components/CommonLayout";
import FindEmailForm from "../_components/FindEmailForm";

export default function FindIdPage() {
  const t = useTranslations("auth");
  return (
    <>
      <CommonLayout title={t("title.findPassword", { defaultMessage: "이메일 찾기" })}>
        <FindEmailForm />
      </CommonLayout>
    </>
  );
}

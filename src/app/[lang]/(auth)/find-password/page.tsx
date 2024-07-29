import { useTranslations } from "next-intl";

import { CommonTitle } from "../_components";
import CommonLayout from "../_components/CommonLayout";
import FindPasswordForm from "../_components/FindPasswordForm";

export default function FindPasswordPage() {
  const t = useTranslations("auth");
  return (
    <>
      <CommonLayout>
        <CommonTitle title={t("title.findPassword", { defaultMessage: "비밀번호 찾기" })} />
        <FindPasswordForm />
      </CommonLayout>
    </>
  );
}

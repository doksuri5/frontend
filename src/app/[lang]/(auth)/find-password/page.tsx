import { useTranslations } from "next-intl";

import { CommonTitle } from "../_components";
import CommonLayout from "../_components/CommonLayout";
import FindPasswordForm from "../_components/FindPasswordForm";
import { unstable_setRequestLocale } from "next-intl/server";

export default function FindPasswordPage({ params }: { params: { lang: string } }) {
  unstable_setRequestLocale(params.lang);
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

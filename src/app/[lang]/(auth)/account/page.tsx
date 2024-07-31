import { useTranslations } from "next-intl";
import AgreeForm from "../_components/AgreeForm";
import CommonLayout from "../_components/CommonLayout";
import { CommonTitle } from "../_components";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Account({ params }: { params: { lang: string } }) {
  unstable_setRequestLocale(params.lang);

  const t = useTranslations("auth");
  return (
    <>
      <CommonLayout>
        <CommonTitle title={t("title.termsAgreement", { defaultMessage: "약관동의" })} />
        <AgreeForm />
      </CommonLayout>
    </>
  );
}

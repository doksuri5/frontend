import { useTranslations } from "next-intl";
import AgreeForm from "../_components/AgreeForm";
import CommonLayout from "../_components/CommonLayout";
import { CommonTitle } from "../_components";

export default function Account() {
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

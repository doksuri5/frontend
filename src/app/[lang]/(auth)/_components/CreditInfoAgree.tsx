import { useTranslations } from "next-intl";
import CommonAgreeLayout from "./CommonAgreeLayout";

export default function CreditInfoAgree() {
  const t = useTranslations("investPropensity.agree");

  return (
    <CommonAgreeLayout title={t('title')} height="h-80">
      {t('introduction')}
      <br />
      <br />
      <strong>{t('sectionTitles.infoCollectionUse')}</strong>
      <table border={1} cellPadding="10" cellSpacing="0" className="border-[1px] border-solid border-slate-300">
        <tbody>
          <tr>
            <td className="w-48 border-[1px] border-solid border-slate-300 p-2">
              <strong>{t('td.collectionPurpose')}</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              {t('infoCollectionUse.purpose')}
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>{t('td.items')}</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              {t("infoCollectionUse.items")}
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>{t('td.retentionPeriod')}</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              {t("infoCollectionUse.retentionPeriod")}
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <strong>{t('sectionTitles.infoInquiry')}</strong>
      <br />
      <span>
        {t("infoInquiryDetails.consentStatement")}
      </span>
      <table border={1} cellPadding="10" cellSpacing="0" className="border-[1px] border-solid border-slate-300">
        <tbody>
          <tr>
            <td colSpan={2} className="border-[1px] border-solid border-slate-300 p-2">
              {t("infoInquiryDetails.agree")}
            </td>
          </tr>
          <tr>
            <td className="w-48 border-[1px] border-solid border-slate-300 p-2">
              <strong>{t('td.inquiryAgency')}</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              {t("infoInquiryDetails.agency")}
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>{t('td.inquiryPurpose')}</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              {t("infoInquiryDetails.purpose")}
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>{t('td.inquiryContent')}</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              {t("infoInquiryDetails.content")}
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>{t('td.validityPeriod')}</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              {t("infoInquiryDetails.validityPeriod")}
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <strong>{t('sectionTitles.uniqueIdHandling')}</strong>
      <table border={1} cellPadding="10" cellSpacing="0" className="border-[1px] border-solid border-slate-300">
        <tbody>
          <tr>
            <td colSpan={2} className="border-[1px] border-solid border-slate-300 p-2">
              {t("sectionTitles.agree")}
            </td>
          </tr>
          <tr>
            <td className="w-48 border-[1px] border-solid border-slate-300 p-2">
              <strong>{t('td.processingPurpose')}</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              {t("uniqueIdHandlingDetails.purpose")}
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>{t('td.processingItems')}</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              {t("uniqueIdHandlingDetails.items")}
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>{t('td.note')}</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              {t("uniqueIdHandlingDetails.remark")}
            </td>
          </tr>
        </tbody>
      </table>
      {t("additionalInfo.understanding")}
      <br />
      {t("additionalInfo.refusalConsequences")}
      <br />
      <br />
      <strong>
        {t("additionalInfo.privacyPolicy")}
      </strong>
      <br />
      {t("additionalInfo.minorPolicy")}
      <br />
      {t("additionalInfo.agentPolicy")}
      <br />
      {t("additionalInfo.terminationDate")}
      <br />
      {t("additionalInfo.accountDeletion")}
    </CommonAgreeLayout>
  );
}

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
              <strong>수집·이용 목적</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              {t('infoCollectionUse.purpose')}
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>항목</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              {t("infoCollectionUse.items")}
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>보유 및 이용기간</strong>
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
        ※ 당사가 신용정보집중기관 또는 신용조회회사를 통하여 귀하의 개인신용정보를 조회한 기록은 타 금융기관 등에 제공될
        수 있으며, 귀하의 신용등급이 하락할 수 있음을 알려드립니다.
      </span>
      <table border={1} cellPadding="10" cellSpacing="0" className="border-[1px] border-solid border-slate-300">
        <tbody>
          <tr>
            <td colSpan={2} className="border-[1px] border-solid border-slate-300 p-2">
              본인은 다음과 같이 본인의 신용정보를 조회하는 것에 동의합니다.
            </td>
          </tr>
          <tr>
            <td className="w-48 border-[1px] border-solid border-slate-300 p-2">
              <strong>조회기관</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              {t("infoInquiryDetails.agency")}
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>조회목적</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              {t("infoInquiryDetails.purpose")}
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>조회내용</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              {t("infoInquiryDetails.content")}
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>유효기간</strong>
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
              본인은 귀사가 본인의 고유식별정보를 다음과 같이 처리하는 것에 동의합니다.
            </td>
          </tr>
          <tr>
            <td className="w-48 border-[1px] border-solid border-slate-300 p-2">
              <strong>처리목적</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              {t("uniqueIdHandlingDetails.purpose")}
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>처리항목</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              {t("uniqueIdHandlingDetails.items")}
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>비고</strong>
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

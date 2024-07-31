import React from "react";
import { PolicyMain } from "../_components";
import { servicePolicyText } from "@/constants/servicePolicyText";
import { privacyPolicyText } from "@/constants/privacyPolicyText";
import { unstable_setRequestLocale } from "next-intl/server";

const getTerms = async () => {
  try {
    const response = await (await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/terms/getTerms`)).json();

    if (response.ok) {
      return response.data;
    }
  } catch (err) {
    console.error("이용약관을 가져오는 데 실패했습니다.");
    return null;
  }
};

export default async function Terms({ params }: { params: { lang: string } }) {
  unstable_setRequestLocale(params.lang);
  const policyText = await getTerms();
  return (
    <PolicyMain
      serviceText={policyText ? policyText.terms_of_service.content : servicePolicyText}
      privacyText={policyText ? policyText.privacy_policy.content : privacyPolicyText}
    />
  );
}

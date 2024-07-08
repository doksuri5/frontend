"use client";

import React, { useEffect, useState } from "react";
import { PolicyContent } from "../_components/index";
import { formatTextWithLineBreaks } from "@/utils/textUtils";

export default function Terms() {
  const [servicePolicy, setServicePolicy] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);

  const [servicePolicyText, setServicePolicyText] = useState("");
  const [privacyPolicyText, setPrivacyPolicyText] = useState("");

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await (await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/terms/getTerms`)).json();

        if (response.ok) {
          setServicePolicyText(response.data.terms_of_service.content);
          setPrivacyPolicyText(response.data.privacy_policy.content);
          return;
        }
        // TODO: API 호출 실패 시, Alert 처리 (혹은 프론트엔드 약관 파일로 대체)
        console.log("이용약관을 불러오지 못했습니다.", response);
      } catch (err) {
        console.log("이용약관을 불러오지 못했습니다.", err);
      }
    };

    fetchTerms();
  }, []);

  const handleToggleExpand = (id: string) => {
    if (id === "service") {
      setServicePolicy((prev) => !prev);
    } else if (id === "privacy") {
      setPrivacyPolicy((prev) => !prev);
    }
  };

  return (
    <section className="flex w-[100%] flex-col gap-[5.4rem]">
      <PolicyContent
        policyType="service"
        handleToggleExpand={handleToggleExpand}
        policyText={formatTextWithLineBreaks(servicePolicyText)}
        expanded={servicePolicy}
      />
      <PolicyContent
        policyType="privacy"
        handleToggleExpand={handleToggleExpand}
        policyText={formatTextWithLineBreaks(privacyPolicyText)}
        expanded={privacyPolicy}
      />
    </section>
  );
}

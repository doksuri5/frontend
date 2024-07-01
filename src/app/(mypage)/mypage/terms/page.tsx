"use client";

import { useState } from "react";
import { PolicyContent } from "../_components/PolicyContent";
import { servicePolicyText } from "@/constants/servicePolicyText";
import { privacyPolicyText } from "@/constants/privacyPolicyText";

export default function Terms() {
  const [servicePolicy, setServicePolicy] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);

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
        policyText={servicePolicyText}
        expanded={servicePolicy}
      />
      <PolicyContent
        policyType="privacy"
        handleToggleExpand={handleToggleExpand}
        policyText={privacyPolicyText}
        expanded={privacyPolicy}
      />
    </section>
  );
}

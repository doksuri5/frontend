"use client";

import React, { useState } from "react";
import { PolicyContent } from "./index";
import { formatTextWithLineBreaks } from "@/utils/textUtils";

type TPolicyTextProps = {
  serviceText: string;
  privacyText: string;
};

export default function TermsMain({ serviceText, privacyText }: TPolicyTextProps) {
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
        policyText={formatTextWithLineBreaks(serviceText)}
        expanded={servicePolicy}
      />
      <PolicyContent
        policyType="privacy"
        handleToggleExpand={handleToggleExpand}
        policyText={formatTextWithLineBreaks(privacyText)}
        expanded={privacyPolicy}
      />
    </section>
  );
}

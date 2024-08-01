"use client";

import { Button } from "@/components/common";
import CircleSpinner from "@/components/common/CircleSpinner";
import AI_Summary from "@/public/icons/AI_Summary.svg?component";
import { NewsSummarySchema } from "@/types/NewsDataType";
import debounce from "@/utils/debounce";
import { experimental_useObject as useObject } from "ai/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

const AiSummary = ({ content }: { content: string }) => {
  const isDirty = useRef(false);
  const { object, submit, isLoading } = useObject({
    api: "/api/ai/summary",
    schema: NewsSummarySchema,
  });

  const t = useTranslations();

  const handleOnClick = debounce(() => {
    if (isDirty.current) return;
    submit({ content });
    isDirty.current = true;
  }, 200);

  return (
    <>
      <Button
        variant="textButton"
        size="sm"
        bgColor="bg-navy-900"
        className="max-w-[17.6rem]"
        disabled={isLoading}
        onClick={handleOnClick}
      >
        <div className="flex items-center">
          <AI_Summary />
          <div className="body_5 flex gap-[1.5rem] font-semibold">
            <span>{t("news.AISummary", { defaultMessage: "아잇나우 AI요약" })}</span>
            {isLoading && <CircleSpinner style="w-[2rem] h-[2rem] text-white" />}
          </div>
        </div>
      </Button>
      {object?.newsSummary && (
        <section>
          <div className="flex gap-[1.2rem]">
            <AI_Summary />
            <span className="body_4 font-semibold">
              {t("news.AISummaryContent", { defaultMessage: "AI 요약내용" })}
            </span>
          </div>
          <div className="body_4 pt-[2.4rem] font-normal leading-[2.6rem]">{object?.newsSummary}</div>
        </section>
      )}
    </>
  );
};

export default AiSummary;

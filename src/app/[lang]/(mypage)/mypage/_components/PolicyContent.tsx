import { Button } from "@/components/common";
import { cn } from "@/utils/cn";

type TPolicyDivProps = {
  policyType: "service" | "privacy";
  handleToggleExpand: (policyType: "service" | "privacy") => void;
  policyText: JSX.Element[];
  expanded: boolean;
};

export const PolicyContent = ({ policyType, handleToggleExpand, policyText, expanded }: TPolicyDivProps) => {
  return (
    <article className="flex flex-col gap-[1.6rem]">
      <div className="flex flex-row justify-between">
        <h1 className="body_2 font-bold text-gray-900">
          {policyType === "service" ? "서비스 이용약관" : "개인정보 처리방침"}
        </h1>
        <Button
          variant="textButton"
          size="sm"
          bgColor="bg-inherit"
          className="w-[6.4rem] text-blue-600 underline"
          onClick={() => handleToggleExpand(policyType)}
        >
          {expanded ? "접기" : "펼쳐서 보기"}
        </Button>
      </div>
      <div
        className={cn(
          `rounded-[1.6rem] border border-gray-100 px-[1.4rem] py-[2.4rem] scrollbar-hide ${expanded ? "h-[100%]" : "h-[25rem] overflow-hidden overflow-y-scroll"}`,
        )}
      >
        <div className="body_4 text-wrap text-grayscale-900">{policyText}</div>
      </div>
    </article>
  );
};

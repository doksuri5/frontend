import { cn } from "@/utils/cn";

export type TCommonTitleProps = {
  title: string;
  desc?: string;
};

export default function CommonTitle({ title, desc }: TCommonTitleProps) {
  return (
    <>
      <h2
        className={cn(
          `heading_3 mb-[1.6rem] text-center font-bold text-navy-900 ${desc ? "mb-[1.6rem]" : "mb-[4rem]"}`,
        )}
      >
        {title}
      </h2>
      {desc && <p className={cn("body_5 mb-[1.6rem] text-center font-medium text-grayscale-900")}>{desc}</p>}
    </>
  );
}

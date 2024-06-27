import CommonTitle, { TCommonTitleProps } from "./CommonTitle";

import { cn } from "@/utils/cn";

type TCommonLayout = TCommonTitleProps & {
  childrenClass?: string;
  children: React.ReactNode;
};

export default function CommonLayout({ title, desc, childrenClass, children }: TCommonLayout) {
  return (
    <>
      <article className="flex_col_center pb-[10rem] pt-[10rem]">
        <section className={cn("min-w-[59rem] rounded-[3.2rem] bg-grayscale-0 px-[10.2rem] py-[8rem]")}>
          <CommonTitle title={title} desc={desc} />
          <div className={cn("w-[38.6rem]", childrenClass)}>{children}</div>
        </section>
      </article>
    </>
  );
}

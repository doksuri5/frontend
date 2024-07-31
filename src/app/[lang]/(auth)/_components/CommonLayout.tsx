import { cn } from "@/utils/cn";

type TCommonLayout = {
  childrenClass?: string;
  children: React.ReactNode;
};

export default function CommonLayout({ childrenClass, children }: TCommonLayout) {
  return (
    <>
      <article className="flex_col_center min-h-[calc(100vh-8rem)] pb-[10rem] pt-[10rem]">
        <section className={cn("min-w-[59rem] rounded-[3.2rem] bg-grayscale-0 px-[10.2rem] py-[8rem]")}>
          <div className={cn("w-[38.6rem]", childrenClass)}>{children}</div>
        </section>
      </article>
    </>
  );
}

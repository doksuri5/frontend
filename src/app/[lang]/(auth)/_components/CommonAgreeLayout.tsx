import { cn } from "@/utils/cn";

type TCommonAgreeLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function CommonAgreeLayout({ title, children }: TCommonAgreeLayoutProps) {
  return (
    <div>
      <h3 className="body_3 mb-[0.8rem] text-grayscale-900">{title}</h3>
      <div className={cn("mb-[.8rem] box-border w-full rounded-[.8rem] border border-grayscale-300 py-[1.6rem]")}>
        <div className="body_4 scrollbar-thin scrollbar_style h-[16rem] w-full overflow-y-scroll px-[1.6rem]">
          {children}
        </div>
      </div>
    </div>
  );
}
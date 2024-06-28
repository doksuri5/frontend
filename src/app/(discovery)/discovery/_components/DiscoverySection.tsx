import { cn } from "@/utils/cn";

type DiscoverySectionProps = {
  title: string;
  sectionStyle?: string;
  titleStyle?: string;
  subTag?: JSX.Element;
  children: React.ReactNode;
};
const DiscoverySection = ({ title, sectionStyle, titleStyle, subTag, children }: DiscoverySectionProps) => {
  return (
    <section className={cn(`flex w-full flex-col gap-[.8rem] ${sectionStyle}`)}>
      <div className={cn(`flex_row gap-[1.6rem] ${titleStyle}`)}>
        <h1 className="body_1 font-bold text-navy-900">{title}</h1>
        {subTag}
      </div>
      {children}
    </section>
  );
};

export default DiscoverySection;

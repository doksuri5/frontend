import { DiscoveryInput } from "./_components";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <article className="flex_col m-auto max-w-[59rem] gap-[3.2rem] py-[5.6rem]">
      <DiscoveryInput />
      {children}
    </article>
  );
}

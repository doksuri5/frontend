import { Suspense } from "react";
import { DiscoveryInput } from "./_components";
import Loading from "@/app/[lang]/loading";
import { unstable_setRequestLocale } from "next-intl/server";

export default function layout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  unstable_setRequestLocale(params.lang);

  return (
    <Suspense fallback={<Loading />}>
      <article className="flex_col m-auto max-w-[59rem] gap-[3.2rem] py-[5.6rem]">
        <DiscoveryInput />
        {children}
      </article>
    </Suspense>
  );
}

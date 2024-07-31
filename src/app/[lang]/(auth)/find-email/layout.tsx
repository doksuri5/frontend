import { commonAuthMetadata } from "@/utils/metadata";
import { unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata() {
  return commonAuthMetadata("findEmail");
}

export default function layout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  unstable_setRequestLocale(params.lang);
  return <>{children}</>;
}

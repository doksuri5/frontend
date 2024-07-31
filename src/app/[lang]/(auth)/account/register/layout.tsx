import { Locale } from "@/i18n";
import { commonAuthMetadata } from "@/utils/metadata";
import { unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata() {
  return commonAuthMetadata("register");
}

export default function layout({ children, params }: { children: React.ReactNode; params: { lang: Locale } }) {
  unstable_setRequestLocale(params.lang);
  return <>{children}</>;
}

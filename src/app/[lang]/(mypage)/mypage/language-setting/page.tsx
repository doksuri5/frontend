import { auth } from "@/auth";
import { LanguageSettingMain } from "../_components";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function LanguageSetting({ params }: { params: { lang: string } }) {
  unstable_setRequestLocale(params.lang);
  const session = await auth();

  return <LanguageSettingMain userLanguage={session?.user.language} />;
}

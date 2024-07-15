import { auth } from "@/auth";
import LanguageSettingMain from "../_components/LanguageSettingMain";

export default async function LanguageSetting() {
  const session = await auth();

  return <LanguageSettingMain userLanguage={session?.user.language} />;
}

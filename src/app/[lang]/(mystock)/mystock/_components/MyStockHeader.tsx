import { getTranslations } from "next-intl/server";
import { MyStockHeaderButton } from "@/app/[lang]/(mystock)/mystock/_components";

const MyStockHeader = async ({ userName }: { userName: string }) => {
  const t = await getTranslations("myStock");
  const translationTitle = t("userTitle").includes("Les favoris")
    ? `${t("userTitle")} ${userName}`
    : `${userName}${t("userTitle")}`;

  return (
    <div className="flex_row justify-between pt-[5.6rem]">
      <h1 className="heading_4 font-bold text-navy-900">{translationTitle}</h1>
      <MyStockHeaderButton />
    </div>
  );
};

export default MyStockHeader;

"use client";

import { useEffect, useState } from "react";
import { Alert, Button } from "@/components/common";
import { cn } from "@/utils/cn";
import Korea from "@/public/icons/language_kr.svg?component";
import USA from "@/public/icons/language_en.svg?component";
import China from "@/public/icons/language_cn.svg?component";
import Japan from "@/public/icons/language_jp.svg?component";
import French from "@/public/icons/language_fr.svg?component";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { languageSetting } from "../_api/languageApi";
import useAlert from "@/hooks/use-alert";
import { useTranslations } from "next-intl";
import { setLanguageCookie } from "@/utils/cookies";

interface ILanguageInform {
  icon: JSX.Element;
  label: string;
  active: boolean;
  value: string;
}

export default function LanguageSettingMain({ userLanguage }: { userLanguage: string | undefined }) {
  const t = useTranslations();
  const popupT = useTranslations("user.popup")
  const langT = useTranslations("lang");

  const languageList = [
    { icon: <Korea />, label: langT("korean", { defaultMessage: "한국어" }), active: false, value: "ko" },
    { icon: <USA />, label: langT("english", { defaultMessage: "영어" }), active: false, value: "en" },
    { icon: <China />, label: langT("chinese", { defaultMessage: "중국어" }), active: false, value: "ch" },
    { icon: <Japan />, label: langT("japanese", { defaultMessage: "일본어" }), active: false, value: "jp" },
    { icon: <French />, label: langT("french", { defaultMessage: "프랑스어" }), active: false, value: "fr" },
  ];

  const { update } = useSession();
  const { alertInfo, customAlert } = useAlert();

  const pathname = usePathname();
  const router = useRouter();

  const [selectedLang, setSelectedLang] = useState("");
  const [langList, setLangList] = useState<ILanguageInform[]>(languageList);
  const [pendingLang, setPendingLang] = useState<string | null>(null);

  const [openConfirmAlert, setOpenConfirmAlert] = useState(false);

  useEffect(() => {
    userLanguage ? setSelectedLang(userLanguage) : setSelectedLang("ko");
  }, [userLanguage]);

  const changeURL = (lang: string) => {
    const currentLocale = pathname.split("/")[1];
    const basePath = pathname.replace(`/${currentLocale}`, "");
    const newPathname = `/${lang}${basePath}`;
    history.pushState(null, "", newPathname);
  };

  const settingLanguage = async (lang: string) => {
    try {
      const response = await languageSetting(lang);

      if (!response.ok) {
        customAlert({
          title: popupT("languageChangeFail", { defaultMessage: "언어 변경에 실패했습니다." }),
          subText: popupT("retryLater", { defaultMessage: "잠시 후 다시 시도해 주세요." }),
          onClose: () => { },
        });
        return;
      }

      // 성공 후처리
      const userLanguage = response.data.language;

      await update({ language: userLanguage });
      setLanguageCookie(userLanguage);
      setSelectedLang(userLanguage);

      // 각 언어의 active 상태 업데이트
      const updatedLangList = langList.map((langItem: ILanguageInform) => ({
        ...langItem,
        active: langItem.value === userLanguage,
      }));
      setLangList(updatedLangList);

      customAlert({
        title: popupT("languageChanged", { defaultMessage: "언어가 변경되었습니다." }),
        subText: "",
        onClose: () => {
          router.refresh();
        },
      });

      // 언어 설정 후 페이지 링크 변경
      changeURL(lang);
    } catch (err) {
      customAlert({
        title: popupT("languageSettingError", { defaultMessage: "언어 설정 도중 오류가 발생했습니다." }),
        subText: err instanceof Error ? err.message : popupT("unknownIssue", { defaultMessage: "알 수 없는 오류가 발생했습니다." }),
        onClose: () => { },
      });
    }
  };

  const handleSelectLang = (val: string) => {
    if (val === selectedLang) return;
    setPendingLang(val);
    setOpenConfirmAlert(true);
  };

  const handleConfirmChange = async () => {
    if (pendingLang) {
      await settingLanguage(pendingLang);
    }
    setOpenConfirmAlert(false);
    setPendingLang(null);
  };

  const handleCancelChange = () => {
    setOpenConfirmAlert(false);
    setPendingLang(null);
  };

  return (
    <>
      <section className="flex w-[100%] flex-col gap-[2.4rem]">
        <div className="flex flex-col gap-[.8rem]">
          <div className="body_2 font-bold text-gray-900">
            {t("mypage.languageSettings", { defaultMessage: "언어 설정" })}
          </div>
          <div>
            {t("mypage.selectTranslationLang", {
              defaultMessage:
                "이 설정에서 번역할 언어를 선택하시면 뉴스 및 리포트에서 설정하신 언어로 번역한 정보를 확인할 수 있습니다.",
            })}
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-[1rem]">
          {langList.map((it) => (
            <div key={it.value}>
              <Button
                variant="langButton"
                className="w-[19.8rem] duration-300 ease-in-out"
                active={it.value === selectedLang}
                onClick={() => handleSelectLang(it.value)}
              >
                <div>
                  {it.icon}
                  <div
                    className={cn(`body_3 font-bold ${it.value === selectedLang ? "text-blue-600" : "text-gray-300"} `)}
                  >
                    {it.label}
                  </div>
                </div>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Alert */}
      {openConfirmAlert && (
        <Alert
          variant="fnButton"
          title={popupT("confirmLangChange", { defaultMessage: "언어 설정을 변경하시겠습니까?" })}
          buttonText={popupT("change", { defaultMessage: "변경" })}
          subButtonText={popupT("cancel", { defaultMessage: "취소" })}
          onClick={handleConfirmChange}
          onClose={handleCancelChange}
        />
      )}
      {alertInfo.open && (
        <Alert
          variant="checkCustomCloseButton"
          title={alertInfo.title}
          subText={alertInfo.subText}
          buttonText={alertInfo.buttonText}
          onClose={alertInfo.onClose}
        />
      )}
    </>
  );
}

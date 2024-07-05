"use client";

import { useState } from "react";
import { Alert, Button } from "@/components/common";
import { cn } from "@/utils/cn";
import Korea from "@/public/icons/language_kr.svg?component";
import USA from "@/public/icons/language_en.svg?component";
import China from "@/public/icons/language_cn.svg?component";
import Japan from "@/public/icons/language_jp.svg?component";
import French from "@/public/icons/language_fr.svg?component";
import Loading from "@/app/[lang]/loading";

interface ILanguageInform {
  icon: JSX.Element;
  label: string;
  active: boolean;
  value: string;
}

const languageList = [
  { icon: <Korea />, label: "한국어", active: true, value: "ko" },
  { icon: <USA />, label: "영어", active: false, value: "en" },
  { icon: <China />, label: "중국어", active: false, value: "ch" },
  { icon: <Japan />, label: "일본어", active: false, value: "jp" },
  { icon: <French />, label: "프랑스어", active: false, value: "fr" },
];

export default function LanguageSetting() {
  //사용자 설정 언어(확정)
  const [selectedLang, setSelectedLang] = useState<string>(languageList[0].value);
  const [langList, setLangList] = useState<ILanguageInform[]>(languageList);

  const [openConfirmAlert, setOpenConfirmAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  //사용자가 선택한 언어(임시, API 전송이 성공해야 설정 언어가 확정됨)
  const [pendingLang, setPendingLang] = useState<string | null>(null);

  const settingLanguage = async (lang: string) => {
    try {
      const response = await fetch("http://localhost:8080/api/user/language", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language: lang }),
      });

      console.log(response);
      if (!response.ok) {
        setOpenErrorAlert(true);
        return;
      }

      const result = await response.json();
      console.log(result);

      setOpenSuccessAlert(true);
      setSelectedLang(lang);

      // 각 언어의 active 상태 업데이트
      const updatedLangList = langList.map((langItem: ILanguageInform) => ({
        ...langItem,
        active: langItem.value === lang,
      }));
      setLangList(updatedLangList);
    } catch (err) {
      setOpenErrorAlert(true);
      console.log(openErrorAlert);
    }
  };

  const handleSelectLang = (val: string) => {
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
    <section className="flex w-[100%] flex-col gap-[2.4rem]">
      <div className="flex flex-col gap-[.8rem]">
        <div className="body_2 font-bold text-gray-900">언어 설정</div>
        <div>
          이 설정에서 번역할 언어를 선택하시면 뉴스 및 리포트에서 설정하신 언어로 번역한 정보를 확인할 수 있습니다.
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-[1rem]">
        {langList.map((it) => (
          <div key={it.value}>
            <Button
              variant="langButton"
              className="w-[19.8rem]"
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

      {openConfirmAlert && (
        <Alert
          variant="fnButton"
          title="언어 설정을 변경하시겠습니까?"
          buttonText="변경"
          subButtonText="취소"
          onClick={handleConfirmChange}
          onClose={handleCancelChange}
        />
      )}
      {openSuccessAlert && (
        <Alert
          variant="checkCustomCloseButton"
          title="언어가 변경되었습니다."
          buttonText="닫기"
          onClose={() => setOpenSuccessAlert(false)}
        />
      )}
      {openErrorAlert && (
        <Alert
          variant="checkCustomCloseButton"
          title="언어 변경에 실패했습니다."
          buttonText="닫기"
          onClose={() => setOpenErrorAlert(false)}
        />
      )}
    </section>
  );
}

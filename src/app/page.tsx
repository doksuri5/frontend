"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";
import EyeShowIcon from "@/app/svg/eyeShow_icon.svg";
import RefreshIcon from "@/app/svg/refresh_icon.svg";
import FabIcon from "@/app/svg/fab_icon.svg";
import LangCn from "@/app/svg/language_cn.svg";
import LangEn from "@/app/svg/language_en.svg";
import LangFr from "@/app/svg/language_fr.svg";
import LangJp from "@/app/svg/language_jp.svg";
import LangKr from "@/app/svg/language_kr.svg";

export default function Home() {
  const [langs, setLangs] = useState([
    { index: 1, comp: <LangKr />, active: true, text: "한국어" },
    { index: 2, comp: <LangCn />, active: false, text: "중국어" },
    { index: 3, comp: <LangEn />, active: false, text: "영어" },
    { index: 4, comp: <LangFr />, active: false, text: "프랑스어" },
    { index: 5, comp: <LangJp />, active: false, text: "일본어" },
  ]);

  const handleLangClick = (text: string) => {
    setLangs(
      langs.map((lang) => ({
        ...lang,
        active: lang.text === text,
      })),
    );
  };

  return (
    <>
      <div className="m-5">
        <div className="m-5 flex flex-wrap items-center gap-5">
          {/* 큰 높이 텍스트 버튼 리스트 */}
          <div className="m-5 flex flex-col items-center gap-5">
            <Button variant="textButton" size="lg" bgColor="bg-navy-900" className="w-[38.6rem]">
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>

            <Button
              variant="textButton"
              size="lg"
              disabled
              hover={false}
              bgColor="bg-grayscale-200"
              className="w-[38.6rem]"
            >
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>

            <Button variant="textButton" size="lg" bgColor="bg-grayscale-200" className="w-[38.6rem]">
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>

            <Button variant="textButton" size="lg" bgColor="bg-warning-100" className="w-[38.6rem]">
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>

            <Button variant="textButton" size="lg" bgColor="bg-success-100" className="w-[38.6rem]">
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>

            <Button variant="textButton" size="lg" bgColor="bg-white" className="w-[38.6rem]">
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>

            <Button variant="textButton" size="lg" bgColor="bg-blue-500" className="w-[38.6rem]">
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>
          </div>

          {/* 중간 높이 텍스트 버튼 리스트 */}
          <div className="m-5 flex flex-col items-center gap-5">
            <Button variant="textButton" size="md" bgColor="bg-navy-900" className="w-[38.6rem]">
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>

            <Button
              variant="textButton"
              size="md"
              disabled
              hover={false}
              bgColor="bg-grayscale-200"
              className="w-[38.6rem]"
            >
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>

            <Button variant="textButton" size="md" bgColor="bg-grayscale-200" className="w-[38.6rem]">
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>

            <Button variant="textButton" size="md" bgColor="bg-warning-100" className="w-[38.6rem]">
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>

            <Button variant="textButton" size="md" bgColor="bg-success-100" className="w-[38.6rem]">
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>

            <Button variant="textButton" size="md" bgColor="bg-white" className="w-[38.6rem]">
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>

            <Button variant="textButton" size="md" bgColor="bg-blue-500" className="w-[38.6rem]">
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>
          </div>

          {/* 작은 높이 텍스트 버튼 리스트 */}
          <div className="m-5 flex flex-col items-center gap-5">
            <Button variant="textButton" size="sm" bgColor="bg-navy-900" className="w-[38.6rem]">
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>

            <Button
              variant="textButton"
              size="sm"
              disabled
              hover={false}
              bgColor="bg-grayscale-200"
              className="w-[38.6rem]"
            >
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>

            <Button variant="textButton" size="sm" bgColor="bg-grayscale-200" className="w-[38.6rem]">
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>

            <Button variant="textButton" size="sm" bgColor="bg-warning-100" className="w-[38.6rem]">
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>

            <Button variant="textButton" size="sm" bgColor="bg-success-100" className="w-[38.6rem]">
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>

            <Button variant="textButton" size="sm" bgColor="bg-white" className="w-[38.6rem]">
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>

            <Button variant="textButton" size="sm" bgColor="bg-blue-500" className="w-[38.6rem]">
              <EyeShowIcon width={24} height={24} />
              <p>로그인</p>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          {/* 큰 크기의 아이콘 버튼 */}
          <div className="m-5 flex flex-col items-center gap-5">
            <Button variant="iconButton" size="lg" bgColor="bg-navy-900">
              <RefreshIcon width={36} height={36} />
            </Button>

            <Button variant="iconButton" size="lg" bgColor="bg-grayscale-200">
              <RefreshIcon width={36} height={36} />
            </Button>

            <Button variant="iconButton" size="lg" disabled hover={false} bgColor="bg-grayscale-200">
              <RefreshIcon width={36} height={36} />
            </Button>

            <Button variant="iconButton" size="lg" bgColor="bg-warning-100">
              <RefreshIcon width={36} height={36} />
            </Button>

            <Button variant="iconButton" size="lg" bgColor="bg-success-100">
              <RefreshIcon width={36} height={36} />
            </Button>

            <Button variant="iconButton" size="lg" bgColor="bg-white">
              <RefreshIcon width={36} height={36} />
            </Button>
          </div>

          {/* 중간 크기의 아이콘 버튼 */}
          <div className="m-5 flex flex-col items-center gap-5">
            <Button variant="iconButton" size="md" bgColor="bg-navy-900">
              <RefreshIcon width={24} height={24} />
            </Button>

            <Button variant="iconButton" size="md" bgColor="bg-grayscale-200">
              <RefreshIcon width={24} height={24} />
            </Button>

            <Button variant="iconButton" size="md" disabled hover={false} bgColor="bg-grayscale-200">
              <RefreshIcon width={24} height={24} />
            </Button>

            <Button variant="iconButton" size="md" bgColor="bg-warning-100">
              <RefreshIcon width={24} height={24} />
            </Button>

            <Button variant="iconButton" size="md" bgColor="bg-success-100">
              <RefreshIcon width={24} height={24} />
            </Button>

            <Button variant="iconButton" size="md" bgColor="bg-white">
              <RefreshIcon width={24} height={24} />
            </Button>
          </div>

          {/* 작은 크기의 아이콘 버튼 */}
          <div className="m-5 flex flex-col items-center gap-5">
            <Button variant="iconButton" size="sm" bgColor="bg-navy-900">
              <RefreshIcon width={18} height={18} />
            </Button>

            <Button variant="iconButton" size="sm" bgColor="bg-grayscale-200">
              <RefreshIcon width={18} height={18} />
            </Button>

            <Button variant="iconButton" size="sm" disabled hover={false} bgColor="bg-grayscale-200">
              <RefreshIcon width={18} height={18} />
            </Button>

            <Button variant="iconButton" size="sm" bgColor="bg-warning-100">
              <RefreshIcon width={18} height={18} />
            </Button>

            <Button variant="iconButton" size="sm" bgColor="bg-success-100">
              <RefreshIcon width={18} height={18} />
            </Button>

            <Button variant="iconButton" size="sm" bgColor="bg-white">
              <RefreshIcon width={18} height={18} />
            </Button>
          </div>

          {/* FAB 버튼 */}
          <Button variant="fabButton" hover={false}>
            <FabIcon width={45} height={45} />
          </Button>
        </div>

        <div className="h-[8rem] w-[8rem] rounded-full drop-shadow-[0_0_3.75px_#BBEBFF]"></div>

        {/* 언어 버튼 */}
        <div className="flex w-full items-center justify-center">
          <div className="flex w-[82.2rem] gap-5">
            {langs.map((lang) => (
              <Button variant="langButton" active={lang.active} onClick={() => handleLangClick(lang.text)}>
                {lang.comp}
                <p>{lang.text}</p>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

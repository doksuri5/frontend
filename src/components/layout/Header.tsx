"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../common";

import { DISCOVERY_PATH, MAIN_PATH, MY_PAGE_PATH, MY_STOCK_PATH, NEWS_PATH } from "@/routes/path";

import LightLogo from "@/public/icons/light_logo.svg?component";
import DarkLogo from "@/public/icons/dark_logo.svg?component";

type THeaderProps = {
  isLoggedIn: boolean;
};

const Header = ({ isLoggedIn }: THeaderProps) => {
  const router = usePathname();
  const [isLogin, setIsLogin] = useState(true); // 로그인 여부 로직 처리

  const buttonList = [
    { text: "발견", url: DISCOVERY_PATH },
    { text: "뉴스", url: NEWS_PATH },
    { text: "관심종목", url: MY_STOCK_PATH },
    { text: "마이페이지", url: MY_PAGE_PATH },
  ];

  return (
    <header
      className={`flex_row_center fixed left-0 top-0 z-50 h-[8rem] w-full py-[1rem] ${isLoggedIn ? "bg-white" : "bg-transparent"}`}
    >
      <div className="flex_row h-full w-[120rem] justify-between">
        <div className="flex_row h-full">
          <Link href={MAIN_PATH}>{router === MAIN_PATH && !isLogin ? <LightLogo /> : <DarkLogo />}</Link>
          {isLogin && (
            <nav className="flex_row_center ml-[2rem] h-full">
              {buttonList.map((item) => (
                <Link
                  key={item.text}
                  href={item.url}
                  className={`body_3 flex_row_center h-full w-[16rem] ${item.url === router && "font-bold"} text-navy-900`}
                >
                  {item.text}
                </Link>
              ))}
            </nav>
          )}
        </div>
        {isLogin && (
          <Button variant="textButton" size="sm" bgColor="bg-white" className="body_5 w-[10.2rem] font-medium">
            로그아웃
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;

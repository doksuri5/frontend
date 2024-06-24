"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../common";
import LightLogo from "@/public/icons/light_logo.svg";
import DarkLogo from "@/public/icons/dark_logo.svg";

const Header = () => {
  const router = usePathname();
  const [isLogin, setIsLogin] = useState(true); // 로그인 여부 로직 처리

  const buttonList = [
    { text: "발견", url: "/discovery" },
    { text: "뉴스", url: "/news" },
    { text: "관심종목", url: "/mystock" },
    { text: "마이페이지", url: "/mypage" },
  ];

  return (
    <header className="h-[8rem] w-full px-[12rem] py-[1rem]">
      <div className="flex_row h-full w-full justify-between">
        <div className="flex_row h-full">
          <Link href="/">{router === "/" && !isLogin ? <LightLogo /> : <DarkLogo />}</Link>
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

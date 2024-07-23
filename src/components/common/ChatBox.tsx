"use client";

import { useRef, useEffect } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import CloseIcon from "@/public/icons/close_icon.svg?component";
import { useChat } from "ai/react";
import Image from "next/image";
import { generateId } from "ai";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

type ChatBoxProps = {
  close: () => void;
};

export default function ChatBox({ close }: ChatBoxProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        id: generateId(),
        role: "assistant",
        content: `${t("chatBot.initMessage", { defaultMessage: "안녕하세요! 나우챗봇입니다. 무엇을 도와드릴까요?" })}`,
      },
    ],
  });

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="z-999 fixed bottom-[2rem] right-[2rem] mx-auto flex h-[64rem] w-[48rem] flex-col overflow-hidden rounded-t-[4rem] bg-white shadow-lg">
      <div className="flex justify-between border-b bg-navy-900 p-[1.6rem] px-[3rem]">
        <h1 className="body_1 font-semibold text-white">나우챗봇</h1>
        <Button variant="iconButton" className="h-[3rem] w-[2rem]" onClick={() => close()}>
          <CloseIcon color="#FFF" />
        </Button>
      </div>
      <div
        className="mt-[1.6rem] h-full overflow-y-auto px-[1.6rem] pt-[3rem] scrollbar-hide"
        ref={messagesContainerRef}
      >
        {messages?.map((message) => (
          <div key={message.id} className={`mb-2 ${message.role === "user" ? "text-right" : "text-left"}`}>
            <div className={`${message.role !== "user" ? "flex" : null}`}>
              {message.role !== "user" && (
                <Image
                  className="mr-[0.8rem] h-[4.4rem] w-[4.4rem] rounded-xl bg-navy-900 p-[1rem]"
                  src={"/icons/light_logo_base_icon.svg"}
                  alt="profile"
                  width={40}
                  height={40}
                />
              )}
              <div
                className={`inline-block rounded-lg p-[0.8rem] ${message.role === "user" ? "bg-grayscale-100 text-black" : "bg-gray-200 text-gray-800"}`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex w-full gap-[1.6rem] self-end border-t p-[1.2rem]">
        <Input
          inputGroupClass="w-full"
          inputClass="h-[5.3rem]"
          placeholder="나우챗봇에게 물어보세요"
          value={input}
          onChange={handleInputChange}
        />
        <Button bgColor="bg-navy-900" className="h-[5.3rem] w-[6.3rem]">
          전송
        </Button>
      </form>
    </div>
  );
}

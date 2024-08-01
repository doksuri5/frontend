"use client";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import CloseIcon from "@/public/icons/close_icon.svg?component";
import { useChat } from "ai/react";
import Image from "next/image";
import { generateId, ToolInvocation } from "ai";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { SYMBOL_TO_REUTERS } from "@/constants/stockCodes";
import CircleSpinner from "./CircleSpinner";
import ClientCountUp from "./CountUp";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

type ChatBoxProps = {
  close: () => void;
};

export default function ChatBox({ close }: ChatBoxProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const t = useTranslations();
  const [chatBoxHeight, setChatBoxHeight] = useState("64rem");

  const { messages, input, handleInputChange, handleSubmit, addToolResult } = useChat({
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

  useLayoutEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.innerHeight;
      const headerHeight = 8 * 16; // 8rem in pixels
      const adjustedHeight = viewportHeight - headerHeight - 20; // 20px buffer

      if (adjustedHeight < 1024) {
        setChatBoxHeight(`${adjustedHeight}px`);
      } else {
        setChatBoxHeight("64rem");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="z-999 fixed bottom-[2rem] right-[2rem] mx-auto flex w-[55rem] flex-col overflow-hidden rounded-t-[4rem] bg-white shadow-lg"
      style={{ height: chatBoxHeight }}
    >
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
                {message.toolInvocations?.map((toolInvocation: ToolInvocation) => {
                  const toolCallId = toolInvocation.toolCallId;

                  if (toolInvocation.toolName === "explainInvestmentIndicators") {
                    return (
                      <div key={toolCallId}>
                        <div>
                          {"result" in toolInvocation ? (
                            <div className="flex flex-col gap-[0.8rem] p-[0.8rem]">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  a: ({ node, ...props }) => (
                                    <a
                                      {...props}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-blue-500 underline"
                                    />
                                  ),
                                }}
                              >
                                {message.content}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <div className="flex_row_center flex h-[1.6rem] w-[1.6rem]">
                              <CircleSpinner />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }

                  if (toolInvocation.toolName === "getStockInformation") {
                    return (
                      <div key={toolCallId} className="px-[1.6rem] pt-[1.6rem]">
                        <div>
                          {"result" in toolInvocation ? (
                            <div className="flex flex-col gap-[0.8rem]">
                              <p>
                                {t("chatBot.linkCommentStockName")} :{" "}
                                <strong>{toolInvocation.result.quoteSummary.price.shortName}</strong>
                              </p>
                              <p>
                                {t("chatBot.linkCommentStockPrice")} :{" "}
                                <strong>${toolInvocation.result.quoteSummary.price.regularMarketPrice}</strong>
                              </p>
                              <p>
                                {t("chatBot.linkCommentStockPriceChange")} :{" "}
                                <strong>
                                  <ClientCountUp
                                    end={toolInvocation.result.quoteSummary.price.regularMarketChange}
                                    decimals={2}
                                  />
                                  %
                                </strong>
                              </p>
                              {toolInvocation.result.summary && (
                                <>
                                  <p>
                                    {t("chatBot.linkCommentStockDescription")} : {toolInvocation.result.summary}
                                  </p>
                                  <div>
                                    <p className="pb-[0.8rem] font-bold">
                                      {t("chatBot.linkComment", {
                                        defaultMessage: "이 종목에 대한 분석이 필요하신가요?",
                                      })}
                                    </p>
                                    <Button
                                      variant="textButton"
                                      size="sm"
                                      bgColor="bg-navy-900"
                                      onClick={() => {
                                        router.push(
                                          `/report/${SYMBOL_TO_REUTERS[toolInvocation.result.quoteSummary.price.symbol]}`,
                                        );
                                      }}
                                    >
                                      {t("chatBot.linkButton", { defaultMessage: "분석 페이지로 이동" })}
                                    </Button>
                                  </div>
                                </>
                              )}
                              <div className="h-[0.1rem] w-full bg-black" />
                            </div>
                          ) : (
                            <div className="flex_row_center flex h-[1.6rem] w-[1.6rem]">
                              <CircleSpinner />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                })}
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ node, ...props }) => (
                      <a {...props} target="_blank" rel="noreferrer" className="text-blue-500 underline" />
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
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

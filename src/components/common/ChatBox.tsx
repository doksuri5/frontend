import { useRef, useState, useEffect } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import CloseIcon from "@/public/icons/close_icon.svg?component";
import useChat from "@/hooks/use-chat";
import { generateId } from "@/utils/generate-id";
import Image from "next/image";

type ChatBoxProps = {
  close: () => void;
};

export default function ChatBox({ close }: ChatBoxProps) {
  const [userMessage, setUserMessage] = useState<string>("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { messages, setMessages, triggerChat } = useChat();

  const sendMessage = () => {
    if (userMessage.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: generateId(),
        sender: "user",
        text: userMessage,
      },
    ]);

    triggerChat(userMessage);

    setUserMessage("");
  };

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
        className="scrollbar-hide mt-[1.6rem] h-full overflow-y-auto px-[1.6rem] pt-[3rem]"
        ref={messagesContainerRef}
      >
        {messages.map((message) => (
          <div key={message.id} className={`mb-2 ${message.sender === "user" ? "text-right" : "text-left"}`}>
            <div className={`${message.sender === "bot" ? "flex" : null}`}>
              {message.sender === "bot" && (
                <Image
                  className="mr-[0.8rem] h-[4.4rem] w-[4.4rem] rounded-xl bg-navy-900 p-[1rem]"
                  src={"/icons/light_logo_base_icon.svg"}
                  alt="profile"
                  width={40}
                  height={40}
                />
              )}
              <div
                className={`inline-block rounded-lg p-[0.8rem] ${message.sender === "user" ? "bg-grayscale-100 text-black" : "bg-gray-200 text-gray-800"}`}
              >
                {message.text}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full gap-[1.6rem] self-end border-t p-[1.2rem]">
        <Input
          inputGroupClass="w-full"
          inputClass="h-[5.3rem]"
          placeholder="나우챗봇에게 물어보세요"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button bgColor="bg-navy-900" className="h-[5.3rem] w-[6.3rem]" onClick={sendMessage}>
          전송
        </Button>
      </div>
    </div>
  );
}

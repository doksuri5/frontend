// hooks/useStream.ts
import { generateId } from "@/utils/generate-id";
import { useCallback, useEffect, useRef, useState } from "react";

type TMessage = {
  id: string;
  sender: string;
  text: string;
};

const CHAT_API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`;

const useChat = (url?: string) => {
  const [messages, setMessages] = useState<TMessage[]>([
    {
      id: generateId(),
      sender: "bot",
      text: "안녕하세요 아이나우 챗봇입니다. 해외주식 관련해서 궁금하신 점이 있으면 저에게 물어보세요!",
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const triggerChat = useCallback(
    (userMessage: string) => {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(url ?? CHAT_API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_message: userMessage }),
          });

          if (!response.body) {
            throw new Error("ReadableStream not supported by the response");
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let result = "";

          const messageId = generateId();

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            result += decoder.decode(value, { stream: true });

            setMessages((prevMessages) => {
              const newMessages = [...prevMessages];
              const existedMessage = newMessages.find((message) => message.id === messageId);

              if (existedMessage && existedMessage.id === messageId) {
                newMessages[newMessages.length - 1] = {
                  ...existedMessage,
                  text: result,
                };
              } else {
                newMessages.push({
                  id: messageId,
                  sender: "bot",
                  text: result,
                });
              }

              return newMessages;
            });
          }

          setIsLoading(false);
        } catch (err) {
          setError(err as Error);
          setIsLoading(false);
        }
      };

      fetchData();
    },
    [url],
  );

  return { messages, isLoading, error, setMessages, triggerChat };
};

export default useChat;

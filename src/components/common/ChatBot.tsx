"use client";

import { Button } from "@/components/common";
import FabIcon from "@/public/icons/fab_icon.svg?component";
import ChatBox from "./ChatBox";
import useDisclosure from "@/hooks/use-disclosure";

const ChatBot = () => {
  const { isOpen, open, close } = useDisclosure(false);

  return (
    <>
      {isOpen && <ChatBox close={close} />}
      {!isOpen && (
        <Button
          onClick={() => open()}
          variant="iconButton"
          className="fixed bottom-[2rem] right-[2rem] h-[8rem] w-[8rem] rounded-full"
        >
          <FabIcon width={41} height={41} />
        </Button>
      )}
    </>
  );
};

export default ChatBot;

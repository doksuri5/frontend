/**
 * 아래 두 줄의 코드를 사용하여 모달을 조작할 수 있습니다.
 * const [isOpen, setIsOpen] = useState(false); //현재 모달의 열림 여부
 * const closeModal = () => setIsOpen(false);  //모달 창 닫기 함수
 *
 * panelStyle?: 모달 패널의 스타일 지정. 패딩, 모서리 둥글기, 너비 등을 커스텀 가능
 *
 * titleStyle?: 타이틀 폰트 스타일 지정, default는 "heading_3". ex) titleStyle="heading_3"
 *
 * isOpen: 모달의 현재 상태(오픈) 여부. ex) isOpen={isOpen}
 *
 * onClose: 모달 닫기 함수 등록. ex) onClose={() => setIsOpen(false)}
 *
 * title?: 모달 제목, 경고메시지 등을 지정. ex) title="회원 탈퇴"
 *
 * children: 모달 내부에 들어갈 내용을 작성
 *
 * isIconBtn: true/false로 지정 가능. true로 설정하면, 모달 상단 오른쪽에 x 아이콘이 나타나고 이 아이콘 클릭으로 모달 close 가능, default는 false
 *
 */

import { cn } from "@/utils/cn";
import { Dialog, DialogPanel, DialogTitle, TransitionChild } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import Image from "next/image";

type TModalProps = {
  panelStyle?: string;
  titleStyle?: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  closeIcon?: boolean;
};

export default function Modal({
  panelStyle = "px-[10.2rem] py-[8rem] rounded-[3.2rem] w-[32.3rem]",
  titleStyle = "heading_3",
  isOpen,
  onClose,
  title,
  children,
  closeIcon = false,
}: TModalProps) {
  return (
    <Dialog open={isOpen} as="div" className={cn(`relative z-10 focus:outline-none`)} onClose={() => {}}>
      <TransitionChild
        as={Fragment}
        enter="duration-300 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-200 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50" />
      </TransitionChild>

      <div className="fixed inset-0 z-10 w-screen">
        <div className="flex min-h-full items-center justify-center">
          <TransitionChild
            as={Fragment}
            enter="duration-300 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel
              transition
              className={cn(
                `${panelStyle} scrollbar-hidden max-h-[92vh] transform items-center overflow-y-scroll bg-grayscale-0 transition-all duration-300 ease-out`,
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex-grow text-center">
                  <DialogTitle as="h3" className={cn(`${titleStyle} font-bold text-grayscale-900`)}>
                    {title}
                  </DialogTitle>
                </div>
                {closeIcon && (
                  <Image
                    src={"/icons/close_icon.svg"}
                    alt="close"
                    width={48}
                    height={48}
                    className="cursor-pointer"
                    onClick={onClose}
                  />
                )}
              </div>
              <div>{children}</div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  );
}

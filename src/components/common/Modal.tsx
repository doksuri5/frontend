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
  isBackdropClosable?: boolean;
  bodyStyle?: string;
};

export default function Modal({
  panelStyle = "px-[10.2rem] py-[8rem] rounded-[3.2rem] w-[32.3rem]",
  titleStyle = "heading_3",
  isOpen,
  onClose,
  title,
  children,
  closeIcon = false,
  isBackdropClosable = false,
  bodyStyle = "flex flex-col justify-center items-center",
}: TModalProps) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className={cn(`relative z-[1050] focus:outline-none`)}
      onClose={
        isBackdropClosable
          ? () => {
              onClose();
            }
          : () => {}
      }
    >
      <TransitionChild
        as={Fragment}
        enter="duration-300 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-200 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 z-[1040] bg-black bg-opacity-50" />
      </TransitionChild>

      <div className="fixed inset-0 z-[1050] w-screen">
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
              <div className={bodyStyle}>{children}</div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  );
}

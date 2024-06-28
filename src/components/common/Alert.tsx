"use client";

import React, { useState } from "react";
import { Button, Modal } from "@/components/common";
import Link from "next/link";

type TAlertBaseProps = {
  title: string;
  subText?: string;
  buttonText: string;
};

type TCheckButtonProps = TAlertBaseProps & { variant: "checkButton" };
type TLinkButtonProps = TAlertBaseProps & { variant: "linkButton"; link: string };
type TFnButtonProps = TAlertBaseProps & { variant: "fnButton"; subButtonText: string; onClick: () => void };

type TAlertProps = TCheckButtonProps | TLinkButtonProps | TFnButtonProps;

const formatText = (text: string): JSX.Element => {
  return (
    <>
      {text.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </>
  );
};

const Alert: React.FC<TAlertProps> = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  const { variant, title, subText, buttonText } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={title}
      panelStyle="w-[38.6rem] h-full rounded-[2.4rem] px-[3.2rem] pb-[1.6rem] pt-[2.4rem]"
      titleStyle="body_2 font-bold text-navy-900"
    >
      {subText && <p className="body_4 mt-[.8rem] text-center font-normal text-grayscale-900">{formatText(subText)}</p>}
      {variant === "linkButton" && "link" in props && (
        <Link href={props.link}>
          <Button size="md" bgColor="bg-navy-900" className="mt-[3.2rem]">
            {buttonText}
          </Button>
        </Link>
      )}
      {variant === "fnButton" && "subButtonText" in props && "onClick" in props && (
        <div className="flex_row_center gap-[.8rem]">
          <Button size="md" bgColor="bg-grayscale-200" className="mt-[3.2rem]" onClick={props.onClick}>
            {buttonText}
          </Button>
          <Button size="md" bgColor="bg-navy-900" className="mt-[3.2rem]" onClick={() => setIsOpen(false)}>
            {props.subButtonText}
          </Button>
        </div>
      )}
      {variant === "checkButton" && (
        <Button size="md" bgColor="bg-navy-900" className="mt-[3.2rem]" onClick={() => setIsOpen(false)}>
          {buttonText}
        </Button>
      )}
    </Modal>
  );
};

export default Alert;

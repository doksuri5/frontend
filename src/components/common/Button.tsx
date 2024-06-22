/**
 * variant="textButton" | "iconButton" | "fabButton" | "langButton"
 * size="lg" | "md" | "sm"   lg = h-[6.4rem]  md = h-[5.6rem]  sm = h-[3.6rem]
 * bgColor? (default: bg-navy-900)
 * hover? (default: true)
 * disabled? (default: false)
 * active? (default: false)
 * width 기본 값 100% 이고 바꾸고 싶으면 className으로 바꾸면 됩니다.
 * className?
 *
 * 텍스트 버튼
 * <Button variant="textButton" size="lg" bgColor="bg-navy-900" className="w-[38.6rem]">{children}</Button>
 *
 * 텍스트 버튼
 * <Button variant="textButton" size="md" disabled hover={false} bgColor="bg-navy-900" className="w-[38.6rem]">{children}</Button>
 *
 * 아이콘 버튼
 * <Button variant="iconButton" size="lg" bgColor="bg-navy-900">{children}</Button>
 *
 * FAB 버튼
 * <Button variant="fabButton" hover={false}>{children}</Button>
 *
 * 언어 버튼
 * <Button variant="langButton" active>{children}</Button>
 * <Button variant="langButton" active={false}>{children}</Button>
 *
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "box-border inline-flex w-full items-center justify-center whitespace-nowrap border-0 bg-navy-900",
  {
    variants: {
      variant: {
        textButton: "gap-1 rounded-[0.8rem] px-[1rem] py-[1.8rem]", // 텍스트 버튼
        iconButton: "rounded-full", // 아이콘 버튼
        fabButton: "h-[8rem] w-[8rem] rounded-full drop-shadow-[0_0_3.75px_#BBEBFF]", // FAB 버튼
        langButton:
          "body_3 flex h-[16rem] flex-col rounded-[1.6rem] border border-grayscale-300 bg-white font-bold text-grayscale-300", // Language 버튼
      },
      size: {
        // 버튼 높이
        default: "",
        lg: "h-[6.4rem]", // 64px
        md: "h-[5.6rem]", // 56px
        sm: "h-[3.6rem]", // 36px
      },
      disabled: {
        true: "cursor-not-allowed hover:none",
        false: "",
      },
      hover: {
        true: "hover:bg-opacity-90",
        false: "",
      },
      active: {
        true: "border-blue-600 text-blue-600",
        false: "",
      },
    },
    compoundVariants: [
      { variant: "textButton", size: "md", className: "body_4" },
      { variant: "textButton", size: "lg", className: "body_3" },
      { variant: "textButton", size: "sm", className: "body_5" },
      { variant: "iconButton", size: "md", className: "w-[5.6rem]" },
      { variant: "iconButton", size: "lg", className: "w-[6.4rem]" },
      { variant: "iconButton", size: "sm", className: "w-[3.6rem]" },
    ],
    defaultVariants: {
      variant: "textButton",
      size: "default",
      disabled: false,
      hover: true,
      active: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  disabled?: boolean;
  hover?: boolean;
  active?: boolean;
  bgColor?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, hover, disabled, active, asChild = false, bgColor, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // 배경색에 따른 글씨, border 색상 설정
    let textColor = "";
    let borderColor = "";
    if (variant !== "langButton") {
      if (bgColor) {
        borderColor = `border-${bgColor.replace("bg-", "")}`;

        if (bgColor.includes("bg-navy")) {
          textColor = "text-white";
        } else if (bgColor.includes("bg-grayscale") && disabled) {
          textColor = "text-grayscale-300";
        } else if (bgColor.includes("bg-grayscale")) {
          textColor = "text-grayscale-600";
        } else if (bgColor === "bg-warning-100") {
          textColor = "text-white";
        } else if (bgColor === "bg-success-100") {
          textColor = "text-white";
        } else if (bgColor === "bg-white") {
          textColor = "text-navy-900";
          borderColor = "border border-navy-900";
        } else if (bgColor.includes("bg-blue")) {
          textColor = "text-white";
        }
      }
    }

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, hover, disabled, active, className }),
          borderColor,
          bgColor,
          textColor,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

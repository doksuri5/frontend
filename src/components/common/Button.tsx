import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        textButton: "px-[10px] py-[18px] rounded-lg gap-1 border", // 텍스트 버튼
        iconButton: "border-none rounded-full", // 아이콘 버튼
        fabButton: "w-20 h-20 border-none rounded-full shadow-md bg-opacity-50 bg-navy-900", // FAB 버튼 x: 0, y: 0, blur: 20, spread: 0, 18254C 50%
        langButton: "", // Language 버튼
      },
      size: {
        default: "h-14full", // 56
        lg: "h-16", // 64
        sm: "h-9", // 36
      },
    },
    compoundVariants: [
      { variant: "textButton", size: "default", className: "text-base" },
      { variant: "textButton", size: "lg", className: "text-lg" },
      { variant: "textButton", size: "sm", className: "text-sm" },
      { variant: "iconButton", size: "default", className: "w-14" },
      { variant: "iconButton", size: "lg", className: "w-16" },
      { variant: "iconButton", size: "sm", className: "w-9" },
    ],
    defaultVariants: {
      variant: "textButton",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  bgColor?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, bgColor, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const borderColor = bgColor === "bg-white" ? "border-black" : bgColor ? `border-${bgColor.replace("bg-", "")}` : "";

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }), borderColor, bgColor)} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

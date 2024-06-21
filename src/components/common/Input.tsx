"use client";

import * as React from "react";

import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { Field, Label } from "@headlessui/react";

import Image from "next/image";
import EyeHideIcon from "@/app/svg/eyeHide_icon.svg";
import EyeShowIcon from "@/app/svg/eyeShow_icon.svg";

const inputGroupVariants = cva(
  [
    "flex w-full rounded-sm border px-3 py-2 ",
    "border-input bg-background ring-offset-background", // default
    "placeholder:text-muted-foreground", // placeholder
    "file:border-0 file:bg-transparent file:text-sm file:font-medium", // file input
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2", // focus
    "disabled:cursor-not-allowed disabled:opacity-50", // disabled
  ],
  {
    variants: {
      variant: {
        default: "", // 텍스트 버튼
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputGroupVariants> & {
    validation?: "success" | "error";
    errorMessage?: string;
    variant?: "default";
    size?: "default";
    label: string;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, validation, errorMessage, size, label, ...props }, ref) => {
    return (
      <div className={cn("relative flex w-full flex-col")}>
        <label
          className={cn("primary-900", {
            "text-muted-foreground": validation === "success",
          })}
          htmlFor={props.id}
        >
          {label}
        </label>
        <input
          id={props.id}
          type={type}
          className={cn(inputGroupVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute bottom-0 right-0 top-0 flex h-10 w-10 items-center justify-center"
            onClick={() => {
              if (type === "password") {
              } else {
              }
            }}
          >
            <Image
              src={type === "password" ? EyeHideIcon : EyeShowIcon}
              alt={type === "password" ? "비밀번호 숨기기" : "비밀번호 보이기"}
            />
          </button>
        )}
        {errorMessage && <p className="text-destructive-foreground text-xs">{errorMessage}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };

"use client";

import React, { ElementType, forwardRef, InputHTMLAttributes, LabelHTMLAttributes, useMemo, useState } from "react";

import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

import EyeHideIcon from "@/assets/icons/eye-hide-icon";
import EyeShowIcon from "@/assets/icons/eye-show-icon";
import Label from "./Label";
import Caption from "./Caption";

export type VariantTypes = "default" | "error" | "success";

export type TSizes = "default" | "sm" | "lg";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: VariantTypes;
  labelName?: string;
  size?: TSizes;
  // validation
  errorMessage?: string;
  // custom style class
  inputGroupClass?: string;
  labelClass?: string;
  inputClass?: string;
  captionClass?: string;
  // suffix icon or button
  suffix?: ElementType;
};

const inputVariants = cva(
  [
    "w-full absolute", // block
    "border rounded-lg", // border
    "disabled:bg-grayscale-100 disabled:text-grayscale-300 disabled:placeholder-grayscale-300", // disabled
  ],
  {
    variants: {
      variant: {
        default: "border-grayscale-300 focus:outline-blue-500",
        error: "border-warning-100 focus:outline-warning-100",
        success: "border-grayscale-300 focus:outline-blue-500",
      },
      size: {
        default: "p-4 body_4",
        sm: "p-2 body_5",
        lg: "p-6 body_3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const trailingButtonVariants = cva("absolute", {
  variants: {
    variant: {
      default: "text-blue-500",
      error: "text-warning-100",
      success: "text-success-100",
    },
    size: {
      default: "right-4 top-4",
      sm: "right-2 top-2",
      lg: "right-6 top-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const InputGroup = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      variant,
      errorMessage,
      size,
      labelName,
      inputGroupClass,
      labelClass,
      inputClass,
      captionClass,
      suffix: SuffixComp,
      ...props
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const handlePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    const inputType = useMemo(
      () => (type === "password" && isPasswordVisible ? "text" : type),
      [type, isPasswordVisible],
    );

    return (
      <InputGroup className={inputGroupClass}>
        <Label labelName={labelName} htmlFor={props.id} variant={variant} size={size} labelClass={labelClass}>
          <input
            type={inputType}
            id={props.id}
            className={cn(inputVariants({ variant, size, className: inputClass }))}
            ref={ref}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              className={cn(trailingButtonVariants({ variant, size }))}
              onClick={handlePasswordVisibility}
            >
              {isPasswordVisible ? (
                <EyeShowIcon color={variant === "error" ? "#FF294F" : undefined} />
              ) : (
                <EyeHideIcon color={variant === "error" ? "#FF294F" : undefined} />
              )}
            </button>
          )}
          {SuffixComp && <SuffixComp />}
        </Label>
        {errorMessage && <Caption caption={errorMessage} variant={variant} captionClass={captionClass} />}
      </InputGroup>
    );
  },
);

Input.displayName = "Input";

export { Input };

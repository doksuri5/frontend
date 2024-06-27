"use client";

import {
  forwardRef,
  ReactNode,
  InputHTMLAttributes,
  ReactElement,
  cloneElement,
  useMemo,
  useState,
  useCallback,
} from "react";

import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

import EyeHideIcon from "@/assets/icons/eye-hide-icon";
import EyeShowIcon from "@/assets/icons/eye-show-icon";
import Label from "./Label";
import Caption from "./Caption";
import { ButtonProps } from "./Button";

export type VariantTypes = "default" | "error" | "success";

export type TSizes = "default" | "sm" | "lg";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  variant?: VariantTypes;
  labelName?: string;
  size?: TSizes;
  caption?: string;
  // custom style class
  inputGroupClass?: string;
  labelClass?: string;
  inputClass?: string;
  captionClass?: string;
  suffix?: ReactElement<ButtonProps>;
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
        error: "border-warning-100 focus:outline-warning-100 placeholder-warning-100",
        success: "border-grayscale-300 focus:outline-blue-500",
      },
      size: {
        default: "p-[1.6rem] body_4",
        sm: "p-[1.3rem] body_5",
        lg: "p-[2.2rem] body_3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const suffixButtonVariants = cva("absolute max-w-[12rem] top-[50%] transform -translate-y-1/2", {
  variants: {
    size: {
      default: "max-h-[2.4rem] right-[1.6rem]",
      sm: "max-h-[2.4rem] right-[1.3rem]",
      lg: "max-h-[4.2rem] right-[2rem]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const trailingButtonVariants = cva("absolute", {
  variants: {
    variant: {
      default: "text-blue-500",
      error: "text-warning-100",
      success: "text-success-100",
    },
    size: {
      default: "right-[1.2rem] top-[50%] transform -translate-y-1/2",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const InputGroup = ({ className, children }: { className?: string; children: ReactNode }) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      variant,
      caption,
      size,
      labelName,
      inputGroupClass,
      labelClass,
      inputClass,
      captionClass,
      suffix,
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

    const cloneSuffix = useMemo(() => {
      if (!suffix) return null;
      return cloneElement(suffix, {
        className: cn(suffixButtonVariants({ size, className: suffix.props.className })),
      });
    }, [size, suffix]);

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
              className={cn(trailingButtonVariants({ variant, size: "default" }))}
              onClick={handlePasswordVisibility}
            >
              {isPasswordVisible ? (
                <EyeShowIcon color={variant === "error" ? "#FF294F" : undefined} />
              ) : (
                <EyeHideIcon color={variant === "error" ? "#FF294F" : undefined} />
              )}
            </button>
          )}
          {cloneSuffix}
        </Label>
        {caption && (
          <Caption variant={variant} captionClass={captionClass}>
            {caption}
          </Caption>
        )}
      </InputGroup>
    );
  },
);

Input.displayName = "Input";

export { Input };

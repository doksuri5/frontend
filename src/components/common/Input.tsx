import * as React from "react";

import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { Field, Label } from "@headlessui/react";

const inputGroupVariants = cva(
  [
    "flex w-full rounded-sm border px-3 py-2 text-sm",
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
  ({ className, type, variant, validation, errorMessage, size, label = "아이디", ...props }, ref) => {
    return (
      <Field disabled={props.disabled} className={cn("relative flex w-full flex-col")}>
        <Label
          className={cn("primary-900", {
            "text-muted-foreground": validation === "success",
          })}
          htmlFor={props.id}
        >
          {label}
        </Label>
        <input
          id={props.id}
          type={type}
          className={cn(inputGroupVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
        {errorMessage && <p className="text-destructive-foreground text-xs">{errorMessage}</p>}
      </Field>
    );
  },
);

Input.displayName = "Input";

export { Input };

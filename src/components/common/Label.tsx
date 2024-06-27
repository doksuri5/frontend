import { cva } from "class-variance-authority";
import { TSizes, VariantTypes } from "./Input";
import { LabelHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

const labelVariants = cva("peer flex flex-col has-[:disabled]:text-grayscale-300", {
  variants: {
    variant: {
      default: "text-navy-900",
      error: "text-warning-100",
      success: "text-navy-900",
    },
    size: {
      default: "body_4",
      lg: "body_3",
      sm: "body_5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const containerVariants = cva("relative", {
  variants: {
    size: {
      default: "min-h-[5.8rem]",
      lg: "min-h-[7.4rem]",
      sm: "min-h-[4.8rem]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const Label = ({
  labelName,
  children,
  variant,
  size,
  labelClass,
  ...props
}: {
  labelName?: string;
  children: React.ReactNode;
  variant?: VariantTypes;
  size?: TSizes;
  labelClass?: string;
} & LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={cn(labelVariants({ variant, size, className: labelClass }))} {...props}>
    {labelName}
    <div className={cn(containerVariants({ size }))}>{children}</div>
  </label>
);

export default Label;

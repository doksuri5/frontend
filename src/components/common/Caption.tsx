import { cn } from "@/utils/cn";
import { TSizes, VariantTypes } from "./Input";
import { cva } from "class-variance-authority";

const captionVariants = cva("text-navy-900 peer-has-[:disabled]:text-grayscale-300 peer-has-[:focus]:text-blue-500", {
  variants: {
    variant: {
      default: "text-navy-900",
      error: "text-warning-100",
      success: "text-success-100",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Caption = ({
  caption,
  variant,
  captionClass,
}: {
  caption: string;
  variant?: VariantTypes;
  size?: TSizes;
  captionClass?: string;
}) => (
  <p
    className={cn(
      captionVariants({
        variant,
        className: captionClass,
      }),
    )}
  >
    {caption}
  </p>
);

export default Caption;

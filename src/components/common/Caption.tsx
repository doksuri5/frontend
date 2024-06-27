import { cn } from "@/utils/cn";
import { TSizes, VariantTypes } from "./Input";
import { cva } from "class-variance-authority";

const captionVariants = cva("caption text-navy-900 peer-has-[:disabled]:text-grayscale-300 pt-[0.4rem]", {
  variants: {
    variant: {
      default: "text-navy-900 peer-has-[:focus]:text-blue-500",
      error: "text-warning-100",
      success: "text-success-100",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Caption = ({
  children,
  variant,
  captionClass,
}: {
  children: React.HTMLAttributes<HTMLParagraphElement>["children"];
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
    {children}
  </p>
);

export default Caption;

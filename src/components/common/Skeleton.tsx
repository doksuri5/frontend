import { cn } from "@/utils/cn";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-grayscale-100", className)} {...props} />;
}

export { Skeleton };

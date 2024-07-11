import { cn } from "@/utils/cn";
import { Skeleton } from "./Skeleton";

export default function CardSkeleton({
  variant,
  size = "large",
  style,
}: {
  variant: "iconCard" | "halfMediaCard" | "fullMediaCard";
  size?: "large" | "small";
  style?: string;
}) {
  switch (variant) {
    case "halfMediaCard":
      return (
        <div className={cn(`flex min-h-[36rem] min-w-[38.8rem] flex-col overflow-hidden rounded-[1.6rem] ${style}`)}>
          <Skeleton className="relative min-h-[23.6rem] w-[100%]" />
          <div className="flex w-full flex-col gap-[.8rem] rounded-b-[1.6rem] bg-grayscale-0 px-[2.4rem] py-[1.6rem]">
            <Skeleton className="h-[5.6rem] cursor-pointer" />
            <Skeleton className="h-[2rem] w-3/6" />
          </div>
        </div>
      );
    case "fullMediaCard":
      return (
        <Skeleton
          className={cn(
            `container relative flex ${size === "large" ? "min-h-[42rem]" : "min-h-[20rem]"} min-w-[59rem] flex-col overflow-hidden rounded-[1.6rem] ${style}`,
          )}
        >
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-[2.4rem]">
            <Skeleton className="mb-[1.4rem] h-[3.2rem]" />
            <div className="body_5 font-medium">
              {size === "large" && <Skeleton className="mb-[1.4rem] h-[4rem]" />}
              <Skeleton className="h-[2rem] w-3/6" />
            </div>
          </div>
        </Skeleton>
      );
  }
}

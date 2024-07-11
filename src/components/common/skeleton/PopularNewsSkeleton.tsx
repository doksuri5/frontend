import CardSkeleton from "./CardSkeleton";

export default function PopularNewsSkeleton() {
  return (
    <div className="flex flex-col gap-[2.4rem]">
      <h2 className="heading_4 font-bold text-navy-900">오늘 인기있는 뉴스</h2>
      <div className="flex min-w-[120px] gap-[2rem]">
        <CardSkeleton variant="fullMediaCard" style="w-1/2 h-full" />
        <div className="flex w-1/2 flex-col gap-[2rem]">
          <CardSkeleton variant="fullMediaCard" size="small" />
          <CardSkeleton variant="fullMediaCard" size="small" />
        </div>
      </div>
    </div>
  );
}

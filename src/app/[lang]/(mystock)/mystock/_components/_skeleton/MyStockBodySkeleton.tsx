import MyStockItemSkeleton from "./MyStockItemSkeleton";

const MyStockBodySkeleton = () => (
  <article className="pb-[5.6rem] pt-[2.4rem]">
    <section className="grid w-full grid-cols-3 gap-x-[1.9rem] gap-y-[2.4rem]">
      {Array.from({ length: 3 }).map((_, idx) => (
        <MyStockItemSkeleton key={idx} />
      ))}
    </section>
  </article>
);

export default MyStockBodySkeleton;

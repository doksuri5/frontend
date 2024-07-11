import Spinner from "@/components/common/Spinner";

export default function Loading() {
  return (
    <section className="flex h-screen items-center justify-center">
      <div className="relative h-[25.6rem] w-[25.6rem] rounded-[3.2rem] bg-white p-[8rem]">
        <Spinner />
      </div>
    </section>
  );
}

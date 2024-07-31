import Spinner from "@/components/common/Spinner";

export default function BodyLoading() {
  return (
    <section className="flex h-[calc(100vh-80px)] items-center justify-center">
      <div className="relative h-[25.6rem] w-[25.6rem] rounded-[3.2rem] bg-white p-[8rem]">
        <Spinner />
      </div>
    </section>
  );
}

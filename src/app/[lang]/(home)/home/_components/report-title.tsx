import { auth } from "@/auth";

const ReportTitle = async ({ title }: { title: string }) => {
  const session = await auth();

  return (
    <h1 className="heading_4 font-bold">
      <span>{session?.user.name ?? session?.user.nickname}</span>
      {title}
    </h1>
  );
};

export default ReportTitle;

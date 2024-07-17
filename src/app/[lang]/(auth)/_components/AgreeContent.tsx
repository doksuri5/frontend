import CommonAgreeLayout from "./CommonAgreeLayout";

type TAgreeContentProps = {
  title: string;
  content: string;
};

export default function AgreeContent({ title, content }: TAgreeContentProps) {
  return (
    <>
      <CommonAgreeLayout title={title}>{content}</CommonAgreeLayout>
    </>
  );
}

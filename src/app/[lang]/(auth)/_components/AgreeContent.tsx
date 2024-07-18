import CommonAgreeLayout from "./CommonAgreeLayout";

type TAgreeContentProps = {
  title: string;
  content: string | JSX.Element[];
};

export default function AgreeContent({ title, content }: TAgreeContentProps) {
  return (
    <>
      <CommonAgreeLayout title={title}>{content}</CommonAgreeLayout>
    </>
  );
}

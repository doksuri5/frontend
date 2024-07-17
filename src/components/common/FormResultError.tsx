import ErrorIcon from "@/assets/icons/error-icon";

type TFormResultErrorProps = {
  message: string;
};

export default function FormResultError({ message }: TFormResultErrorProps) {
  return (
    <div className="body_5 flex_row mb-[1.6rem] rounded-[0.8rem] bg-rose-100 p-[1.6rem] text-warning-100">
      <ErrorIcon />
      <span className="ml-[0.8rem]">{message}</span>
    </div>
  );
}

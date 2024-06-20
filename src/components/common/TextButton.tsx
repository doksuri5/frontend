/**
 * style에 넣을 값들
 *
 * bg-color
 * 높이
 * font-size
 * font-color
 */

type TTextButtonProps = React.ComponentProps<"button"> & {
  type: string;
  style?: string;
  children: React.ReactNode;
};
export default function TextButton({ type, style, children, ...restProps }: TTextButtonProps) {
  return (
    <button
      type={type}
      className={`items-conter gap flex w-full justify-center gap-1 rounded-lg border border-solid px-[10px] py-[18px] ${style}`}
      {...restProps}
    >
      {children}
    </button>
  );
}

export default function ButtonSpinner() {
  return (
    <div className="flex_col_center relative mr-[0.8rem] h-[4.8rem] w-[4.8rem]">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`absolute h-[1.2rem] w-[0.6rem] animate-[whiteChangeColor_1s_infinite] rounded-full bg-[#FFFFFFF59] shadow-md`}
          style={{
            transform: `rotate(${i * 45}deg) translate(0, -150%)`,
            animationDelay: `${i * 0.1}s`,
          }}
        ></div>
      ))}
    </div>
  );
}

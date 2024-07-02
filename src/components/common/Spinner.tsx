const Spinner = () => {
  return (
    <div className="absolute bottom-[14rem] left-[12.5rem]">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`absolute h-[2.4rem] w-[0.8rem] animate-[changeColor_1s_infinite] rounded-full bg-navy-100 shadow-md`}
          style={{
            transform: `rotate(${i * 45}deg) translate(0, -150%)`,
            animationDelay: `${i * 0.1}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Spinner;

"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

const TextMore = ({ children }: { children: ReactNode }) => {
  const [moreText, setMoreText] = useState(false);
  const [overFlow, setOverFlow] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (textRef.current) {
      const scrollHeight = textRef.current?.scrollHeight;
      const clientHeight = textRef.current?.clientHeight;
      if (scrollHeight > clientHeight) {
        setOverFlow(true);
      }
    }
  }, [width]);

  const toggleMoreText = () => {
    setMoreText(!moreText);
  };

  return (
    <div className="relative">
      <p ref={textRef} className={`text-gray-700 ${moreText ? "" : "line-clamp-4"}`}>
        {children}
      </p>
      {overFlow && (
        <button className="body_5 absolute bottom-[-10] right-0 bg-white font-semibold" onClick={toggleMoreText}>
          {moreText ? "접기" : "더보기"}
        </button>
      )}
    </div>
  );
};

export default TextMore;

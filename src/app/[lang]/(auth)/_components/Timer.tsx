"use client";
import { useEffect, useState } from "react";

type TTimerPros = {
  initialTime: number;
  onTimeUp: () => void;
  isRunning: boolean;
};

export default function Timer({ initialTime, onTimeUp, isRunning }: TTimerPros) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time <= 0) {
      onTimeUp();
    }

    return () => clearInterval(intervalId);
  }, [time, isRunning, onTimeUp]);

  useEffect(() => {
    if (!isRunning) {
      setTime(initialTime);
    }
  }, [isRunning, initialTime]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <p className="absolute right-[10.5rem] top-[2.9rem] translate-y-[-50%] text-[1.4rem] text-blue-500">
      {formatTime(time)}
    </p>
  );
}

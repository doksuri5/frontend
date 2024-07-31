"use client";

import useDraggable from "@/hooks/use-draggable";
import { useRef } from "react";

const DraggableList = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const draggableOptions = useDraggable(ref);

  return (
    <ul className="flex touch-none gap-[2rem] overflow-x-scroll scrollbar-hide" ref={ref} {...draggableOptions()}>
      {children}
    </ul>
  );
};

export default DraggableList;

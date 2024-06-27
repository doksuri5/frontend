import { useDrag } from "@use-gesture/react";
import { RefObject } from "react";

export const useDraggable = (ref: RefObject<HTMLDivElement>) => {
  const getDraggableOptions = useDrag(
    ({ event, delta: [x] }) => {
      event.preventDefault();

      const el = ref.current;
      if (!el) return;

      el.scrollBy(-x, 0);
    },
    { filterTaps: true },
  );

  return getDraggableOptions;
};

export default useDraggable;

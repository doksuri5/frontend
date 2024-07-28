import { useMemo, useState, useCallback } from "react";

export const useShowMoreItems = (initialMaxItems: number, itemList: any[]) => {
  const [showMoreItems, setShowMoreItems] = useState(false);
  const [maxDisplayedItems, setMaxDisplayedItems] = useState(initialMaxItems);

  const handleShowMore = useCallback(() => {
    setShowMoreItems(true);
    setMaxDisplayedItems(itemList.length);
  }, [itemList.length]);

  const displayedItems = useMemo(() => {
    return showMoreItems ? itemList : itemList.slice(0, maxDisplayedItems);
  }, [itemList, showMoreItems, maxDisplayedItems]);

  return { displayedItems, showMoreItems, maxDisplayedItems, handleShowMore };
};

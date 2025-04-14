import { TVacancyShort } from "@/shared/api/types";
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

export const useVacaniesBoard = (
  groupedItems: Record<string, TVacancyShort[]>
) => {
  const [groups, setGroups] =
    useState<Record<string, TVacancyShort[]>>(groupedItems);

  useEffect(() => {
    setGroups(groupedItems);
  }, [groupedItems]);

  const [activeItem, setActiveItem] = useState<TVacancyShort | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeVacancy = active.data.current?.vacancy;
    setActiveItem(activeVacancy);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveItem(null);
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const activeData = active.data.current;
    const overData = over.data.current;
    if (!activeData || !overData) return;
    //Ccheck active element and over zone
    const isActiveItem = activeData.type === "vac_item";
    const isOverItem = overData.type === "vac_item";
    const isOverColumn = overData.type === "vac_column";

    // If there is no active element, stop dragging
    if (!isActiveItem) return;
    console.log(overData);

    const sourceColStatus = activeData.status_id;
    const targetColStatus = overData.status_id;

    if (!sourceColStatus || !targetColStatus) return;

    if (isActiveItem) {
      const draggableItem = activeData.vacancy;
      if (!draggableItem) return;

      //if element is over column
      if (isOverColumn) {
        setGroups((prev) => {
          if (sourceColStatus === targetColStatus) return prev;
          const sourceItems = [...prev[sourceColStatus]];
          const targetItems = [...(prev[targetColStatus] || [])];
          return {
            ...prev,
            [sourceColStatus]: sourceItems.filter(
              (vac: TVacancyShort) => vac.id !== draggableItem.id
            ),
            [targetColStatus]: [
              ...targetItems,
              { ...draggableItem, status_id: targetColStatus },
            ],
          };
        });
      } else if (isOverItem) {
        //if element is over another element(item, card)
        setGroups((prev) => {
          const sourceItems = [...prev[sourceColStatus]];
          const targetItems = [...(prev[targetColStatus] || [])];

          const overIndex = overData.sortable.index ?? -1;

          //if move item between columns ant is is over other item
          if (sourceColStatus !== targetColStatus) {
            return {
              ...prev,
              [sourceColStatus]: sourceItems.filter(
                (item) => item.id !== draggableItem.id
              ),
              [targetColStatus]: [
                ...targetItems.slice(0, overIndex),
                { ...draggableItem, status_id: targetColStatus },
                ...targetItems.slice(overIndex),
              ],
            };
          }

          const activeIndex = sourceItems.findIndex(
            (item) => item.id === draggableItem.id
          );

          if (activeIndex === overIndex || overIndex === -1) return prev;
          return {
            ...prev,
            [sourceColStatus]: arrayMove(sourceItems, activeIndex, overIndex),
          };
        });
      }
    }

    // setActiveItem(null);
  };
  return {
    handleDragStart,
    handleDragEnd,
    activeItem,
    groups,
  };
};

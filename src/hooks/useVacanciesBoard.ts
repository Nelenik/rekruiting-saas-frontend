import { TVacancyShort, EVacancyStatus } from "@/shared/types";
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import {
  isValidDragEvent,
  findItemStatus,
} from "../components/dnd-boards/helpers";

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
    const activeVacancy =
      Object.values(groups)
        .flat()
        .find((vacancy) => String(vacancy.id) === active.id) || null;

    setActiveItem(activeVacancy);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!isValidDragEvent(active, over)) return;

    //Ccheck active element and over zone
    const isActiveItem = active.data.current?.type === "vac_item";
    const isOverItem = over?.data?.current?.type === "vac_item";
    const isOverColumn = over?.data?.current?.type === "vac_column";

    // If there is no active element, stop dragging
    if (!isActiveItem) return;

    const sourceColStatus = findItemStatus(groups, String(active.id));

    const targetColStatus = isOverColumn
      ? String(over.id)
      : findItemStatus(groups, String(over?.id));

    if (!sourceColStatus || !targetColStatus) return;

    if (isActiveItem) {
      const draggableItem = Object.values(groups)
        .flat()
        .find((vac) => String(vac.id) === active.id);
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
              (vac: TVacancyShort) => String(vac.id) !== active.id
            ),
            [targetColStatus]: [
              ...targetItems,
              { ...draggableItem, status: targetColStatus as EVacancyStatus },
            ],
          };
        });
      } else if (isOverItem) {
        //if element is over another element(item, card)
        setGroups((prev) => {
          const sourceItems = [...prev[sourceColStatus]];
          const targetItems = [...(prev[targetColStatus] || [])];

          const overIndex = over.data.current?.sortable.index ?? -1;

          //if move item between columns ant is is over other item
          if (sourceColStatus !== targetColStatus) {
            return {
              ...prev,
              [sourceColStatus]: sourceItems.filter(
                (item) => String(item.id) !== active.id
              ),
              [targetColStatus]: [
                ...targetItems.slice(0, overIndex),
                { ...draggableItem, status: targetColStatus as EVacancyStatus },
                ...targetItems.slice(overIndex),
              ],
            };
          }

          const activeIndex = sourceItems.findIndex(
            (item) => String(item.id) === active.id
          );

          if (activeIndex === overIndex || overIndex === -1) return prev;
          return {
            ...prev,
            [sourceColStatus]: arrayMove(sourceItems, activeIndex, overIndex),
          };
        });
      }
    }

    setActiveItem(null);
  };
  return {
    handleDragStart,
    handleDragEnd,
    activeItem,
    groups,
  };
};

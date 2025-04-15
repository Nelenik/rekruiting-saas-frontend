import { TVacancyShort } from "@/shared/api/types";
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { TGroupedVacancies } from "./types";
import { useGroupedVacancies } from "./useGroupedVacancies";

export const useVacaniesBoard = () => {
  const { groups, updateGroups, isLoading } = useGroupedVacancies();

  // const [groups, setGroups] = useState<TGroupedVacancies>(grouped);

  // useEffect(() => {
  //   setGroups(grouped);
  // }, [grouped]);

  const [activeItem, setActiveItem] = useState<TVacancyShort | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeVacancy = active.data.current?.vacancy;
    setActiveItem(activeVacancy);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveItem(null);
    if (!groups) return;
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    console.log("activeData", active);
    console.log("over", over);

    if (!activeData || !overData) return;
    //Ccheck active element and over zone
    const isActiveItem = activeData.type === "vac_item";
    // const isOverItem = overData.type === "vac_item";
    // const isOverColumn = overData.type === "vac_column";

    // If there is no active element, stop dragging
    if (!isActiveItem) return;

    const sourceColStatus = activeData.status_id;
    const targetColStatus = overData.status_id;

    if (!sourceColStatus || !targetColStatus) return;

    //If thie item is moving
    if (isActiveItem) {
      const draggableItem = activeData.vacancy;
      if (!draggableItem) return;

      const overItem: TVacancyShort | undefined = overData.vacancy;

      const sourceItems = [...groups[sourceColStatus]];
      const targetItems = [...(groups[targetColStatus] || [])];

      //find the active el index in sortable context and the over item index
      const activeIndex = sourceItems.findIndex(
        (el) => el.id === draggableItem.id
      );

      const overIndex = overItem
        ? targetItems.findIndex((el) => el.id === overItem.id)
        : undefined;

      const newGroups: TGroupedVacancies = { ...groups };

      //in the same column
      if (sourceColStatus === targetColStatus) {
        if (overIndex !== undefined && activeIndex !== overIndex) {
          newGroups[sourceColStatus] = arrayMove(
            sourceItems,
            activeIndex,
            overIndex
          );
        }
      } else {
        // Remove from source column
        newGroups[sourceColStatus] = sourceItems.filter(
          (item) => item.id !== draggableItem.id
        );
        if (overIndex !== undefined) {
          // Add at specific position
          newGroups[targetColStatus] = [
            ...targetItems.slice(0, overIndex),
            { ...draggableItem, status_id: Number(targetColStatus) },
            ...targetItems.slice(overIndex),
          ];
        } else {
          // Add to end of column
          newGroups[targetColStatus] = [
            ...targetItems,
            { ...draggableItem, status_id: Number(targetColStatus) },
          ];
        }
      }
      updateGroups(newGroups);
    }

    // if (isActiveItem) {
    //   const draggableItem = activeData.vacancy;
    //   if (!draggableItem) return;

    //   //if element is over column
    //   if (isOverColumn) {
    //     setGroups((prev) => {
    //       if (sourceColStatus === targetColStatus) return prev;
    //       const sourceItems = [...prev[sourceColStatus]];
    //       const targetItems = [...(prev[targetColStatus] || [])];
    //       return {
    //         ...prev,
    //         [sourceColStatus]: sourceItems.filter(
    //           (vac: TVacancyShort) => vac.id !== draggableItem.id
    //         ),
    //         [targetColStatus]: [
    //           ...targetItems,
    //           { ...draggableItem, status_id: targetColStatus },
    //         ],
    //       };
    //     });
    //   } else if (isOverItem) {
    //     //if element is over another element(item, card)
    //     setGroups((prev) => {
    //       const sourceItems = [...prev[sourceColStatus]];
    //       const targetItems = [...(prev[targetColStatus] || [])];

    //       const overIndex = overData.sortable.index ?? -1;

    //       //if move item between columns ant is is over other item
    //       if (sourceColStatus !== targetColStatus) {
    //         return {
    //           ...prev,
    //           [sourceColStatus]: sourceItems.filter(
    //             (item) => item.id !== draggableItem.id
    //           ),
    //           [targetColStatus]: [
    //             ...targetItems.slice(0, overIndex),
    //             { ...draggableItem, status_id: targetColStatus },
    //             ...targetItems.slice(overIndex),
    //           ],
    //         };
    //       }

    //       const activeIndex = sourceItems.findIndex(
    //         (item) => item.id === draggableItem.id
    //       );

    //       if (activeIndex === overIndex || overIndex === -1) return prev;
    //       return {
    //         ...prev,
    //         [sourceColStatus]: arrayMove(sourceItems, activeIndex, overIndex),
    //       };
    //     });
    //   }
    // }
  };

  return {
    isLoading,
    handleDragStart,
    handleDragEnd,
    activeItem,
    groups,
  };
};

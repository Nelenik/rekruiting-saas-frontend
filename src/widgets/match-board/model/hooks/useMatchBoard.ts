import { useSingleVacancy } from "@/shared/providers/SingleVacancyProvider";
import { TCandidateShort } from "@/shared/api/types";
import { TStatus } from "@/shared/api/types/statuses";
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { useOptimisticUpdateMatch } from "./useOptimisticUpdateMatch";

export const useMatchBoard = () => {
  const { columns, moveColumn } = useSingleVacancy();
  const columnsIds = useMemo(() => columns.map((col) => col.id), [columns]);

  //activeColumn and acitveItem state for DndOverlay
  const [activeColumn, setActiveColumn] = useState<TStatus | null>(null);

  const [activeItem, setActiveItem] = useState<TCandidateShort | null>(null);

  // update match status hook
  const { startMatchUpd } = useOptimisticUpdateMatch(activeItem?.id);

  /****DND HANDLERS *****/
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const data = active.data.current;
    if (data?.type === "match_item") {
      const activeItem = data.candidate || null;
      setActiveItem(activeItem);
    } else if (data?.type === "match_column") {
      const activeColumn = data.column || null;
      setActiveColumn(activeColumn);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveItem(null);
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const activeData = active.data.current;
    const overData = over.data.current;
    if (!activeData || !overData) return;

    //Ccheck active element and over zone
    const isActiveItem = activeData.type === "match_item";
    const isActiveColumn = activeData.type === "match_column";
    const isOverItem = overData.type === "match_item";
    const isOverColumn = overData.type === "match_column";

    // If there is no active element, stop dragging
    if (!isActiveItem && !isActiveColumn) return;

    if (isActiveItem) {
      const initialStatusId: number = activeData.status_id;
      let targetStatusId!: number;
      if (isOverColumn) {
        targetStatusId = overData.column.id;
      } else if (isOverItem) {
        targetStatusId = overData.status_id;
      }

      startMatchUpd(targetStatusId, initialStatusId);
    } else if (isActiveColumn) {
      moveColumn(active.id, over.id);
    }
  };

  return {
    columnsIds,
    activeColumn,
    activeItem,
    handleDragStart,
    handleDragEnd,
    columns,
  };
};

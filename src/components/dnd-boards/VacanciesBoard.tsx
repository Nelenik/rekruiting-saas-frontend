'use client'

import { vacancyStatusDict } from "@/shared/dictionaries";
import { EVacancyStatus, TVacancyShort } from "@/shared/types";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { FC, useEffect, useState } from "react";
import DndDroppable from "../dnd/DndDroppable";
import DndSortable from "../dnd/DndSortable";
import VacancyBoardCard from "../cards/VacancyBoardCard";
import { FunnelCard } from "../cards/FunnelCard";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { findItemStatus, isValidDragEvent } from "./helpers";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

const columns = [
  {
    id: EVacancyStatus.UNASSIGNED,
    title: vacancyStatusDict[EVacancyStatus.UNASSIGNED]
  },
  {
    id: EVacancyStatus.SETTING,
    title: vacancyStatusDict[EVacancyStatus.SETTING]
  },
  {
    id: EVacancyStatus.WORK,
    title: vacancyStatusDict[EVacancyStatus.WORK]
  },
  {
    id: EVacancyStatus.WAIT,
    title: vacancyStatusDict[EVacancyStatus.WAIT]
  },
  {
    id: EVacancyStatus.PAUSE,
    title: vacancyStatusDict[EVacancyStatus.PAUSE]
  },
];

type TProps = {
  groupedItems: Record<string, TVacancyShort[]>
}


const VacanciesBoard: FC<TProps> = ({ groupedItems }) => {

  const [groups, setGroups] = useState<Record<string, TVacancyShort[]>>(groupedItems)

  useEffect(() => {
    setGroups(groupedItems)
  }, [groupedItems])

  const [activeItem, setActiveItem] = useState<TVacancyShort | null>(null)

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const activeVacancy = Object.values(groups)
      .flat()
      .find(vacancy => String(vacancy.id) === active.id) || null;

    setActiveItem(activeVacancy)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!isValidDragEvent(active, over)) return

    //check active element and over zone
    const isActiveItem = active.data.current?.type === 'vac_item'
    const isOverItem = over?.data?.current?.type === 'vac_item'
    const isOverColumn = over?.data?.current?.type === 'vac_column'

    const sourceColStatus = findItemStatus(groups, String(active.id))

    const targetColStatus = isOverColumn
      ? String(over.id)
      : findItemStatus(groups, String(over?.id))

    if (!sourceColStatus || !targetColStatus) return

    if (isActiveItem) {
      const draggableItem = activeItem || Object.values(groups).flat().find(vac => String(vac.id) === active.id);
      if (!draggableItem) return

      //if element is over column
      if (isOverColumn) {
        setGroups(prev => {
          if (sourceColStatus === targetColStatus) return prev
          const sourceItems = [...prev[sourceColStatus]]
          const targetItems = [...(prev[targetColStatus] || [])]
          return {
            ...prev,
            [sourceColStatus]: sourceItems.filter((vac: TVacancyShort) => String(vac.id) !== active.id),
            [targetColStatus]: [...targetItems, { ...draggableItem, status: targetColStatus as EVacancyStatus }]
          }
        })
      } else if (isOverItem) {
        //if element is over another element(item, card)
        setGroups(prev => {

          const sourceItems = [...prev[sourceColStatus]]
          const targetItems = [...(prev[targetColStatus] || [])]

          const overIndex = over.data.current?.sortable.index ?? -1;

          //if move item between columns ant is is over other item
          if (sourceColStatus !== targetColStatus) {
            return {
              ...prev,
              [sourceColStatus]: sourceItems.filter(item => String(item.id) !== active.id),
              [targetColStatus]: [
                ...targetItems.slice(0, overIndex),
                { ...draggableItem, status: targetColStatus as EVacancyStatus },
                ...targetItems.slice(overIndex)
              ]
            }
          }

          const activeIndex = sourceItems.findIndex(item => String(item.id) === active.id)

          if (activeIndex === overIndex || overIndex === -1) return prev
          return {
            ...prev,
            [sourceColStatus]: arrayMove(sourceItems, activeIndex, overIndex)
          }
        })
      }
    }

    setActiveItem(null)
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      id="vacanciesboard-context-id"
    >
      <ScrollArea className="pb-4">
        <div className="flex gap-4 w-full p-2 ">
          {columns.map((col) => (
            <div
              key={col.id}
              className={cn(`flex flex-col gap-6 ring-2 ring-offset-4 rounded-lg ring-border w-1/4 min-w-[200px]`, `w-1/${columns.length}`)}
            >
              <FunnelCard
                name={col.title}
                count={groups[col.id]?.length || 0}
              />
              <DndDroppable
                id={col.id}
                type="vac_column"
                className="flex flex-col gap-2 grow"
              >
                <ScrollArea className="h-[clamp(500px,65vh,800px)] px-2">
                  <SortableContext items={(groups[col.id] || []).map(v => String(v.id))}>

                    {(groups[col.id] || []).map((vacancy: TVacancyShort) => (
                      <DndSortable
                        id={String(vacancy.id)}
                        key={vacancy.id}
                        type="vac_item"
                      >
                        <VacancyBoardCard
                          id={vacancy.id}
                          name={vacancy.name}
                          location={vacancy.location}
                          salary_from={vacancy.salary_from}
                          salary_to={vacancy.salary_to}
                        />
                      </DndSortable>
                    ))}
                  </SortableContext>
                  <ScrollBar className="w-2" />
                </ScrollArea>
              </DndDroppable>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="bg-input/30 h-4 cursor-pointer" />
      </ScrollArea>
      <DragOverlay>
        {activeItem && (
          <DndSortable id={String(activeItem.id)} type="vac_item">
            <VacancyBoardCard
              id={activeItem.id}
              name={activeItem.name}
              location={activeItem.location}
              salary_from={activeItem.salary_from}
              salary_to={activeItem.salary_to}
            />
          </DndSortable>
        )}
      </DragOverlay>

    </DndContext>
  );
}

export default VacanciesBoard;
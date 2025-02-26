'use client'

import { vacancyStatusDict } from "@/shared/dictionaries";
import { EVacancyStatus, TVacancyShort } from "@/shared/types";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { FC } from "react";
import DndDroppable from "../dnd/DndDroppable";
import DndSortable from "../dnd/DndSortable";
import VacancyBoardCard from "../cards/VacancyBoardCard";
import { FunnelCard } from "../cards/FunnelCard";
import { SortableContext } from "@dnd-kit/sortable";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { useVacaniesBoard } from "../../hooks/useVacanciesBoard";

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

  const {
    handleDragEnd,
    handleDragStart,
    activeItem,
    groups
  } = useVacaniesBoard(groupedItems)

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
              className={cn(`flex flex-col gap-6 ring-2 ring-offset-4 rounded-lg ring-border w-1/5 min-w-[200px]`)}
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
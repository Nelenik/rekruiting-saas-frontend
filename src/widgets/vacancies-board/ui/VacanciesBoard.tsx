'use client'

import { useStatuses } from "@/shared/providers/AppStatusesProvider"
import { ScrollArea, ScrollBar } from "@/shared/ui/shadcn/scroll-area"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import { FC } from "react"
import { DndDroppable, DndSortable } from "@/features/dnd"
import { cn } from "@/shared/lib/utils"
import { useVacaniesBoard } from "../model/useVacanciesBoard"
import { VacancyBoardCard } from "@/entities/vacancy/ui/VacancyBoardCard"
import { TVacancyShort } from "@/shared/api/types"
import { FunnelCard } from "@/shared/ui/custom/FunnelCard"


type TProps = {
  groupedItems: Record<string, TVacancyShort[]>
}

export const VacanciesBoard: FC<TProps> = ({ groupedItems }) => {

  const appStatuses = useStatuses()

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
          {Object.entries(groups).map(([id, items]) => {
            const colName = appStatuses.find(el => el.id === +id)?.name || 'Не задан'
            return (
              <div
                key={id}
                className={cn(`flex flex-col gap-6 ring-2 ring-offset-4 rounded-lg ring-border w-1/5 min-w-[200px]`)}
              >
                <FunnelCard
                  name={colName}
                  count={items?.length || 0}
                />
                <DndDroppable
                  id={id}
                  type="vac_column"
                  className="flex flex-col gap-2 grow"
                >
                  <ScrollArea className="h-[clamp(500px,65vh,800px)] px-2">
                    <SortableContext items={(items || []).map(v => String(v.id))}>

                      {(items || []).map((vacancy: TVacancyShort) => (
                        <DndSortable
                          sortableId={String(vacancy.id)}
                          key={vacancy.id}
                          dndData={{ type: "vac_item" }}
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
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" className="bg-input/30 h-4 cursor-pointer" />
      </ScrollArea>
      <DragOverlay>
        {activeItem && (
          <VacancyBoardCard
            id={activeItem.id}
            name={activeItem.name}
            location={activeItem.location}
            salary_from={activeItem.salary_from}
            salary_to={activeItem.salary_to}
          />
        )}
      </DragOverlay>

    </DndContext>
  );
}

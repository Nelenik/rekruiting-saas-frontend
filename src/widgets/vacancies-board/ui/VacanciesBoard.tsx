'use client'

import { ScrollArea, ScrollBar } from "@/shared/ui/shadcn/scroll-area"
import { SortableContext } from "@dnd-kit/sortable"
import { DndDroppable, DndSortable } from "@/features/dnd"
import { cn } from "@/shared/lib/utils"
import { useVacaniesBoard } from "../model/useVacanciesBoard"
import { VacancyBoardCard } from "@/entities/vacancy/ui/VacancyBoardCard"
import { TVacancyShort } from "@/shared/api/types"
import { FunnelCard } from "@/shared/ui/FunnelCard"
import { vacanciesDefaultStatuses } from "@/shared/constants/default-vacancy-statuses"
import { BoardListSkeleton } from "@/shared/ui/skeletons/BoardSkeleton"
import { DndBoard } from "@/features/dnd/DndBoard"


export const VacanciesBoard = () => {

  const {
    isLoading,
    handleDragEnd,
    handleDragStart,
    activeItem,
    groups
  } = useVacaniesBoard()

  return (
    <DndBoard
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      boardId="vacanciesboard-context-id"
      renderOverlay={() => <>
        {activeItem && (
          <VacancyBoardCard
            id={activeItem.id}
            name={activeItem.name}
            location={activeItem.location}
            salary_from={activeItem.salary_from}
            salary_to={activeItem.salary_to}
            created_at={activeItem.created_at}
          />
        )}
      </>}
    >
      <ScrollArea className="p-2 border-2 rounded-xl">
        <div className="flex gap-4 w-full p-2 ">
          {vacanciesDefaultStatuses.map((status) => {
            const colName = status?.name || 'Не задан'
            const items = groups?.[status.id] || []
            return (
              <div
                key={status.id}
                className={cn(`flex flex-col gap-6 ring-2 ring-offset-4 rounded-lg ring-border w-1/4 min-w-[250px]`)}
              >
                <FunnelCard
                  color={status.color}
                  name={colName}
                  isLoading={isLoading}
                  count={items?.length || 0}
                />
                <DndDroppable
                  droppableId={status.id}
                  dndData={{
                    type: "vac_column",
                    status_id: status.id
                  }}
                  className="flex flex-col gap-2 grow"
                >
                  <ScrollArea
                    type="always"
                    className="h-[clamp(500px,65vh,800px)] px-2">
                    {
                      isLoading
                        ? <BoardListSkeleton count={5} />
                        : <SortableContext items={(items || []).map(v => v.id)}>

                          {(items || []).map((vacancy: TVacancyShort) => (
                            <DndSortable
                              sortableId={vacancy.id}
                              key={vacancy.id}
                              dndData={{
                                type: "vac_item",
                                vacancy,
                                status_id: vacancy.status_id
                              }}
                              enableGrip
                            >
                              <VacancyBoardCard
                                id={vacancy.id}
                                name={vacancy.name}
                                location={vacancy.location}
                                salary_from={vacancy.salary_from}
                                salary_to={vacancy.salary_to}
                                created_at={vacancy.created_at}
                              />
                            </DndSortable>
                          ))}
                        </SortableContext>
                    }

                    <ScrollBar className="w-2" />
                  </ScrollArea>
                </DndDroppable>
              </div>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" className="bg-input/30 h-4 cursor-pointer" />
      </ScrollArea>
    </DndBoard>
  );
}

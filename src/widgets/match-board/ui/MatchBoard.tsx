'use client'
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { ScrollArea, ScrollBar } from "@/shared/ui/shadcn/scroll-area";
import { DndSortable } from "@/features/dnd";
import { cn } from "@/shared/lib/utils";
import MatchColAbstraction from "./MatchColAbstraction";
import { MatchCol } from "./MatchCol";
import { useMatchBoard } from "../model/hooks/useMatchBoard";
import { CandidateCardAbstraction } from "./CandidateCardAbstraction";

export const MatchBoard = () => {

  const {
    columns,
    columnsIds,
    activeColumn,
    activeItem,
    handleDragStart,
    handleDragEnd
  } = useMatchBoard()



  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      id="matchboard-context-id"
    >
      <ScrollArea className="pb-4">
        <div className="flex gap-4 w-full p-2 ">

          <SortableContext items={columnsIds}>

            {columns.map((col) => (
              <DndSortable
                key={col.id}
                sortableId={col.id}
                dndData={{ type: "match_column", column: col }}
                className="cursor-grab"
              >
                <MatchCol
                  color={col.color}
                  status_id={col.id}
                  title={col.name}
                  className={cn(`w-1/${columns.length}`)}
                  isEditable={col.id !== 1}
                />
              </DndSortable>
            ))}
          </SortableContext>


        </div>
        <ScrollBar orientation="horizontal" className="bg-input/30 h-4 cursor-pointer" />
      </ScrollArea>

      <DragOverlay dropAnimation={{ easing: 'linear' }}>
        {
          activeColumn && (
            <MatchColAbstraction
              title={activeColumn.name}
              status_id={activeColumn.id}
              className={`w-1/${columns.length}`}
            />
          )
        }
        {activeItem &&
          <CandidateCardAbstraction
            name={activeItem.name}
            city={activeItem.city}
            salary={activeItem.salary}
            rating={activeItem.match_point}
          />
        }

      </DragOverlay>
    </DndContext>
  );
}

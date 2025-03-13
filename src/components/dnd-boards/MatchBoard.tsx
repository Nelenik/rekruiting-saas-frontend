'use client'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { TCandidateShort, TMatchStatus } from "@/shared/types";
import MatchCol from "./boards_elmts/MatchCol";
import { FC, useMemo, useState } from "react";
import { SortableContext } from "@dnd-kit/sortable";
import DndSortable from "../dnd/DndSortable";
import { CandidateCard } from "../cards/CandidateCard";
import MatchColAbstraction from "./boards_elmts/MatchColAbstraction";
import { GripVertical } from "lucide-react";
import { useUpdateMatch } from "@/hooks/useUpdateMatch";
import { cn } from "@/lib/utils";
import { TStatus } from "@/shared/types/statuses";

type TProps = {
  match_statuses: TMatchStatus[]
}

const MatchBoard: FC<TProps> = ({ match_statuses }) => {
  const [columns, setColumns] = useState(match_statuses.map(el => el.status))

  const columnsIds = useMemo(() => columns.map(col => col.id), [columns])

  //activeColumn and acitveItem state for DndOverlay
  const [activeColumn, setActiveColumn] = useState<TStatus | null>(null)

  const [activeItem, setActiveItem] = useState<TCandidateShort | null>(null);

  // update match hook
  const { startMatchUpd } = useUpdateMatch(activeItem?.id)

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const data = active.data.current;
    if (data?.type === 'match_item') {

      const activeItem = data.candidate || null
      setActiveItem(activeItem)
    } else if (data?.type === 'match_column') {
      const activeColumn = data.column || null
      console.log('activeCol', activeColumn)
      setActiveColumn(activeColumn)
    }

  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null)
    setActiveItem(null)
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const activeData = active.data.current;
    const overData = over.data.current;
    if (!activeData || !overData) return

    //Ccheck active element and over zone
    const isActiveItem = activeData.type === "match_item";
    const isActiveColumn = activeData.type === "match_column"
    const isOverItem = overData.type === "match_item";
    const isOverColumn = overData.type === "match_column";

    // If there is no active element, stop dragging
    if (!isActiveItem && !isActiveColumn) return;

    if (isActiveItem) {

      const initialStatusId: number = activeData.status_id;
      let targetStatusId!: number;
      if (isOverColumn) {
        targetStatusId = overData.column.id
      } else if (isOverItem) {
        targetStatusId = overData.status_id
      }

      startMatchUpd(targetStatusId, initialStatusId)
    }

  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      id="matchboard-context-id"
    >
      <ScrollArea className="pb-4">
        <div className="flex gap-4 w-full p-2 ">

          <SortableContext items={columnsIds}>

            {columns.map((col, index) => (
              <DndSortable
                key={col.id}
                sortableId={col.id}
                dndData={{ type: "match_column", column: col }}
              >
                <MatchCol
                  status_id={col.id}
                  title={col.name}
                  className={cn(`w-1/${columns.length}`)}
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
        {activeItem && (
          <div className="relative cursor-grabbing ring-2 rounded-lg ring-offset-2">
            <GripVertical className="absolute left-1 top-2 z-[100] stroke-muted-foreground" />
            <CandidateCard
              id={activeItem.id}
              name={activeItem.name}
              city={activeItem.city}
              salary={activeItem.salary}
              rating={activeItem.match_point}
            />
          </div>
        )}

      </DragOverlay>
    </DndContext>
  );
}

export default MatchBoard;
'use client'
import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { TCandidateShort, TMatchStatus } from "@/shared/types";
import MatchCol from "./boards-elems/MatchCol";
import { useQueries } from "@tanstack/react-query";
import { getBasicCandidatesByStatus } from "@/actions/getData";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { SortableContext } from "@dnd-kit/sortable";
import { useMatchStatuses } from "@/providers/MatchStatusProvider";
import DndSortable from "../dnd/DndSortable";
import { CandidateCard } from "../cards/CandidateCard";
import MatchColAbstraction from "./boards-elems/MatchColAbstraction";
import { GripVertical } from "lucide-react";

const MatchBoard = () => {
  const { vacancyId } = useParams()

  const columns = useMatchStatuses()

  const columnsIds = useMemo(() => columns.map(col => col.key), [columns])

  //query all the matches by status
  const queries = useQueries({
    queries: columns.map((col) => ({
      refetchOnWindowFocus: false,
      queryKey: ['matchCol', col.id],
      queryFn: () => getBasicCandidatesByStatus(vacancyId as string, col.key),

    })),

  })


  //activeColumn and acitveItem state for DndOverlay
  const [activeColumn, setActiveColumn] = useState<TMatchStatus | null>(null)

  const [activeItem, setActiveItem] = useState<TCandidateShort | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const data = active.data.current;
    if (data?.type === 'match_item') {

      const activeItem = data.candidate || null
      setActiveItem(activeItem)
    } else if (data?.type === 'match_column') {
      const activeColumn = data.column || null
      setActiveColumn(activeColumn)
    }
  }

  const handleDragEnd = () => {
    setActiveColumn(null)
    setActiveItem(null)
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

            {queries.map((query, index) => (
              <DndSortable
                key={columns[index].id}
                id={columns[index].key}
                dndData={{ type: "match_column", column: columns[index] }}

              >
                <MatchCol
                  status={columns[index].key}
                  title={columns[index].name}
                  isLoading={query.isFetching}
                  candidates={query.data || null}
                  className={`w-1/${columns.length}`}
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
              candidates={queries[activeColumn.rank - 1].data || null}
              className={`w-1/${columns.length}`}
            />
          )
        }
        {activeItem && (
          <div className="relative cursor-grabbing">
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
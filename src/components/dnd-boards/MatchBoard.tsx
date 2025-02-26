'use client'
import { DndContext } from "@dnd-kit/core";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { TMatchStatus } from "@/shared/types";
import MatchCol from "./boards-elems/MatchCol";
import { useQueries } from "@tanstack/react-query";
import { getBasicCandidatesByStatus } from "@/actions/getData";
import { useParams } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";
import { SortableContext } from "@dnd-kit/sortable";
import { useMatchStatuses } from "@/providers/MatchStatusProvider";

// const columns = [
//   {
//     id: EMatchStatus.SCREENING,
//     title: matchStatusesDict[EMatchStatus.SCREENING]
//   },
//   {
//     id: EMatchStatus.SCORING,
//     title: matchStatusesDict[EMatchStatus.SCORING]
//   },
//   {
//     id: EMatchStatus.INTERVIEW,
//     title: matchStatusesDict[EMatchStatus.INTERVIEW]
//   },
//   {
//     id: EMatchStatus.REFUSAL,
//     title: matchStatusesDict[EMatchStatus.REFUSAL]
//   },
//   {
//     id: EMatchStatus.OFFER,
//     title: matchStatusesDict[EMatchStatus.OFFER]
//   },
// ];

// type TProps = {
//   matchStatuses: TMatchStatus[]
// }


const MatchBoard = () => {
  const { vacancyId } = useParams()

  const columns = useMatchStatuses()

  // const [columns, setColumns] = useState(matchStatuses)


  // useEffect(() => {
  //   setColumns(matchStatuses)
  // }, [matchStatuses])

  const columnsId = useMemo(() => columns.map(col => col.key), [columns])
  //query all the matches by status
  const queries = useQueries({
    queries: columns.map((col) => ({
      refetchOnWindowFocus: false,
      queryKey: ['matchCol', col.key],
      queryFn: () => getBasicCandidatesByStatus(vacancyId as string, col.key),

    })),

  })



  const handleDragStart = () => { }

  const handleDragEnd = () => { }
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      id="matchboard-context-id"
    >
      <ScrollArea className="pb-4">
        <div className="flex gap-4 w-full p-2 ">

          <SortableContext items={columnsId}>

            {queries.map((query, index) => (
              <div
                key={columns[index].id}
                className={`flex flex-col gap-6 ring-2 ring-offset-4 rounded-lg ring-border w-1/${columns.length} min-w-[256px]`}
              >
                <MatchCol
                  status={columns[index].key}
                  title={columns[index].name}
                  isLoading={query.isFetching}
                  candidates={query.data || null}
                />
              </div>
            ))}
          </SortableContext>


        </div>
        <ScrollBar orientation="horizontal" className="bg-input/30 h-4 cursor-pointer" />
      </ScrollArea>
    </DndContext>
  );
}

export default MatchBoard;
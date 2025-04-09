'use client'
import { SortableContext } from "@dnd-kit/sortable";
import { FC, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getBasicCandidatesByStatus } from "@/shared/api/getData";
import { cn } from "@/shared/lib/utils";
import { ColActionMenu } from "./ColActionMenu";
import { ScrollArea } from "@/shared/ui/shadcn/scroll-area";
import { DndSortable } from "@/features/dnd";
import { CandidateCard } from "./CandidateCard";
import { FunnelCard } from "@/shared/ui/FunnelCard";
import { BoardListSkeleton } from "@/shared/ui/BoardSkeleton";

type TProps = {
  color: string
  status_id: number
  title: string
  className: string
  isEditable?: boolean
}

export const MatchCol: FC<TProps> = ({ color, status_id, title, className, isEditable = true }) => {
  const vacancyId = useParams()?.vacancyId as string | undefined;

  const { data: candidates, isLoading } = useQuery({
    queryKey: ['matchByStatus', status_id],
    queryFn: () => getBasicCandidatesByStatus(vacancyId as string, status_id),
    // refetchInterval: 10000,//refetch columns every 10 sec
    staleTime: 1000,
  })

  const candidatesIds = useMemo(() => (candidates || []).map(candy => String(candy.id)), [candidates])

  return (

    <div className={cn(`flex flex-col gap-6 ring-2 ring-offset-4 rounded-lg ring-border min-w-[256px] bg-background`, className)}>
      <FunnelCard
        color={color}
        className="relative"
        isLoading={isLoading}
        name={title}
        count={candidates?.length || 0}
      >
        {isEditable && <ColActionMenu currentColId={status_id} className='absolute top-1 right-1' />}
      </FunnelCard>
      <div
        className="flex flex-col gap-2 grow"
      >
        <ScrollArea
          className="h-[clamp(500px,65vh,800px)] px-2"
        >
          {
            isLoading
              ? <BoardListSkeleton count={5} />
              :
              <SortableContext items={candidatesIds}>
                {(candidates || [])?.map((candidate) => (
                  <DndSortable
                    sortableId={candidate.id}
                    key={candidate.id}
                    dndData={{ type: "match_item", candidate, status, status_id }}
                  >
                    <CandidateCard
                      id={candidate.id}
                      name={candidate.name}
                      city={candidate.city}
                      salary={candidate.salary}
                      rating={candidate.match_point}
                    />
                  </DndSortable>
                ))}
              </SortableContext>
          }
        </ScrollArea>
      </div>
    </div>
  );
}



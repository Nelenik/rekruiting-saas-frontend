'use client'
import { CandidateCard } from "@/components/cards/CandidateCard";
import { FunnelCard } from "@/components/cards/FunnelCard";
import DndDroppable from "@/components/dnd/DndDroppable";
import DndSortable from "@/components/dnd/DndSortable";
import { TCandidateShort } from "@/shared/types";
import { SortableContext } from "@dnd-kit/sortable";
import { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

type TProps = {
  status: string
  title: string
  isLoading: boolean
  candidates: TCandidateShort[] | null
}

const MatchCol: FC<TProps> = ({ status, title, isLoading, candidates }) => {

  return (
    <>
      <FunnelCard
        name={title}
        isLoading={isLoading}
        count={candidates?.length || 0}
      />
      <DndDroppable
        id={status}
        type="match_column"
        className="flex flex-col gap-2 grow"
      >
        <ScrollArea
          className="h-[clamp(500px,65vh,800px)] px-2"
        >
          {
            isLoading
              ? <p className="text-muted-foreground text-sm text-center">Loading...</p>
              :
              <SortableContext items={(candidates || []).map(candy => String(candy.id))}>
                {(candidates || [])?.map((candidate) => (
                  <DndSortable
                    id={String(candidate.id)}
                    key={candidate.id}
                    type="match_item"
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
      </DndDroppable>
    </>
  );
}

export default MatchCol;
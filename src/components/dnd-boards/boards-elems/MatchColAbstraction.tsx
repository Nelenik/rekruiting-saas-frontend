import { CandidateCard } from "@/components/cards/CandidateCard";
import { FunnelCard } from "@/components/cards/FunnelCard";
import { cn } from "@/lib/utils";
import { TCandidateShort } from "@/shared/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { GripVertical } from "lucide-react";
import { FC } from "react";

type TProps = {
  title: string
  candidates: TCandidateShort[] | null
  className: string
}

/**
 * An abstraction for MatchCol component without the Sortable wrapper, DnD Kit recommends not using components with useSortable inside DndOverlay
 * 
 */

const MatchColAbstraction: FC<TProps> = ({
  title, candidates, className
}) => {
  return (
    <div className={cn(`relative flex flex-col gap-6 ring-2 bg-background ring-offset-4 rounded-lg ring-border  min-w-[256px] cursor-grabbing`, className)}>
      <GripVertical className="absolute left-1 top-2 z-[100] stroke-muted-foreground" />
      <FunnelCard
        name={title}
        count={candidates?.length || 0}
      />
      <div
        className="flex flex-col gap-2 grow"
      >
        <ScrollArea
          className="h-[clamp(500px,65vh,800px)] px-2"
        >
          {(candidates || [])?.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              id={candidate.id}
              name={candidate.name}
              city={candidate.city}
              salary={candidate.salary}
              rating={candidate.match_point}
            />
          ))}

        </ScrollArea>
      </div>
    </div>
  );
}

export default MatchColAbstraction;
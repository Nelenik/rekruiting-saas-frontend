'use client'
import { CandidateCard } from "@/components/cards/CandidateCard";
import { FunnelCard } from "@/components/cards/FunnelCard";
import DndSortable from "@/components/dnd/DndSortable";
import { SortableContext } from "@dnd-kit/sortable";
import { FC, useMemo, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getBasicCandidatesByStatus } from "@/actions/getData";
import { useParams } from "next/navigation";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, MoveLeft, MoveRight } from "lucide-react";
import StatusForm from "@/components/app_forms/StatusForm";

type TProps = {
  status_id: number
  title: string
  className: string
  isEditable?: boolean
}

const ColumnPopover = ({ className }: { className: string }) => {
  const [selectedAction, setSelectedAction] = useState<'add' | 'edit' | null>(null)

  const renderPopoverContent = () => {
    switch (selectedAction) {
      case 'add':
        return (
          <StatusForm type='add' onSuccess={() => { }} onCancel={() => setSelectedAction(null)} />
        )
      case 'edit':
        return (
          <StatusForm type='edit' onSuccess={() => { }} onCancel={() => setSelectedAction(null)} />
        )
      default:
        return (
          <ul>
            <li>
              <Button onClick={() => setSelectedAction('add')}>
                <MoveLeft />
                Добавить слева
              </Button>
            </li>
            <li>
              <Button onClick={() => setSelectedAction('add')}>
                <MoveRight />
                Добавить слева
              </Button>
            </li>
            <li>
              <Button onClick={() => setSelectedAction('edit')}>Редактировать</Button>
            </li>
            <li>
              <Button onClick={() => { }}>Удалить</Button>
            </li>
          </ul>
        )
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild className={cn(className)}>
        <Button variant="ghost">
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {renderPopoverContent()}
      </PopoverContent>
    </Popover>
  )
}

const MatchCol: FC<TProps> = ({ status_id, title, className, isEditable = true }) => {
  const { vacancyId } = useParams()

  const { data: candidates, isLoading } = useQuery({
    queryKey: ['matchByStatus', status_id],
    queryFn: () => getBasicCandidatesByStatus(vacancyId as string, status_id),
    // refetchInterval: 10000,//refetch columns every 10 sec
    staleTime: 1000,
  })

  const candidatesIds = useMemo(() => (candidates || []).map(candy => String(candy.id)), [candidates])

  return (

    <div className={cn(`flex flex-col gap-6 ring-2 ring-offset-4 rounded-lg ring-border  min-w-[256px] bg-background`, className)}>
      <FunnelCard
        name={title}
        isLoading={isLoading}
        count={candidates?.length || 0}
      />
      <div
        className="flex flex-col gap-2 grow"
      >
        <ScrollArea
          className="h-[clamp(500px,65vh,800px)] px-2"
        >
          {
            isLoading
              ? <p className="text-muted-foreground text-sm text-center">Loading...</p>
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

export default MatchCol;


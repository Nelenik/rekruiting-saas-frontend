'use client'

import { useState } from "react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/ui/shadcn/collapsible";
import { RekruCTA } from "@/shared/ui/buttons/RekruCTA";
import Link from "next/link";
import { encodeSegment } from "@/shared/lib/encodeSegments";
import { TextFormatter } from "@/shared/ui/TextFormatter";
import { ChevronDown, ChevronUp } from "lucide-react";

type TProps = {
  description: string,
  vacancyId: string,
  vacancyName: string
}
export const CollapsibleDescription = ({
  description,
  vacancyId,
  vacancyName
}: TProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <CollapsibleContent
        className="data-[state=open]:animate-slide-fade-down data-[state=closed]:animate-slide-fade-up ">
        <h4 className="text-base font-medium">О проекте</h4>
        <TextFormatter
          text={description || ''}
          className="text-base text-foreground"
        />
      </CollapsibleContent>
      <div
        className="flex  justify-between gap-8"
      >
        <CollapsibleTrigger
          className="py-3 flex items-center gap-2 text-base text-secondary-foreground"
        >
          {isOpen
            ? <>Скрыть описание <ChevronUp /></>
            : <>Читать описание <ChevronDown /></>}

        </CollapsibleTrigger>
        <RekruCTA view="dark" asChild className="min-w-[234px] text-lg font-semibold leading-relaxed tracking-tighter">
          <Link
            scroll={false}
            href={`/vacancy/${vacancyId}/${encodeSegment(vacancyName)}`}
          >
            Подробнее
          </Link>
        </RekruCTA>
      </div>
    </Collapsible>
  );
}
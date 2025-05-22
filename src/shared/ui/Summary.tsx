'use client'
import { cn } from "@/shared/lib/utils";
import { TextFormatter } from "@/shared/ui/TextFormatter";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui/shadcn/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type TProps = {
  title: string,
  summary: string,
  className?: string,
}

export const CollapsibleSummary = ({
  title,
  summary,
  className,
  defaultOpen = false,
}: TProps & { defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("flex flex-col gap-6", className)}>
      <CollapsibleTrigger asChild className={cn(
        "text-left cursor-pointer ",
        "[&[data-state=open]>svg]:rotate-180 ",
        "hover:text-muted-foreground transition-colors duration-300",
      )}>
        <h2 className="flex items-center gap-2 scroll-m-20 text-lg font-semibold tracking-tight text-inherit">
          {title}
          <ChevronDown
            size={14}
            className="transition-transform duration-300 translate-y-[2px]"
          />
          {!isOpen && <span
            className="text-xs text-muted-foreground font-normal"
          >
            {'[click to read more]'}
          </span>}
        </h2>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <TextFormatter text={summary || 'Отсутствует'} className="text-muted-foreground text-sm" />
      </CollapsibleContent>
    </Collapsible>
  )
}

export const Summary = ({
  title,
  summary,
  className,
}: TProps) => {
  return (
    <div className={cn(className)}>
      <h2 className="scroll-m-20 mb-3 text-lg font-semibold tracking-tight">
        {title}
      </h2>
      <TextFormatter text={summary || 'Отсутствует'} className="text-muted-foreground text-sm" />
    </div>
  )
}


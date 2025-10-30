'use client'

import { cn } from "@/shared/lib/utils";
import { RekruCTA } from "@/shared/ui/buttons/RekruCTA";
import { Button } from "@/shared/ui/shadcn/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/shadcn/popover";
import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";

type TProps = {
  className?: string
  triggerText: string
  children?: ReactNode
  onSave?: () => void
}

export const FilterBasePopover = ({
  className,
  triggerText,
  children,
  onSave = () => { }
}: TProps) => {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline"
          className={cn(
            'gap-1 text-xs w-max px-2 py-1 text-foreground font-semibold border-accent2/40 [&_svg]:size-6',
            className,
            'hover:bg-white',
          )}
        >
          {triggerText}
          <ChevronDown className={cn(
            "transition-transform",
            open && 'rotate-180'
          )} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[90vw] max-w-[385px] bg-card p-8 rounded-lg border-accent2/40 flex flex-col gap-8"
        align="center"
        sideOffset={16}
      >
        {children}
        <RekruCTA
          view="dark"
          className="w-full"
          onClick={() => onSave()}
        >
          Сохранить
        </RekruCTA>
      </PopoverContent>
    </Popover>
  );
}
'use client'

import { cn } from "@/shared/lib/utils";
import { CancelButton } from "@/shared/ui/buttons/CancelButton";
import { RekruCTA } from "@/shared/ui/buttons/RekruCTA";
import { Button } from "@/shared/ui/shadcn/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/shadcn/popover";
import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";

type TProps = {
  className?: string
  triggerText: string
  children?: ReactNode
  disableSave?: boolean
  onSave?: () => void
  onCancel?: () => void
}

export const FilterBase = ({
  className,
  triggerText,
  children,
  disableSave = false,
  onSave = () => { },
  onCancel = () => { }
}: TProps) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative group/filter">
      <CancelButton
        onClick={() => onCancel()}
        className={cn("absolute left-[93%] bottom-[92%] z-10 text-foreground opacity-0  transition-opacity",
          !open && 'group-hover/filter:opacity-100'
        )}
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline"
            className={cn(
              'gap-1 text-xs w-max px-3 py-1 text-foreground font-semibold border-accent2/40 [&_svg]:size-4',
              'hover:bg-primary hover:text-white transition-colors',
              open && 'bg-primary text-white',
              className,
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
            disabled={disableSave}
            view="dark"
            className="w-full"
            onClick={() => {
              onSave()
              setOpen(false)
            }}
          >
            Сохранить
          </RekruCTA>
        </PopoverContent>
      </Popover>
    </div>
  );
}
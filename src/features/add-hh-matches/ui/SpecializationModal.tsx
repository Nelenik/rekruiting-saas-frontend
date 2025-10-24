'use client'
import { Button } from "@/shared/ui/shadcn/button";
import { Dialog, DialogTitle, DialogContent, DialogTrigger } from "@/shared/ui/shadcn/dialog";
import { useEffect, useState } from "react";
import { MultilevelCheckbox, TCheckboxItem } from "@/shared/ui/form-elements/multilevel-checkbox";
import { cn } from "@/shared/lib/utils";
import { ScrollArea, ScrollBar } from "@/shared/ui/shadcn/scroll-area";


type TProps = {
  items?: TCheckboxItem[]
  values?: string[]
  onSave?: (selectedIds: string[]) => void
  getInitialValues?: () => string[],
  className?: string
}
export const SpecializationModal = ({
  onSave = () => { },
  getInitialValues = () => [],
  items = [],
  values = [],
  className
}: TProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      const initValues = getInitialValues()
      setSelectedIds(initValues.length ? initValues : values)
    }
  }, [getInitialValues, open, values])

  const handleSave = () => {
    onSave(selectedIds);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className={cn(className)}
        >
          Выбрать другую специализацию
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        overlayStyles="bg-transparent"
        className="h-[80vh] rounded-4xl bg-card pb-16"
      >
        <DialogTitle className="text-2xl">
          Специализации
        </DialogTitle>

        <ScrollArea className="h-full " type="always">

          <MultilevelCheckbox
            items={items}
            value={selectedIds}
            onChange={setSelectedIds}
          />
          <ScrollBar />
        </ScrollArea>

        <div className={cn("absolute left-0 right-0 bottom-0 ", "px-12 py-2.5 bg-white shadow-[0px_-2px_3px_-2px_rgba(0,_0,_0,_0.35)] flex justify-end gap-4")}>
          <Button
            type="button"
            variant="ghost"
            className="mr-2"
            onClick={() => setSelectedIds([])}
          >
            Сбросить
          </Button>
          <Button
            type="button"
            onClick={handleSave}
          >
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
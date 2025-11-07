'use client'
import { Input } from "@/shared/ui/shadcn/input";
import { FilterBase } from "./FilterBase";
import { capitalizeSentences } from "@/shared/lib/formatters/capitalizeSentence";
import { ChangeEvent, useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";

type TProps = {
  defaultValues?: string[]
  updateCb?: (newValues: Record<string, string[]>) => void
}

export const LevelFilterField = ({
  defaultValues,
  updateCb = () => { }
}: TProps) => {
  const [levels, setLevels] = useState(new Set(defaultValues || []))

  useEffect(() => {
    setLevels(new Set(defaultValues))
  }, [defaultValues])

  const handleToggleLevels = (value: string) => {
    setLevels(prev => {
      const newSet = new Set(prev)
      if (newSet.has(value)) {
        newSet.delete(value)
      } else {
        newSet.add(value)
      }
      return newSet
    })
  }

  return (
    <FilterBase
      triggerText="Грейд"
      onSave={() => updateCb({ level: Array.from(levels) })}
      onCancel={() => updateCb({ level: [] })}
      className={cn(defaultValues?.length && 'ring-2 ring-primary ring-offset-1')}
    >
      <div className="columns-2">
        {['intern', 'junior', 'middle', 'senior', 'lead', 'head'].map((item: string) => {
          const isChecked = levels?.has(item)
          return (
            <label
              key={item}
              className="flex items-center gap-2 [&:not(:last-child)]:mb-4"
            >
              <Input
                type="checkbox"
                value={item}
                className="inline w-5 h-5 accent-primary shrink-0"
                defaultChecked={isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleToggleLevels(e.target.value)}
              />
              <span>{capitalizeSentences(item)}</span>
            </label>
          )
        })}
      </div>

    </FilterBase>
  );
}
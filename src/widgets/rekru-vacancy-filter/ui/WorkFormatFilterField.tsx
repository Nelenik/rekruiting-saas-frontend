'use client'

import { Input } from "@/shared/ui/shadcn/input"
import { ChangeEvent, useState } from "react"
import { FilterBase } from "./FilterBase"
import { capitalizeSentences } from "@/shared/lib/formatters/capitalizeSentence"
import { vacancyWorkFormatDict } from "@/entities/vacancy"

type TProps = {
  defaultValues?: string[]
  updateCb?: (newValues: Record<string, string[]>) => void
}
export const WorkFormatFilterField = ({
  defaultValues,
  updateCb = () => { }
}: TProps) => {
  const [workFormat, setWorkFormat] = useState(new Set(defaultValues || []))

  const handleToggleLevels = (value: string) => {
    setWorkFormat(prev => {
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
      triggerText="Формат"
      onSave={() => updateCb({ work_format: Array.from(workFormat) })}
      onCancel={() => updateCb({ work_format: [] })}
      disableSave={workFormat.size === 0}
    >
      <div className="columns-2">
        {['office', 'remote', 'hybrid'].map((item: string) => {
          const isChecked = workFormat?.has(item)
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
              <span>{capitalizeSentences(vacancyWorkFormatDict[item])}</span>
            </label>
          )
        })}
      </div>

    </FilterBase>
  );
}
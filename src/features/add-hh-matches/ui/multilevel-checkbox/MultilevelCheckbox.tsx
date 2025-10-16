'use client'

import { useCallback, useMemo, useState } from "react";
import { CheckboxProvider } from "./CheckboxProvider";
import { cn } from "@/shared/lib/utils";
import { TMultipleCheckbox } from "./types";
import { CheckboxNode } from "./CheckboxNode";

export const MultilevelCheckbox = ({
  name,
  items,
  defaultValue = [],
  value,
  onChange = () => { },
  includeParent = false,
  onLoadChildren = async () => [],
  className

}: TMultipleCheckbox) => {

  const isControlled = value !== undefined
  const [internalSelected, setInternalSelected] = useState<Set<string>>(new Set(defaultValue))

  console.log(internalSelected)

  const selectedIds = useMemo(() => isControlled ? new Set(value) : internalSelected, [internalSelected, isControlled, value])

  const handleSelectionChange = useCallback((newSelected: Set<string>) => {
    if (!isControlled) {
      setInternalSelected(newSelected)
    }
    onChange?.(Array.from(newSelected))
  }, [isControlled, onChange])

  return (
    <CheckboxProvider
      value={{
        selectedIds,
        onSelectionChange: handleSelectionChange,
        onLoadChildren,
        includeParent
      }}
    >
      <div className={cn(className)}>
        <div className="space-y-1">
          {items.map(item => (
            <CheckboxNode key={item.id} item={item} />
          ))}
        </div>

        {/* hidden inputs for FormData */}
        {Array.from(selectedIds).map(id =>
          <input
            key={id}
            type="hidden"
            name={name}
            value={id}
          />
        )}
      </div>

    </CheckboxProvider>
  );
}
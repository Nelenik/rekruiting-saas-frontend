'use client'

import { useCallback, useMemo, useState } from "react";
import { CheckboxProvider } from "./CheckboxProvider";
import { cn } from "@/shared/lib/utils";
import { TMultilevelCheckbox } from "./types";
import { CheckboxNode } from "./CheckboxNode";

/**
 * A multilevel checkbox component that supports hierarchical data structures with optional
  * 
 * @important Data Format Requirements
 * Your data items must be formatted as either static or lazy-loading items:
 * 
 * @example Static items (pre-loaded children):
 * const items: TStaticCheckboxItem[] = [
 *   {
 *     id: '1',
 *     label: 'Parent Item',
 *     children: [
 *       { id: '1-1', label: 'Child Item 1' },
 *       { id: '1-2', label: 'Child Item 2' }
 *     ]
 *   }
 * ];
 * 
 *
 * @example
 * // Uncontrolled usage with default values
 * <MultilevelCheckbox
 *   name="categories"
 *   items={categoryItems}
 *   defaultValue={['cat1', 'cat2']}
 *   onChange={(selectedIds) => console.log(selectedIds)}
 * />
 *
 * @example
 * // Controlled usage
 * <MultilevelCheckbox
 *   name="categories"
 *   items={categoryItems}
 *   value={selectedIds}
 *   onChange={setSelectedIds}
 * />
 *
 */

export const MultilevelCheckbox = ({
  name,
  items,
  defaultValue = [],
  value,
  onChange = () => { },
  includeParent = false,
  onLoadChildren = async () => [],
  styles = {}

}: TMultilevelCheckbox) => {

  const { className, checkboxesWrapClassName, ...restStyles } = styles

  // Determine if component is controlled (value passed from parent)
  const isControlled = value !== undefined
  const [internalSelected, setInternalSelected] = useState<Set<string>>(new Set(defaultValue))

  // Computed set of selected IDs (controlled or uncontrolled)
  const selectedIds = useMemo(() => isControlled ? new Set(value) : internalSelected, [internalSelected, isControlled, value])

  // Centralized handler for selection changes
  const handleSelectionChange = useCallback(
    (updater: Set<string> | ((prev: Set<string>) => Set<string>)) => {
      const newSelected = typeof updater === 'function'
        ? updater(selectedIds)
        : updater

      if (!isControlled) {
        setInternalSelected(newSelected)
      }

      onChange?.(Array.from(newSelected))
    },
    [isControlled, onChange, selectedIds]
  )

  return (
    <CheckboxProvider
      value={{
        selectedIds,
        onSelectionChange: handleSelectionChange,
        onLoadChildren,
        includeParent,
        styles: restStyles
      }}
    >
      <div className={cn(className)}>
        <div className={cn("space-y-1", checkboxesWrapClassName)}>
          {items.map(item => (
            <CheckboxNode key={item.id} item={item} />
          ))}
        </div>

        {/* hidden inputs for FormData */}
        {Array.from(selectedIds)
          .filter(id => !id.startsWith("__virtual__"))
          .map(id =>
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
'use client'
import { TStaticCheckboxItem } from "./types";

import { ChangeEvent, memo, useEffect, useMemo, useRef, useState } from "react";
import { useCheckbox } from "./CheckboxProvider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/ui/shadcn/collapsible";
import { Input } from "@/shared/ui/shadcn/input";

import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";

type TProps = {
  item: TStaticCheckboxItem
}

/**
 * Determines the selection state of a parent node based on its children.
 *
 * @param childIds - An array of all child node IDs belonging to a parent.
 * @param selectedIds - A set containing the IDs of all currently selected nodes.
 * @returns An object describing the children's selection status:
 * - `allChildrenSelected`: `true` if all children are selected.
 * - `someChildrenSelected`: `true` if at least one (but not necessarily all) child is selected.
 *
 * @example
 * ```ts
 * const selectedIds = new Set(["1", "2"]);
 * const result = checkSelectionStates(["1", "2", "3"], selectedIds);
 * // result = { allChildrenSelected: false, someChildrenSelected: true }
 * ```
 */
const checkSelectionStates = (childIds: string[], selectedIds: Set<string>) => {

  const allChildrenSelected = childIds.length > 0 && childIds.every(id => selectedIds.has(id));
  const someChildrenSelected = childIds.some(id => selectedIds.has(id));

  return { allChildrenSelected, someChildrenSelected }
}

/**
 * A recursive checkbox node component that handles individual items within a multilevel checkbox hierarchy.
 * Supports parent-child relationships, indeterminate states, and collapsible sections for nested items.
 *
 * @remarks
 * This component is designed to work within the `MultilevelCheckbox` context and should not be used standalone.
 * It handles both leaf nodes (no children) and parent nodes with collapsible child sections.
 *
 * @example
 * // Used internally by MultilevelCheckbox component
 * <CheckboxNodeComponent item={checkboxItem} />
 */

const CheckboxNodeComponent = ({ item }: TProps) => {
  const {
    selectedIds,
    onSelectionChange,
    includeParent,
    styles
  } = useCheckbox()

  //classnames for component's parts
  const { checkboxInputClassName, checkboxLabelClassName, collapsibleContentClassName, collapsibleTriggerClassName } = styles

  const [isOpen, setIsOpen] = useState(false);

  // Memoized list of children
  const children = useMemo(() => item.children || [], [item.children])
  const hasChildren = children.length > 0;
  const checkboxRef = useRef<HTMLInputElement>(null);

  // Memoize child IDs
  const childIds = useMemo(() => children.map(c => c.id), [children])

  // Determine if all/some children are selected
  const { allChildrenSelected, someChildrenSelected } = useMemo(
    () => checkSelectionStates(childIds, selectedIds),
    [childIds, selectedIds]
  );

  // Parent ID logic: if includeParent=false → use a virtual ID
  const parentId = includeParent ? item.id : `__virtual__${item.id}`
  const parentIsSelected = selectedIds.has(parentId)

  // Determine whether current checkbox should be checked
  const isChecked = useMemo(() => {
    if (!hasChildren) return selectedIds.has(item.id)
    if (children.length > 0) return allChildrenSelected
    return parentIsSelected
  }, [allChildrenSelected, children.length, hasChildren, item.id, parentIsSelected, selectedIds])

  // Update "indeterminate" visual state (partially selected)
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = hasChildren && someChildrenSelected && !allChildrenSelected;
    }
  }, [someChildrenSelected, allChildrenSelected, hasChildren]);

  // Sync parent selection when all children are selected/unselected
  useEffect(() => {
    if (!hasChildren || childIds.length === 0) return;

    const next = new Set(selectedIds);
    const shouldAddParent = allChildrenSelected && !parentIsSelected;
    const shouldRemoveParent = !allChildrenSelected && parentIsSelected;

    if (shouldAddParent) next.add(parentId);
    if (shouldRemoveParent) next.delete(parentId);

    if (shouldAddParent || shouldRemoveParent) {
      onSelectionChange(next);
    }
  }, [allChildrenSelected, childIds.length, hasChildren, onSelectionChange, parentId, parentIsSelected, selectedIds]);

  // Handle user clicks on checkbox
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    onSelectionChange((prev: Set<string>) => {
      const newSelected = new Set(prev)
      if (checked) {
        newSelected.add(e.target.value)
        if (hasChildren) {
          childIds.forEach(id => newSelected.add(id))
        }
      } else {
        newSelected.delete(e.target.value)
        if (hasChildren) {
          childIds.forEach(id => newSelected.delete(id))
        }
      }
      return newSelected
    })
  };
  // --- Render leaf node (no children)
  if (!hasChildren) {
    return (
      <label
        className={cn(
          "flex items-center gap-2",
          checkboxLabelClassName
        )}
      >
        <Input
          type="checkbox"
          value={item.id}
          checked={isChecked}
          onChange={handleChange}
          ref={checkboxRef}
          className={cn(
            "shrink-0 inline w-5 h-5 accent-primary",
            checkboxInputClassName
          )}
        />
        <span>{item.label}</span>
      </label>
    )
  }
  // --- Render collapsible node with children
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div
        className="flex gap-1 items-center"
      >
        <CollapsibleTrigger
          className={cn(
            "shrink-0 py-3 flex items-center gap-2 text-base text-secondary-foreground",
            collapsibleTriggerClassName
          )}
        >
          {isOpen
            ? <ChevronUp size={16} />
            : <ChevronDown size={16} />}

        </CollapsibleTrigger>
        <label
          className={cn(
            "flex items-center gap-2",
            checkboxLabelClassName
          )}
        >
          <Input
            type="checkbox"
            value={parentId}
            checked={isChecked}
            onChange={handleChange}
            ref={checkboxRef}
            className={cn(
              "shrink-0 inline w-5 h-5 accent-primary",
              checkboxInputClassName
            )}
          />
          <span>{item.label}</span>
        </label>
      </div>
      <CollapsibleContent
        className={cn(
          'space-y-1 pl-11',
          collapsibleContentClassName
        )}
      >
        {children.map(child => (
          <CheckboxNode
            key={child.id}
            item={child}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>)
}

export const CheckboxNode = memo(CheckboxNodeComponent)